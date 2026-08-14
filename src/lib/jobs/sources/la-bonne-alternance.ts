import { resolveLocation } from "../location";
import { makeJobId, snippet, withTimeout } from "../normalize";
import { romesForKeywords } from "../rome";
import type { JobOffer, SourceAdapter } from "../types";

type LbaJob = {
  id?: string;
  jobId?: string;
  title?: string;
  intitule?: string;
  company?: { name?: string };
  companyName?: string;
  place?: { city?: string; fullAddress?: string };
  job?: {
    description?: string;
    contractType?: string;
    creationDate?: string;
  };
  contact?: { url?: string };
  url?: string;
  romes?: Array<{ label?: string }>;
};

function skipped(message: string, setupUrl?: string) {
  return {
    offers: [] as JobOffer[],
    report: {
      id: "la-bonne-alternance" as const,
      label: "La Bonne Alternance",
      state: "skipped" as const,
      count: 0,
      message,
      setupUrl,
    },
  };
}

function mapLbaJob(item: LbaJob): JobOffer | null {
  const rawId = item.id || item.jobId;
  const title = item.title || item.intitule;
  if (!rawId || !title) return null;

  const url =
    item.contact?.url ||
    item.url ||
    `https://labonnealternance.apprentissage.beta.gouv.fr/recherche-emploi?display=list`;

  return {
    id: makeJobId("la-bonne-alternance", String(rawId)),
    source: "la-bonne-alternance",
    sourceLabel: "La Bonne Alternance",
    title,
    company: item.company?.name || item.companyName || "Entreprise non précisée",
    location: item.place?.city || item.place?.fullAddress || "France",
    contract: item.job?.contractType || "Alternance",
    publishedAt: item.job?.creationDate || null,
    url,
    description: snippet(item.job?.description || item.romes?.[0]?.label || ""),
    collectedAt: new Date().toISOString(),
  };
}

function collectJobs(payload: unknown) {
  if (!payload || typeof payload !== "object") return [] as LbaJob[];
  const data = payload as Record<string, unknown>;
  const buckets = ["peJobs", "matchas", "lbaJobs", "jobs", "offres"];
  const jobs: LbaJob[] = [];

  for (const key of buckets) {
    const bucket = data[key];
    if (Array.isArray(bucket)) {
      jobs.push(...(bucket as LbaJob[]));
      continue;
    }
    if (bucket && typeof bucket === "object" && Array.isArray((bucket as { results?: LbaJob[] }).results)) {
      jobs.push(...((bucket as { results: LbaJob[] }).results));
    }
  }

  return jobs;
}

export const laBonneAlternanceSource: SourceAdapter = {
  id: "la-bonne-alternance",
  label: "La Bonne Alternance",
  async search(query) {
    if (query.contract === "stage" || query.contract === "cdi" || query.contract === "cdd") {
      return skipped("Source dédiée à l’alternance — ignorée pour ce type de contrat.");
    }

    const caller = process.env.LBA_CALLER_EMAIL;
    if (!caller) {
      return skipped(
        "Indique un e-mail appelant (LBA_CALLER_EMAIL) pour interroger La Bonne Alternance, qui agrège aussi HelloWork, Meteojob et France Travail pour l’alternance.",
        "https://labonnealternance.apprentissage.beta.gouv.fr/espace-developpeurs",
      );
    }

    try {
      const params = new URLSearchParams({
        romes: romesForKeywords(query.keywords).join(","),
        caller,
        sources: "matcha,offres",
      });

      const geo = resolveLocation(query.location);
      if (geo) {
        params.set("latitude", String(geo.latitude));
        params.set("longitude", String(geo.longitude));
        params.set("radius", "50");
      }

      const response = await fetch(
        `https://labonnealternance.apprentissage.beta.gouv.fr/api/V1/jobs?${params.toString()}`,
        {
          headers: { Accept: "application/json" },
          signal: withTimeout(12_000),
        },
      );

      if (!response.ok) {
        throw new Error(`Recherche La Bonne Alternance (${response.status})`);
      }

      const payload = await response.json();
      const offers = collectJobs(payload)
        .map(mapLbaJob)
        .filter((item): item is JobOffer => Boolean(item));

      return {
        offers,
        report: {
          id: "la-bonne-alternance",
          label: "La Bonne Alternance",
          state: "ok",
          count: offers.length,
        },
      };
    } catch (error) {
      return {
        offers: [],
        report: {
          id: "la-bonne-alternance",
          label: "La Bonne Alternance",
          state: "error",
          count: 0,
          message:
            error instanceof Error
              ? error.message
              : "Impossible de joindre La Bonne Alternance",
          setupUrl:
            "https://labonnealternance.apprentissage.beta.gouv.fr/espace-developpeurs",
        },
      };
    }
  },
};
