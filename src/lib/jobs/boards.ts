import { TARGET_COMPANIES } from "./companies";
import type { ExternalBoardLink, JobSearchQuery } from "./types";

function encode(value: string) {
  return encodeURIComponent(value);
}

function withContractKeywords(query: JobSearchQuery) {
  const base = query.keywords.trim();
  if (query.contract === "stage") return `${base} stage`.trim();
  if (query.contract === "alternance") return `${base} alternance`.trim();
  return base;
}

export function externalBoardLinks(query: JobSearchQuery): ExternalBoardLink[] {
  const keywords = withContractKeywords(query) || "stage";
  const location = query.location.trim() || "France";
  const q = encode(keywords);
  const loc = encode(location);

  const wttjContract =
    query.contract === "stage"
      ? "internship"
      : query.contract === "alternance"
        ? "apprenticeship"
        : query.contract === "cdi"
          ? "full_time"
          : "";

  return [
    {
      id: "linkedin",
      label: "LinkedIn",
      url: `https://www.linkedin.com/jobs/search/?keywords=${q}&location=${loc}`,
      note: "Pas d’API publique — ouverture de la recherche officielle",
    },
    {
      id: "indeed",
      label: "Indeed",
      url: `https://fr.indeed.com/jobs?q=${q}&l=${loc}`,
      note: "Pas d’API publique — ouverture de la recherche officielle",
    },
    {
      id: "hellowork",
      label: "HelloWork",
      url: `https://www.hellowork.com/fr-fr/emploi/recherche.html?k=${q}&l=${loc}`,
      note: "Couvert en partie via La Bonne Alternance / France Travail",
    },
    {
      id: "apec",
      label: "APEC",
      url: `https://www.apec.fr/candidat/recherche-emploi.html/emploi?motsCles=${q}&lieux=${loc}`,
      note: "Pas d’API publique — ouverture de la recherche officielle",
    },
    {
      id: "wttj",
      label: "Welcome to the Jungle",
      url: `https://www.welcometothejungle.com/fr/jobs?query=${q}${
        wttjContract
          ? `&refinementList%5Bcontract_type%5D%5B%5D=${wttjContract}`
          : ""
      }`,
      note: "Pas d’API publique — ouverture de la recherche officielle",
    },
    {
      id: "france-travail-web",
      label: "France Travail (site)",
      url: `https://candidat.francetravail.fr/offres/recherche?motsCles=${q}&offresPartenaires=true`,
      note: "Même vivier que l’API, utile pour comparer",
    },
    {
      id: "jobteaser",
      label: "JobTeaser",
      url: `https://www.jobteaser.com/fr/job-offers?q=${q}`,
      note: "Stages et premiers emplois étudiants",
    },
    {
      id: "1jeune1solution",
      label: "1 jeune 1 solution",
      url: `https://www.1jeune1solution.gouv.fr/emplois?motCle=${q}`,
      note: "Portail public stages / alternance / premiers jobs",
    },
    {
      id: "meteojob",
      label: "Meteojob",
      url: `https://www.meteojob.com/emploi?what=${q}&where=${loc}`,
      note: "Job board français généraliste",
    },
    {
      id: "cadremploi",
      label: "Cadremploi",
      url: `https://www.cadremploi.fr/emploi/recherche?motcle=${q}`,
      note: "Offres cadres, utile en complément de l’APEC",
    },
    ...TARGET_COMPANIES.map((company) => ({
      id: `career-${company.id}`,
      label: company.name,
      url: company.careerUrl,
      note: "Site carrière de l’entreprise",
    })),
  ];
}
