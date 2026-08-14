import { makeJobId, snippet, withTimeout } from "../normalize";
import { withPublisherLabel } from "../origin";
import type { JobOffer, SourceAdapter } from "../types";

type JSearchJob = {
  job_id?: string;
  job_title?: string;
  employer_name?: string;
  job_city?: string;
  job_country?: string;
  job_employment_type?: string;
  job_description?: string;
  job_apply_link?: string;
  job_publisher?: string;
  job_posted_at_datetime_utc?: string;
};

function queryFor(input: { keywords: string; location: string; contract: string }) {
  const extra =
    input.contract === "stage"
      ? "stage"
      : input.contract === "alternance"
        ? "alternance"
        : "";
  return [input.keywords.trim(), extra, input.location.trim() || "France"]
    .filter(Boolean)
    .join(" ");
}

export const jsearchSource: SourceAdapter = {
  id: "jsearch",
  label: "LinkedIn / Indeed (JSearch)",
  async search(query) {
    const apiKey = process.env.RAPIDAPI_KEY;
    if (!apiKey) {
      return {
        offers: [],
        report: {
          id: "jsearch",
          label: "LinkedIn / Indeed (JSearch)",
          state: "skipped",
          count: 0,
          message:
            "JSearch (RapidAPI) ramène des offres LinkedIn, Indeed et Glassdoor dans cette page.",
          setupUrl: "https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch",
        },
      };
    }

    try {
      const params = new URLSearchParams({
        query: queryFor(query),
        page: "1",
        num_pages: "1",
        country: "fr",
        date_posted:
          query.sinceDays <= 1 ? "today" : query.sinceDays <= 3 ? "3days" : "week",
      });

      const response = await fetch(
        `https://jsearch.p.rapidapi.com/search?${params.toString()}`,
        {
          headers: {
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
          },
          signal: withTimeout(12_000),
        },
      );

      if (!response.ok) {
        throw new Error(`Recherche JSearch (${response.status})`);
      }

      const data = (await response.json()) as { data?: JSearchJob[] };
      const offers = (data.data ?? []).flatMap((item): JobOffer[] => {
        if (!item.job_id || !item.job_title || !item.job_apply_link) return [];
        const place = [item.job_city, item.job_country].filter(Boolean).join(", ");
        return [
          {
            id: makeJobId("jsearch", item.job_id),
            source: "jsearch",
            sourceLabel: withPublisherLabel(item.job_publisher, "JSearch"),
            title: item.job_title,
            company: item.employer_name || "Entreprise non précisée",
            location: place || query.location || "France",
            contract: item.job_employment_type || "",
            publishedAt: item.job_posted_at_datetime_utc || null,
            url: item.job_apply_link,
            description: snippet(item.job_description || ""),
            collectedAt: new Date().toISOString(),
          },
        ];
      });

      return {
        offers,
        report: {
          id: "jsearch",
          label: "LinkedIn / Indeed (JSearch)",
          state: "ok",
          count: offers.length,
        },
      };
    } catch (error) {
      return {
        offers: [],
        report: {
          id: "jsearch",
          label: "LinkedIn / Indeed (JSearch)",
          state: "error",
          count: 0,
          message:
            error instanceof Error ? error.message : "Impossible de joindre JSearch",
          setupUrl: "https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch",
        },
      };
    }
  },
};
