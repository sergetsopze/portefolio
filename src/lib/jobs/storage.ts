import type { JobOffer } from "./types";
import { labelFromUrl } from "./origin";

const INBOX_KEY = "portefolio.jobs.inbox";
const SAVED_KEY = "portefolio.jobs.saved";
const APPLIED_KEY = "portefolio.jobs.applied";
const HIDDEN_KEY = "portefolio.jobs.hidden";
const MAX_INBOX = 400;

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function readInbox(): JobOffer[] {
  return readJson<JobOffer[]>(INBOX_KEY, []);
}

export function mergeInbox(incoming: JobOffer[]) {
  const current = readInbox();
  const byId = new Map(current.map((job) => [job.id, job]));
  for (const job of incoming) {
    if (!byId.has(job.id)) byId.set(job.id, job);
  }
  const next = [...byId.values()]
    .sort((a, b) => {
      const da = a.publishedAt ? Date.parse(a.publishedAt) : Date.parse(a.collectedAt);
      const db = b.publishedAt ? Date.parse(b.publishedAt) : Date.parse(b.collectedAt);
      return db - da;
    })
    .slice(0, MAX_INBOX);
  writeJson(INBOX_KEY, next);
  return next;
}

export function readSavedIds() {
  return new Set(readJson<string[]>(SAVED_KEY, []));
}

export function toggleSaved(id: string) {
  const ids = readSavedIds();
  if (ids.has(id)) ids.delete(id);
  else ids.add(id);
  writeJson(SAVED_KEY, [...ids]);
  return ids;
}

export function readAppliedIds() {
  return new Set(readJson<string[]>(APPLIED_KEY, []));
}

export function toggleApplied(id: string) {
  const ids = readAppliedIds();
  if (ids.has(id)) ids.delete(id);
  else ids.add(id);
  writeJson(APPLIED_KEY, [...ids]);
  return ids;
}

export function readHiddenIds() {
  return new Set(readJson<string[]>(HIDDEN_KEY, []));
}

export function hideJob(id: string) {
  const ids = readHiddenIds();
  ids.add(id);
  writeJson(HIDDEN_KEY, [...ids]);
  return ids;
}

export function addManualOffer(input: {
  title: string;
  company: string;
  location: string;
  url: string;
  contract: string;
  description?: string;
}): JobOffer {
  const offer: JobOffer = {
    id: `manual:${Date.now()}`,
    source: "manual",
    sourceLabel: labelFromUrl(input.url),
    title: input.title.trim(),
    company: input.company.trim() || "Entreprise non précisée",
    location: input.location.trim() || "France",
    contract: input.contract.trim(),
    publishedAt: new Date().toISOString(),
    url: input.url.trim(),
    description:
      input.description?.trim() ||
      `Offre capturée depuis ${labelFromUrl(input.url)}.`,
    collectedAt: new Date().toISOString(),
  };
  mergeInbox([offer]);
  const saved = readSavedIds();
  saved.add(offer.id);
  writeJson(SAVED_KEY, [...saved]);
  return offer;
}
