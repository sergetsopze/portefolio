"use client";

import { useEffect, useState } from "react";
import { TARGET_COMPANIES } from "@/lib/jobs/companies";
import { jobProfile } from "@/lib/jobs/profile";
import type { JobOffer, JobSearchResponse, SourceReport } from "@/lib/jobs/types";

type SinceDays = 1 | 3 | 7;

function relativeDate(value: string | null) {
  if (!value) return "Date inconnue";
  const time = Date.parse(value);
  if (Number.isNaN(time)) return "Date inconnue";
  const hours = Math.round((Date.now() - time) / 3_600_000);
  if (hours < 1) return "À l’instant";
  if (hours < 24) return `Il y a ${hours} h`;
  const days = Math.round(hours / 24);
  if (days === 1) return "Hier";
  return `Il y a ${days} j`;
}

export function JobsBoard() {
  const [keywords, setKeywords] = useState<string>(jobProfile.keywords);
  const [location, setLocation] = useState(jobProfile.location);
  const [since, setSince] = useState<SinceDays>(3);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [offers, setOffers] = useState<JobOffer[]>([]);
  const [sources, setSources] = useState<SourceReport[]>([]);
  const [telegramReady, setTelegramReady] = useState(false);

  async function loadOffers() {
    setLoading(true);
    setError("");
    setNotice("");
    const params = new URLSearchParams({
      q: keywords.trim() || jobProfile.keywords,
      where: location.trim() || jobProfile.location,
      contract: "alternance",
      since: String(since),
    });
    try {
      const response = await fetch(`/api/jobs/search?${params.toString()}`);
      const data = (await response.json()) as JobSearchResponse & { error?: string };
      if (!response.ok) throw new Error(data.error || "Recherche impossible");
      setOffers(data.offers);
      setSources(data.sources.filter((item) => item.state === "ok" || item.state === "error"));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Recherche impossible");
    } finally {
      setLoading(false);
    }
  }

  async function sendTelegram() {
    setSending(true);
    setError("");
    setNotice("");
    try {
      const response = await fetch("/api/jobs/digest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: keywords.trim() || jobProfile.keywords,
          where: location.trim() || jobProfile.location,
          contract: "alternance",
          since: String(since),
        }),
      });
      const data = (await response.json()) as {
        error?: string;
        sent?: number;
        found?: number;
      };
      if (!response.ok) throw new Error(data.error || "Envoi Telegram impossible");
      setNotice(
        data.sent
          ? `${data.sent} nouvelle${data.sent > 1 ? "s" : ""} offre${data.sent > 1 ? "s" : ""} envoyée${data.sent > 1 ? "s" : ""} sur Telegram.`
          : "Aucune nouvelle offre à envoyer (déjà reçues, ou rien de publié).",
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Envoi Telegram impossible");
    } finally {
      setSending(false);
    }
  }

  useEffect(() => {
    void loadOffers();
    fetch("/api/jobs/status")
      .then((response) => response.json())
      .then((data: { telegram?: boolean }) => setTelegramReady(Boolean(data.telegram)))
      .catch(() => undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto min-h-svh max-w-2xl px-4 py-8">
      <a href="/" className="text-sm text-slate-500 hover:text-slate-800">
        ← Portfolio
      </a>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">
        Alternance M2
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        Offres récentes pour un poste d’
        <strong>{jobProfile.title}</strong> — support N2/N3, Windows/Linux,
        RSSI. CA, Orange, Airbus et Air France viennent de leurs sites
        carrière. BNP, SG, SNCF, ENEDIS et les autres passent par France
        Travail, plus un lien direct vers leur site.
      </p>

      <form
        className="mt-6 space-y-3"
        onSubmit={(event) => {
          event.preventDefault();
          void loadOffers();
        }}
      >
        <input
          value={keywords}
          onChange={(event) => setKeywords(event.target.value)}
          placeholder="administrateur systèmes réseaux"
          className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500"
        />
        <div className="flex flex-wrap gap-2">
          {jobProfile.presets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => setKeywords(preset.keywords)}
              className={`rounded-full px-3 py-1 text-sm ${
                keywords === preset.keywords
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-600 ring-1 ring-slate-200"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="France ou une ville"
            className="h-12 flex-1 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="h-12 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "…" : "Actualiser"}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {([1, 3, 7] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setSince(value)}
              className={`rounded-full px-3 py-1 text-sm ${
                since === value
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-600 ring-1 ring-slate-200"
              }`}
            >
              {value === 1 ? "24 h" : `${value} jours`}
            </button>
          ))}
        </div>
      </form>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => void sendTelegram()}
          disabled={sending}
          className="h-11 rounded-xl bg-sky-500 px-4 text-sm font-semibold text-white hover:bg-sky-600 disabled:opacity-60"
        >
          {sending ? "Envoi…" : "Envoyer les nouvelles sur Telegram"}
        </button>
      </div>

      {!telegramReady ? (
        <p className="mt-3 text-xs leading-relaxed text-slate-500">
          Pour recevoir les offres comme un message : ouvre Telegram, cherche{" "}
          <b>@BotFather</b>, crée un bot, copie le token dans{" "}
          <code className="rounded bg-slate-200 px-1">TELEGRAM_BOT_TOKEN</code>.
          Écris ensuite à <b>@userinfobot</b> pour récupérer ton{" "}
          <code className="rounded bg-slate-200 px-1">TELEGRAM_CHAT_ID</code>,
          puis relance le serveur.
        </p>
      ) : (
        <p className="mt-3 text-xs text-emerald-700">Telegram est branché.</p>
      )}

      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
      {notice ? <p className="mt-4 text-sm text-emerald-700">{notice}</p> : null}

      {sources.length ? (
        <p className="mt-6 text-xs text-slate-500">
          {sources
            .map((source) =>
              source.state === "ok"
                ? `${source.label} (${source.count})`
                : `${source.label} indisponible`,
            )
            .join(" · ")}
        </p>
      ) : null}

      <div className="mt-4">
        <p className="text-xs font-medium text-slate-500">Sites carrière</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {TARGET_COMPANIES.map((company) => (
            <a
              key={company.id}
              href={company.careerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-3 py-1 text-xs text-slate-600 ring-1 ring-slate-200 hover:text-blue-700"
            >
              {company.name}
            </a>
          ))}
        </div>
      </div>

      <ul className="mt-4 space-y-3">
        {loading && !offers.length
          ? Array.from({ length: 5 }).map((_, index) => (
              <li key={index} className="h-24 animate-pulse rounded-2xl bg-white" />
            ))
          : null}
        {!loading && !offers.length ? (
          <li className="rounded-2xl bg-white p-6 text-sm text-slate-500">
            Rien de publié sur cette période. Élargis à 7 jours, ou change le métier.
          </li>
        ) : null}
        {offers.map((offer) => (
          <li key={offer.id} className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-blue-700">
              {offer.sourceLabel} · {relativeDate(offer.publishedAt)}
            </p>
            <h2 className="mt-1 text-base font-semibold text-slate-900">
              {offer.title}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {offer.company} · {offer.location}
            </p>
            <a
              href={offer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-medium text-blue-700 hover:underline"
            >
              Ouvrir l’offre
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
