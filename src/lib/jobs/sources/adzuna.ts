import { makeJobId, snippet, withTimeout } from "../normalize";
import type { JobOffer, SourceAdapter } from "../types";

type AdzunaJob = {
  id?: string | number;
  title?: string;
  description?: string;
  created?: string;
  redirect_url?: string;
  contract_type?: string;
  contract_time?: string;
  company?: { display_name?: string };
  location?: { display_name?: string };
};

function skipped(message: string) {
  return {
    offers: [] as JobOffer[],
    report: {
      id: "adzuna" as const,
      label: "Adzuna",
      state: "skipped" as const,
      count: 0,
      message,
      setupUrl: "https://developer.adzuna.com/",
    },
  };
}

export const adzunaSource: SourceAdapter = {
  id: "adzuna",
  label: "Adzuna",
  async search(query) {
    const appId = process.env.ADZUNA_APP_ID;
    const appKey = process.env.ADZUNA_APP_KEY;

    if (!appId || !appKey) {
      return skipped(
        "Adzuna agrège des offres françaises (dont des flux issus de plusieurs job boards). Crée une clé gratuite pour l’activer.",
      );
    }

    try {
      const params = new URLSearchParams({
        app_id: appId,
        app_key: appKey,
        results_per_page: "30",
        what: query.keywords.trim() || "stage",
        sort_by: "date",
        max_days_old: String(query.sinceDays),
        "content-type": "application/json",
      });

      if (query.location.trim() && !/^france$/i.test(query.location.trim())) {
        params.set("where", query.location.trim());
      }

      if (query.contract === "cdi") params.set("permanent", "1");
      if (query.contract === "cdd") params.set("contract", "1");
      if (query.contract === "stage") {
        params.set("what", `${query.keywords.trim()} stage`.trim());
      }
      if (query.contract === "alternance") {
        params.set("what", `${query.keywords.trim()} alternance`.trim());
      }

      const response = await fetch(
        `https://api.adzuna.com/v1/api/jobs/fr/search/1?${params.toString()}`,
        { signal: withTimeout(10_000) },
      );

      if (!response.ok) {
        throw new Error(`Recherche Adzuna (${response.status})`);
      }

      const data = (await response.json()) as { results?: AdzunaJob[] };
      const offers = (data.results ?? []).flatMap((item): JobOffer[] => {
        if (!item.id || !item.title || !item.redirect_url) return [];
        return [
          {
            id: makeJobId("adzuna", String(item.id)),
            source: "adzuna",
            sourceLabel: "Adzuna",
            title: item.title,
            company: item.company?.display_name || "Entreprise non précisée",
            location: item.location?.display_name || "France",
            contract: item.contract_type || item.contract_time || "",
            publishedAt: item.created || null,
            url: item.redirect_url,
            description: snippet(item.description || ""),
            collectedAt: new Date().toISOString(),
          },
        ];
      });

      return {
        offers,
        report: {
          id: "adzuna",
          label: "Adzuna",
          state: "ok",
          count: offers.length,
        },
      };
    } catch (error) {
      return {
        offers: [],
        report: {
          id: "adzuna",
          label: "Adzuna",
          state: "error",
          count: 0,
          message:
            error instanceof Error ? error.message : "Impossible de joindre Adzuna",
          setupUrl: "https://developer.adzuna.com/",
        },
      };
    }
  },
};
