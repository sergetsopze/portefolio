export function GET() {
  return Response.json({
    sources: [
      {
        id: "france-travail",
        label: "France Travail",
        ready: Boolean(
          process.env.FRANCE_TRAVAIL_CLIENT_ID &&
            process.env.FRANCE_TRAVAIL_CLIENT_SECRET,
        ),
        required: true,
        setupUrl: "https://francetravail.io/",
        hint: "Crée une application, souscris à l’API Offres d’emploi v2, puis copie l’identifiant et le secret.",
      },
      {
        id: "jooble",
        label: "Jooble (Indeed et autres)",
        ready: Boolean(process.env.JOOBLE_API_KEY),
        required: false,
        setupUrl: "https://jooble.org/api/about",
        hint: "Agrège Indeed et de nombreux job boards. Clé gratuite, c’est le plus simple pour voir ces offres ici.",
      },
      {
        id: "jsearch",
        label: "LinkedIn / Indeed (JSearch)",
        ready: Boolean(process.env.RAPIDAPI_KEY),
        required: false,
        setupUrl: "https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch",
        hint: "Via RapidAPI. Les offres LinkedIn et Indeed apparaissent directement dans ta liste.",
      },
      {
        id: "adzuna",
        label: "Adzuna",
        ready: Boolean(process.env.ADZUNA_APP_ID && process.env.ADZUNA_APP_KEY),
        required: false,
        setupUrl: "https://developer.adzuna.com/",
        hint: "Clé gratuite. Adzuna indexe un large volume d’offres en France.",
      },
      {
        id: "la-bonne-alternance",
        label: "La Bonne Alternance",
        ready: Boolean(process.env.LBA_CALLER_EMAIL),
        required: false,
        setupUrl:
          "https://labonnealternance.apprentissage.beta.gouv.fr/espace-developpeurs",
        hint: "Indique ton e-mail dans LBA_CALLER_EMAIL. Idéal pour l’alternance (HelloWork, Meteojob, France Travail…).",
      },
      {
        id: "careers",
        label: "Sites carrière entreprises",
        ready: true,
        required: false,
        setupUrl: "",
        hint: "Crédit Agricole, Orange, Airbus, Air France en direct. Les autres (BNP, SG, SNCF, ENEDIS…) via France Travail + lien vers leur site.",
      },
    ],
    telegram: Boolean(
      process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID,
    ),
  });
}
