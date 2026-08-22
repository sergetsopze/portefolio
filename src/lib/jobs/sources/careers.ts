import { matchesSysadminProfile, parseLooseDate, rejectsContract } from "../match";
import { makeJobId, snippet, withTimeout } from "../normalize";
import type { JobOffer, JobSearchQuery, SourceAdapter } from "../types";

const BROWSER_HEADERS = {
  Accept: "application/json, text/plain, */*",
  "User-Agent":
    "Mozilla/5.0 (compatible; PortfolioJobWatch/1.0; +https://localhost)",
};

function cookieHeader(response: Response) {
  const raw =
    typeof response.headers.getSetCookie === "function"
      ? response.headers.getSetCookie()
      : [response.headers.get("set-cookie")].filter(Boolean);
  return raw
    .map((item) => item?.split(";")[0]?.trim())
    .filter(Boolean)
    .join("; ");
}

function keepOffer(offer: JobOffer, query: JobSearchQuery) {
  const blob = `${offer.title} ${offer.company} ${offer.contract} ${offer.description}`;
  if (!matchesSysadminProfile(blob)) return false;
  return !rejectsContract(blob, query.contract);
}

async function fetchCreditAgricole(query: JobSearchQuery): Promise<JobOffer[]> {
  const pageUrl = "https://groupecreditagricole.jobs/fr/nos-offres/";
  const page = await fetch(pageUrl, {
    headers: { ...BROWSER_HEADERS, Accept: "text/html" },
    cache: "no-store",
    signal: withTimeout(12_000),
  });
  if (!page.ok) return [];

  const html = await page.text();
  const nonce = html.match(/"nonce":"([a-f0-9]+)"/)?.[1];
  const cookies = cookieHeader(page);
  if (!nonce || !cookies) return [];

  const keywords = [query.keywords.trim(), query.contract === "alternance" ? "alternance" : ""]
    .filter(Boolean)
    .join(" ");

  const offers: JobOffer[] = [];
  for (const pageIndex of [1, 2]) {
    const body = new URLSearchParams({
      action: "get_offers",
      nonce,
      page: String(pageIndex),
      limit: "32",
      keywords,
    });
    const response = await fetch(
      "https://groupecreditagricole.jobs/wp-admin/admin-ajax.php",
      {
        method: "POST",
        headers: {
          ...BROWSER_HEADERS,
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie: cookies,
          Referer: pageUrl,
        },
        body,
        cache: "no-store",
        signal: withTimeout(12_000),
      },
    );
    if (!response.ok) break;
    const data = (await response.json()) as {
      elements?: Array<{
        type?: string;
        reference?: string;
        title?: string;
        link?: string;
        brand_name?: string;
        location?: string;
        date?: string;
        publication_date_raw?: string;
        contract?: { label?: string };
        job?: { label?: string };
      }>;
    };
    const batch = (data.elements ?? []).flatMap((item): JobOffer[] => {
      if (item.type !== "offer" || !item.title || !item.link) return [];
      return [
        {
          id: makeJobId("careers", `ca:${item.reference || item.link}`),
          source: "careers",
          sourceLabel: "Crédit Agricole",
          title: item.title,
          company: item.brand_name || "Crédit Agricole",
          location: item.location || "France",
          contract: item.contract?.label || "",
          publishedAt: parseLooseDate(item.date || item.publication_date_raw),
          url: item.link,
          description: snippet(item.job?.label || ""),
          collectedAt: new Date().toISOString(),
        },
      ];
    });
    offers.push(...batch);
    if (batch.length < 32) break;
  }

  return offers.filter((offer) => keepOffer(offer, query));
}

async function fetchOrange(query: JobSearchQuery): Promise<JobOffer[]> {
  const keywords = [query.keywords.trim(), query.contract === "alternance" ? "alternance" : ""]
    .filter(Boolean)
    .join(" ");

  const response = await fetch("https://orange.jobs/widgets", {
    method: "POST",
    headers: {
      ...BROWSER_HEADERS,
      "Content-Type": "application/json",
      Referer: "https://orange.jobs/fr/fr/search-results",
    },
    body: JSON.stringify({
      lang: "fr_fr",
      deviceType: "desktop",
      country: "fr",
      pageName: "search-results",
      ddoKey: "refineSearch",
      from: 0,
      jobs: true,
      counts: true,
      size: 50,
      keywords,
      global: true,
      refNum: "OYVOCZGB",
      siteType: "external",
    }),
    cache: "no-store",
    signal: withTimeout(12_000),
  });
  if (!response.ok) return [];

  const data = (await response.json()) as {
    refineSearch?: {
      data?: {
        jobs?: Array<{
          jobId?: string;
          title?: string;
          jobTitle?: string;
          location?: string;
          city?: string;
          country?: string;
          postedDate?: string;
          applyUrl?: string;
          jobUrl?: string;
          category?: string;
          type?: string;
          contractType?: string;
        }>;
      };
    };
  };

  return (data.refineSearch?.data?.jobs ?? [])
    .flatMap((item): JobOffer[] => {
      const title = item.title || item.jobTitle;
      const path = item.applyUrl || item.jobUrl;
      if (!title || !item.jobId) return [];
      const url = path
        ? path.startsWith("http")
          ? path
          : `https://orange.jobs${path}`
        : `https://orange.jobs/fr/fr/job/${item.jobId}`;
      const place = [item.city || item.location, item.country].filter(Boolean).join(", ");
      return [
        {
          id: makeJobId("careers", `orange:${item.jobId}`),
          source: "careers",
          sourceLabel: "Orange",
          title,
          company: "Orange",
          location: place || "France",
          contract: item.contractType || item.type || "",
          publishedAt: parseLooseDate(item.postedDate),
          url,
          description: snippet(item.category || ""),
          collectedAt: new Date().toISOString(),
        },
      ];
    })
    .filter((offer) => keepOffer(offer, query));
}

async function fetchAirbus(query: JobSearchQuery): Promise<JobOffer[]> {
  const searchText = [query.keywords.trim(), query.contract === "alternance" ? "alternance" : ""]
    .filter(Boolean)
    .join(" ");

  const offers: JobOffer[] = [];
  for (const offset of [0, 20]) {
    const response = await fetch(
      "https://ag.wd3.myworkdayjobs.com/wday/cxs/ag/Airbus/jobs",
      {
        method: "POST",
        headers: {
          ...BROWSER_HEADERS,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appliedFacets: {},
          limit: 20,
          offset,
          searchText,
        }),
        cache: "no-store",
        signal: withTimeout(12_000),
      },
    );
    if (!response.ok) break;
    const data = (await response.json()) as {
      jobPostings?: Array<{
        title?: string;
        externalPath?: string;
        locationsText?: string;
        postedOn?: string;
        bulletFields?: string[];
      }>;
    };
    const batch = (data.jobPostings ?? []).flatMap((item): JobOffer[] => {
      if (!item.title || !item.externalPath) return [];
      return [
        {
          id: makeJobId("careers", `airbus:${item.externalPath}`),
          source: "careers",
          sourceLabel: "Airbus",
          title: item.title,
          company: "Airbus",
          location: item.locationsText || "France",
          contract: item.bulletFields?.[0] || "",
          publishedAt: parseLooseDate(item.postedOn),
          url: `https://ag.wd3.myworkdayjobs.com/en-US/Airbus${item.externalPath}`,
          description: "",
          collectedAt: new Date().toISOString(),
        },
      ];
    });
    offers.push(...batch);
    if (batch.length < 20) break;
  }

  return offers.filter((offer) => keepOffer(offer, query));
}

async function fetchAirFrance(query: JobSearchQuery): Promise<JobOffer[]> {
  const response = await fetch(
    "https://recrutement.airfrance.com/offre-de-emploi/liste-toutes-offres.aspx?all=1&mode=list",
    {
      headers: { ...BROWSER_HEADERS, Accept: "text/html" },
      cache: "no-store",
      signal: withTimeout(12_000),
    },
  );
  if (!response.ok) return [];
  const html = await response.text();
  const blocks = html.matchAll(
    /href="(\/offre-de-emploi\/emploi-[^"]+\.aspx)"[^>]*>([\s\S]*?)<\/a>/gi,
  );
  const seen = new Set<string>();
  const offers: JobOffer[] = [];

  for (const match of blocks) {
    const href = match[1];
    const title = match[2]?.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (!href || !title || seen.has(href)) continue;
    seen.add(href);
    offers.push({
      id: makeJobId("careers", `airfrance:${href}`),
      source: "careers",
      sourceLabel: "Air France",
      title,
      company: "Air France",
      location: "France",
      contract: "",
      publishedAt: null,
      url: `https://recrutement.airfrance.com${href}`,
      description: "",
      collectedAt: new Date().toISOString(),
    });
  }

  return offers.filter((offer) => keepOffer(offer, query));
}

async function safeFetch(_label: string, task: () => Promise<JobOffer[]>) {
  try {
    return await task();
  } catch {
    return [] as JobOffer[];
  }
}

export const careersSource: SourceAdapter = {
  id: "careers",
  label: "Sites carrière",
  async search(query) {
    const batches = await Promise.all([
      safeFetch("ca", () => fetchCreditAgricole(query)),
      safeFetch("orange", () => fetchOrange(query)),
      safeFetch("airbus", () => fetchAirbus(query)),
      safeFetch("airfrance", () => fetchAirFrance(query)),
    ]);
    const offers = batches.flat();

    return {
      offers,
      report: {
        id: "careers",
        label: "Sites carrière",
        state: "ok",
        count: offers.length,
        message:
          offers.length === 0
            ? "Aucun poste IT trouvé sur CA, Orange, Airbus et Air France pour ces critères."
            : undefined,
      },
    };
  },
};
