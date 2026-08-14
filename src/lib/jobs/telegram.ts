import type { JobOffer } from "./types";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function chunk<T>(items: T[], size: number) {
  const groups: T[][] = [];
  for (let i = 0; i < items.length; i += size) groups.push(items.slice(i, i + size));
  return groups;
}

async function sendMessage(token: string, chatId: string, text: string) {
  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Telegram (${response.status}) ${body.slice(0, 180)}`);
  }
}

export function telegramConfigured() {
  return Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID);
}

export async function sendOffersToTelegram(offers: JobOffer[]) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    throw new Error("Ajoute TELEGRAM_BOT_TOKEN et TELEGRAM_CHAT_ID dans .env.local");
  }

  if (!offers.length) {
    await sendMessage(
      token,
      chatId,
      "Pas de nouvelle offre d’alternance aujourd’hui.",
    );
    return 0;
  }

  await sendMessage(
    token,
    chatId,
    `<b>${offers.length} nouvelle${offers.length > 1 ? "s" : ""} offre${offers.length > 1 ? "s" : ""}</b>\nAlternance M2 · administrateur systèmes & réseaux`,
  );

  for (const group of chunk(offers, 6)) {
    const text = group
      .map((offer) => {
        const title = escapeHtml(offer.title);
        const meta = escapeHtml(
          [offer.company, offer.location, offer.sourceLabel].filter(Boolean).join(" · "),
        );
        return `<b>${title}</b>\n${meta}\n${offer.url}`;
      })
      .join("\n\n");
    await sendMessage(token, chatId, text);
  }

  return offers.length;
}
