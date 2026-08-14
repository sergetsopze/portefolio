import { makeJobId, snippet, withTimeout } from "../normalize";
import { withPublisherLabel } from "../origin";
import type { JobOffer, SourceAdapter } from "../types";

type JoobleJob = {
  id?: string | number;
  title?: string;
  location?: string;
  snippet?: string;
  salary?: string;
  source?: string;
  type?: string;
  link?: string;
  company?: string;
  updated?: string;
};

function keywordsFor(query: { keywords: string; contract: string }) {
  const extra =
    query.contract === "stage"
      ? "stage"
      : query.contract === "alternance"
        ? "alternance"
        : "";
  return [query.keywords.trim(), extra].filter(Boolean).join(" ");
}

export const joobleSource: SourceAdapter = {
  id: "jooble",
  label: "Jooble",
  async search(query) {
    const apiKey = process.env.JOOBLE_API_KEY;
    if (!apiKey) {
      return {
        offers: [],
        report: {
          id: "jooble",
          label: "Jooble",
          state: "skipped",
          count: 0,
          message:
            "Jooble agrège Indeed et d’autres job boards. Clé gratuite sur jooble.org/api/about.",
          setupUrl: "https://jooble.org/api/about",
        },
      };
    }

    try {
      const response = await fetch(`https://jooble.org/api/${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          keywords: keywordsFor(query),
          location: query.location.trim() || "France",
          page: "1",
          ResultOnPage: "30",
          companysearch: "false",
        }),
        signal: withTimeout(12_000),
      });

      if (!response.ok) {
        throw new Error(`Recherche Jooble (${response.status})`);
      }

      const data = (await response.json()) as { jobs?: JoobleJob[] };
      const offers = (data.jobs ?? []).flatMap((item): JobOffer[] => {
        if (!item.id || !item.title || !item.link) return [];
        return [
          {
            id: makeJobId("jooble", String(item.id)),
            source: "jooble",
            sourceLabel: withPublisherLabel(item.source, "Jooble"),
            title: item.title,
            company: item.company || "Entreprise non précisée",
            location: item.location || query.location || "France",
            contract: item.type || item.salary || "",
            publishedAt: item.updated || null,
            url: item.link,
            description: snippet(item.snippet || ""),
            collectedAt: new Date().toISOString(),
          },
        ];
      });

      return {
        offers,
        report: {
          id: "jooble",
          label: "Jooble",
          state: "ok",
          count: offers.length,
        },
      };
    } catch (error) {
      return {
        offers: [],
        report: {
          id: "jooble",
          label: "Jooble",
          state: "error",
          count: 0,
          message:
            error instanceof Error ? error.message : "Impossible de joindre Jooble",
          setupUrl: "https://jooble.org/api/about",
        },
      };
    }
  },
};
