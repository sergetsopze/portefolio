import type { JobOffer, JobSourceId } from "./types";

export function slugPart(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

export function makeJobId(source: JobSourceId, rawId: string) {
  return `${source}:${rawId}`;
}

export function stripHtml(value: string) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function snippet(value: string, max = 280) {
  const text = stripHtml(value);
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}…`;
}

export function dedupeOffers(offers: JobOffer[]) {
  const seen = new Set<string>();
  const unique: JobOffer[] = [];

  for (const offer of offers) {
    const key = [
      slugPart(offer.title),
      slugPart(offer.company),
      slugPart(offer.location.split(/[,(-]/)[0] ?? ""),
    ].join("|");

    if (seen.has(offer.id) || seen.has(key)) continue;
    seen.add(offer.id);
    seen.add(key);
    unique.push(offer);
  }

  return unique.sort((a, b) => {
    const da = a.publishedAt ? Date.parse(a.publishedAt) : 0;
    const db = b.publishedAt ? Date.parse(b.publishedAt) : 0;
    return db - da;
  });
}

export function withTimeout(ms: number) {
  return AbortSignal.timeout(ms);
}
