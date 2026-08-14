import { resolveLocation } from "../location";
import { makeJobId, snippet, withTimeout } from "../normalize";
import type { JobOffer, JobSearchQuery, SourceAdapter } from "../types";

const TOKEN_URL =
  "https://entreprise.francetravail.fr/connexion/oauth2/access_token?realm=/partenaire";
const SEARCH_URL =
  "https://api.francetravail.io/partenaire/offresdemploi/v2/offres/search";
const SCOPE = "api_offresdemploiv2 o2dsoffre";

type TokenCache = { value: string; expiresAt: number };
let tokenCache: TokenCache | null = null;

type FranceTravailOffer = {
  id?: string;
  intitule?: string;
  description?: string;
  dateCreation?: string;
  typeContratLibelle?: string;
  natureContrat?: string;
  origineOffre?: { urlOrigine?: string };
  entreprise?: { nom?: string };
  lieuTravail?: { libelle?: string };
};

function skipped(message: string, setupUrl?: string) {
  return {
    offers: [] as JobOffer[],
    report: {
      id: "france-travail" as const,
      label: "France Travail",
      state: "skipped" as const,
      count: 0,
      message,
      setupUrl,
    },
  };
}

async function getAccessToken(clientId: string, clientSecret: string) {
  if (tokenCache && Date.now() < tokenCache.expiresAt - 30_000) {
    return tokenCache.value;
  }

  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
    scope: SCOPE,
  });

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    signal: withTimeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`Authentification France Travail (${response.status})`);
  }

  const data = (await response.json()) as {
    access_token?: string;
    expires_in?: number;
  };

  if (!data.access_token) {
    throw new Error("Jeton France Travail manquant");
  }

  tokenCache = {
    value: data.access_token,
    expiresAt: Date.now() + (data.expires_in ?? 1400) * 1000,
  };

  return data.access_token;
}

function natureContrats(contract: JobSearchQuery["contract"]) {
  if (contract === "stage") return ["FS"];
  if (contract === "alternance") return ["FA", "FJ"];
  return [];
}

function typeContrat(contract: JobSearchQuery["contract"]) {
  if (contract === "cdi") return "CDI";
  if (contract === "cdd") return "CDD";
  return "";
}

function mapOffer(item: FranceTravailOffer): JobOffer | null {
  if (!item.id || !item.intitule) return null;
  const url =
    item.origineOffre?.urlOrigine ||
    `https://candidat.francetravail.fr/offres/recherche/detail/${item.id}`;

  return {
    id: makeJobId("france-travail", item.id),
    source: "france-travail",
    sourceLabel: "France Travail",
    title: item.intitule,
    company: item.entreprise?.nom || "Entreprise non précisée",
    location: item.lieuTravail?.libelle || "France",
    contract: item.typeContratLibelle || item.natureContrat || "",
    publishedAt: item.dateCreation || null,
    url,
    description: snippet(item.description || ""),
    collectedAt: new Date().toISOString(),
  };
}

async function searchOnce(
  token: string,
  query: JobSearchQuery,
  natureContrat?: string,
) {
  const params = new URLSearchParams();
  if (query.keywords.trim()) params.set("motsCles", query.keywords.trim());
  params.set("sort", "1");
  params.set("publieeDepuis", String(query.sinceDays));

  const geo = resolveLocation(query.location);
  if (geo?.department) params.set("departement", geo.department);

  const type = typeContrat(query.contract);
  if (type) params.set("typeContrat", type);
  if (natureContrat) params.set("natureContrat", natureContrat);

  const response = await fetch(`${SEARCH_URL}?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      Range: "0-49",
    },
    signal: withTimeout(12_000),
  });

  if (response.status === 204) return [] as JobOffer[];
  if (!response.ok) {
    throw new Error(`Recherche France Travail (${response.status})`);
  }

  const data = (await response.json()) as { resultats?: FranceTravailOffer[] };
  return (data.resultats ?? []).map(mapOffer).filter((item): item is JobOffer => Boolean(item));
}

export const franceTravailSource: SourceAdapter = {
  id: "france-travail",
  label: "France Travail",
  async search(query) {
    const clientId = process.env.FRANCE_TRAVAIL_CLIENT_ID;
    const clientSecret = process.env.FRANCE_TRAVAIL_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return skipped(
        "Ajoute tes identifiants API pour activer le plus gros vivier d’offres françaises (y compris beaucoup de partenaires).",
        "https://francetravail.io/",
      );
    }

    try {
      const token = await getAccessToken(clientId, clientSecret);
      const natures = natureContrats(query.contract);
      const batches = natures.length
        ? await Promise.all(natures.map((code) => searchOnce(token, query, code)))
        : [await searchOnce(token, query)];

      const offers = batches.flat();
      return {
        offers,
        report: {
          id: "france-travail",
          label: "France Travail",
          state: "ok",
          count: offers.length,
        },
      };
    } catch (error) {
      return {
        offers: [],
        report: {
          id: "france-travail",
          label: "France Travail",
          state: "error",
          count: 0,
          message:
            error instanceof Error
              ? error.message
              : "Impossible de joindre France Travail",
          setupUrl: "https://francetravail.io/",
        },
      };
    }
  },
};
