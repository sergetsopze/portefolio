export const CONTRACTS = [
  "all",
  "stage",
  "alternance",
  "cdi",
  "cdd",
] as const;

export type ContractFilter = (typeof CONTRACTS)[number];

export type JobSourceId =
  | "france-travail"
  | "adzuna"
  | "la-bonne-alternance"
  | "jooble"
  | "jsearch"
  | "careers"
  | "remotive"
  | "arbeitnow"
  | "manual";

export type SourceState = "ok" | "skipped" | "error";

export type JobOffer = {
  id: string;
  source: JobSourceId;
  sourceLabel: string;
  title: string;
  company: string;
  location: string;
  contract: string;
  publishedAt: string | null;
  url: string;
  description: string;
  collectedAt: string;
};

export type JobSearchQuery = {
  keywords: string;
  location: string;
  contract: ContractFilter;
  sinceDays: 1 | 3 | 7;
};

export type SourceReport = {
  id: JobSourceId;
  label: string;
  state: SourceState;
  count: number;
  message?: string;
  setupUrl?: string;
};

export type JobSearchResponse = {
  query: JobSearchQuery;
  offers: JobOffer[];
  sources: SourceReport[];
  boards: ExternalBoardLink[];
};

export type ExternalBoardLink = {
  id: string;
  label: string;
  url: string;
  note: string;
};

export type SourceAdapter = {
  id: JobSourceId;
  label: string;
  search: (query: JobSearchQuery) => Promise<{
    offers: JobOffer[];
    report: SourceReport;
  }>;
};
