import { isRelevantLocation } from "../location";
import { makeJobId, snippet, withTimeout } from "../normalize";
import type { JobOffer, SourceAdapter } from "../types";

type RemotiveJob = {
  id?: number;
  url?: string;
  title?: string;
  company_name?: string;
  job_type?: string;
  publication_date?: string;
  candidate_required_location?: string;
  description?: string;
};

export const remotiveSource: SourceAdapter = {
  id: "remotive",
  label: "Remotive",
  async search(query) {
    try {
      const params = new URLSearchParams({
        search: query.keywords.trim() || "developer",
        limit: "30",
      });

      const response = await fetch(
        `https://remotive.com/api/remote-jobs?${params.toString()}`,
        { signal: withTimeout(10_000) },
      );

      if (!response.ok) {
        throw new Error(`Recherche Remotive (${response.status})`);
      }

      const data = (await response.json()) as { jobs?: RemotiveJob[] };
      const offers = (data.jobs ?? [])
        .filter((item) => isRelevantLocation(item.candidate_required_location || ""))
        .filter((item) => {
          if (query.contract === "stage") {
            return /intern|stage|internship/i.test(`${item.title} ${item.job_type}`);
          }
          if (query.contract === "alternance") {
            return /alternance|apprent/i.test(`${item.title} ${item.job_type}`);
          }
          return true;
        })
        .flatMap((item): JobOffer[] => {
          if (!item.id || !item.title || !item.url) return [];
          return [
            {
              id: makeJobId("remotive", String(item.id)),
              source: "remotive",
              sourceLabel: "Remotive",
              title: item.title,
              company: item.company_name || "Entreprise non précisée",
              location: item.candidate_required_location || "Remote",
              contract: item.job_type || "Remote",
              publishedAt: item.publication_date || null,
              url: item.url,
              description: snippet(item.description || ""),
              collectedAt: new Date().toISOString(),
            },
          ];
        });

      return {
        offers,
        report: {
          id: "remotive",
          label: "Remotive",
          state: "ok",
          count: offers.length,
        },
      };
    } catch (error) {
      return {
        offers: [],
        report: {
          id: "remotive",
          label: "Remotive",
          state: "error",
          count: 0,
          message:
            error instanceof Error ? error.message : "Impossible de joindre Remotive",
        },
      };
    }
  },
};
