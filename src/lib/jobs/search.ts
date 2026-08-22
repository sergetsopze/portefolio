import { externalBoardLinks } from "./boards";
import { dedupeOffers } from "./normalize";
import { adzunaSource } from "./sources/adzuna";
import { careersSource } from "./sources/careers";
import { franceTravailSource } from "./sources/france-travail";
import { jsearchSource } from "./sources/jsearch";
import { joobleSource } from "./sources/jooble";
import { laBonneAlternanceSource } from "./sources/la-bonne-alternance";
import { jobProfile } from "./profile";
import type {
  JobOffer,
  JobSearchQuery,
  JobSearchResponse,
  SourceAdapter,
  SourceReport,
} from "./types";

const SOURCES: SourceAdapter[] = [
  franceTravailSource,
  careersSource,
  laBonneAlternanceSource,
  joobleSource,
  jsearchSource,
  adzunaSource,
];

export function parseSearchQuery(input: {
  keywords?: string | null;
  location?: string | null;
  contract?: string | null;
  since?: string | null;
}): JobSearchQuery {
  const contract = input.contract;
  const since = Number(input.since);
  return {
    keywords: (input.keywords ?? "").trim() || jobProfile.keywords,
    location: (input.location ?? "").trim() || jobProfile.location,
    contract:
      contract === "stage" ||
      contract === "all" ||
      contract === "cdi" ||
      contract === "cdd"
        ? contract
        : "alternance",
    sinceDays: since === 1 || since === 7 ? since : 3,
  };
}

export async function searchJobs(query: JobSearchQuery): Promise<JobSearchResponse> {
  const settled = await Promise.allSettled(SOURCES.map((source) => source.search(query)));

  const collected: JobOffer[] = [];
  const sources: SourceReport[] = [];
  const cutoff = Date.now() - query.sinceDays * 86_400_000;

  for (const [index, result] of settled.entries()) {
    if (result.status === "fulfilled") {
      collected.push(...result.value.offers);
      sources.push(result.value.report);
      continue;
    }

    const source = SOURCES[index];
    if (!source) continue;
    sources.push({
      id: source.id,
      label: source.label,
      state: "error",
      count: 0,
      message: "Source indisponible pour le moment",
    });
  }

  const offers = dedupeOffers(collected).filter((offer) => {
    if (!offer.publishedAt) return true;
    const time = Date.parse(offer.publishedAt);
    return Number.isNaN(time) || time >= cutoff;
  });

  return {
    query,
    offers,
    sources,
    boards: externalBoardLinks(query),
  };
}
