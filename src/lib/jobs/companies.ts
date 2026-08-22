export type TargetCompany = {
  id: string;
  name: string;
  careerUrl: string;
  franceTravailQuery: string;
};

/** Entreprises suivies : flux carrière public quand il existe, sinon France Travail. */
export const TARGET_COMPANIES: TargetCompany[] = [
  {
    id: "bnp",
    name: "BNP Paribas",
    careerUrl: "https://group.bnpparibas/fr/emploi-carriere/offres-emploi",
    franceTravailQuery: "BNP Paribas",
  },
  {
    id: "ca",
    name: "Crédit Agricole",
    careerUrl: "https://groupecreditagricole.jobs/fr/nos-offres/",
    franceTravailQuery: "Crédit Agricole",
  },
  {
    id: "cm",
    name: "Crédit Mutuel",
    careerUrl: "https://recrutement.creditmutuel.fr/fr/nos_offres.html",
    franceTravailQuery: "Crédit Mutuel",
  },
  {
    id: "orange",
    name: "Orange",
    careerUrl: "https://orange.jobs/fr/fr/search-results",
    franceTravailQuery: "Orange",
  },
  {
    id: "sg",
    name: "Société Générale",
    careerUrl: "https://careers.societegenerale.com/fr/search",
    franceTravailQuery: "Société Générale",
  },
  {
    id: "laposte",
    name: "La Poste",
    careerUrl: "https://www.laposterecrute.fr/recherche-offres",
    franceTravailQuery: "La Poste",
  },
  {
    id: "enedis",
    name: "ENEDIS",
    careerUrl: "https://www.enedis.fr/hub-carriere",
    franceTravailQuery: "ENEDIS",
  },
  {
    id: "sncf",
    name: "SNCF",
    careerUrl: "https://emploi.sncf.com/",
    franceTravailQuery: "SNCF",
  },
  {
    id: "idf",
    name: "Île-de-France",
    careerUrl: "https://www.iledefrance.fr/emploi",
    franceTravailQuery: "Région Île-de-France",
  },
  {
    id: "groupama",
    name: "Groupama",
    careerUrl: "https://www.groupama-gan-recrute.com/nos-offres/",
    franceTravailQuery: "Groupama",
  },
  {
    id: "bouygues",
    name: "Bouygues Telecom",
    careerUrl: "https://www.corporate.bouyguestelecom.fr/travailler-ensemble/nos-offres/",
    franceTravailQuery: "Bouygues Telecom",
  },
  {
    id: "keyyo",
    name: "Keyyo",
    careerUrl: "https://jobs.keyyo.com/nos-offres",
    franceTravailQuery: "Keyyo",
  },
  {
    id: "france-travail",
    name: "France Travail",
    careerUrl: "https://www.francetravail.fr/accueil/recrutement.html",
    franceTravailQuery: "France Travail",
  },
  {
    id: "airbus",
    name: "Airbus",
    careerUrl: "https://ag.wd3.myworkdayjobs.com/fr-FR/Airbus",
    franceTravailQuery: "Airbus",
  },
  {
    id: "thales",
    name: "Thales",
    careerUrl: "https://thales.wd3.myworkdayjobs.com/en-US/Careers",
    franceTravailQuery: "Thales",
  },
  {
    id: "eiffage",
    name: "Eiffage",
    careerUrl: "https://eiffage.wd3.myworkdayjobs.com/fr-FR/Eiffage_Careers",
    franceTravailQuery: "Eiffage",
  },
  {
    id: "airfrance",
    name: "Air France",
    careerUrl: "https://recrutement.airfrance.com/offre-de-emploi/liste-toutes-offres.aspx?all=1",
    franceTravailQuery: "Air France",
  },
  {
    id: "safran",
    name: "Safran",
    careerUrl: "https://www.safran-group.com/jobs",
    franceTravailQuery: "Safran",
  },
  {
    id: "carrefour",
    name: "Carrefour",
    careerUrl: "https://recrute.carrefour.fr/",
    franceTravailQuery: "Carrefour",
  },
];
