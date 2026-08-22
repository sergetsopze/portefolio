const ORIGINS: Array<{ match: RegExp; label: string }> = [
  { match: /linkedin\.com/i, label: "LinkedIn" },
  { match: /indeed\./i, label: "Indeed" },
  { match: /hellowork\.com/i, label: "HelloWork" },
  { match: /apec\.fr/i, label: "APEC" },
  { match: /welcometothejungle\.com/i, label: "Welcome to the Jungle" },
  { match: /jobteaser\.com/i, label: "JobTeaser" },
  { match: /meteojob\.com/i, label: "Meteojob" },
  { match: /cadremploi\.fr/i, label: "Cadremploi" },
  { match: /francetravail\.fr|pole-emploi\.fr/i, label: "France Travail" },
  { match: /groupecreditagricole\.jobs/i, label: "Crédit Agricole" },
  { match: /orange\.jobs/i, label: "Orange" },
  { match: /myworkdayjobs\.com/i, label: "Airbus" },
  { match: /airfrance\.com/i, label: "Air France" },
  { match: /societegenerale\.com/i, label: "Société Générale" },
  { match: /bnpparibas/i, label: "BNP Paribas" },
  { match: /creditmutuel\.fr/i, label: "Crédit Mutuel" },
  { match: /laposterecrute\.fr/i, label: "La Poste" },
  { match: /enedis\.fr/i, label: "ENEDIS" },
  { match: /sncf\.com/i, label: "SNCF" },
  { match: /adzuna\./i, label: "Adzuna" },
  { match: /jooble\./i, label: "Jooble" },
];

export function labelFromUrl(url: string, fallback = "Ajout manuel") {
  try {
    const host = new URL(url).hostname;
    return ORIGINS.find((item) => item.match.test(host))?.label ?? fallback;
  } catch {
    return fallback;
  }
}

export function withPublisherLabel(publisher: string | undefined, via: string) {
  const name = publisher?.trim();
  if (!name) return via;
  return `${name} · ${via}`;
}
