import { isRelevantLocation } from "../location";
import { makeJobId, snippet, withTimeout } from "../normalize";
import type { JobOffer, SourceAdapter } from "../types";

type ArbeitnowJob = {
  slug?: string;
  company_name?: string;
  title?: string;
  description?: string;
  remote?: boolean;
  url?: string;
  location?: string;
  job_types?: string[];
  created_at?: number;
};

export const arbeitnowSource: SourceAdapter = {
  id: "arbeitnow",
  label: "Arbeitnow",
  async search(query) {
    try {
      const response = await fetch("https://www.arbeitnow.com/api/job-board-api", {
        signal: withTimeout(10_000),
      });

      if (!response.ok) {
        throw new Error(`Recherche Arbeitnow (${response.status})`);
      }

      const data = (await response.json()) as { data?: ArbeitnowJob[] };
      const needle = query.keywords.trim().toLowerCase();

      const offers = (data.data ?? [])
        .filter((item) => {
          const haystack = `${item.title} ${item.company_name} ${item.description}`.toLowerCase();
          return !needle || haystack.includes(needle);
        })
        .filter((item) => isRelevantLocation(item.location || "") || item.remote)
        .filter((item) => {
          const blob = `${item.title} ${(item.job_types ?? []).join(" ")}`;
          if (query.contract === "stage") return /intern|stage/i.test(blob);
          if (query.contract === "alternance") return /alternance|apprent/i.test(blob);
          return true;
        })
        .slice(0, 30)
        .flatMap((item): JobOffer[] => {
          if (!item.slug || !item.title || !item.url) return [];
          return [
            {
              id: makeJobId("arbeitnow", item.slug),
              source: "arbeitnow",
              sourceLabel: "Arbeitnow",
              title: item.title,
              company: item.company_name || "Entreprise non précisée",
              location: item.remote
                ? `${item.location || "Remote"} · Remote`
                : item.location || "Europe",
              contract: (item.job_types ?? []).join(", "),
              publishedAt: item.created_at
                ? new Date(item.created_at * 1000).toISOString()
                : null,
              url: item.url,
              description: snippet(item.description || ""),
              collectedAt: new Date().toISOString(),
            },
          ];
        });

      return {
        offers,
        report: {
          id: "arbeitnow",
          label: "Arbeitnow",
          state: "ok",
          count: offers.length,
        },
      };
    } catch (error) {
      return {
        offers: [],
        report: {
          id: "arbeitnow",
          label: "Arbeitnow",
          state: "error",
          count: 0,
          message:
            error instanceof Error ? error.message : "Impossible de joindre Arbeitnow",
        },
      };
    }
  },
};
