import { NextRequest } from "next/server";
import { jobProfile } from "@/lib/jobs/profile";
import { parseSearchQuery, searchJobs } from "@/lib/jobs/search";
import { markSent, takeUnsent } from "@/lib/jobs/sent";
import { sendOffersToTelegram, telegramConfigured } from "@/lib/jobs/telegram";

export async function GET() {
  return Response.json({
    telegram: telegramConfigured(),
  });
}

export async function POST(request: NextRequest) {
  if (!telegramConfigured()) {
    return Response.json(
      {
        error:
          "Telegram n’est pas encore branché. Crée un bot avec @BotFather, puis ajoute TELEGRAM_BOT_TOKEN et TELEGRAM_CHAT_ID.",
      },
      { status: 400 },
    );
  }

  const body = (await request.json().catch(() => ({}))) as {
    q?: string;
    where?: string;
    contract?: string;
    since?: string;
  };

  const query = parseSearchQuery({
    keywords: body.q || process.env.JOBS_KEYWORDS || jobProfile.keywords,
    location: body.where || process.env.JOBS_LOCATION || jobProfile.location,
    contract: body.contract || "alternance",
    since: body.since || "3",
  });

  const result = await searchJobs(query);
  const { fresh } = await takeUnsent(result.offers.map((offer) => offer.id));
  const newcomers = result.offers.filter((offer) => fresh.includes(offer.id));
  const sent = await sendOffersToTelegram(newcomers);
  if (newcomers.length) await markSent(newcomers.map((offer) => offer.id));

  return Response.json({
    query,
    found: result.offers.length,
    sent,
    sources: result.sources.filter((source) => source.state === "ok"),
  });
}
