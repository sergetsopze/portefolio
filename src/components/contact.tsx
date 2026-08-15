"use client";

import { FormEvent, useState } from "react";
import { site } from "@/data/site";
import { useUi } from "@/components/ui-provider";

export function Contact() {
  const { t } = useUi();
  const [sentHint, setSentHint] = useState(false);
  const c = t.contact;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const subject = encodeURIComponent(`Portfolio — ${name || "Message"}`);
    const body = encodeURIComponent(`Nom : ${name}\nEmail : ${email}\n\n${message}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSentHint(true);
  }

  return (
    <section id="contact" className="bg-[#0b1220] px-6 py-24 text-white md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold tracking-[0.2em] text-blue-soft uppercase">
          {c.kicker}
        </p>
        <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-syne)] text-4xl font-semibold tracking-tight md:text-5xl">
          {c.title}
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-white/75">{c.text}</p>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="text-xs tracking-wide text-white/55 uppercase">
                {c.name}
              </label>
              <input
                id="name"
                name="name"
                required
                className="mt-2 w-full border border-white/20 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-blue-soft"
                placeholder={c.namePh}
              />
            </div>
            <div>
              <label htmlFor="email" className="text-xs tracking-wide text-white/55 uppercase">
                {c.email}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-2 w-full border border-white/20 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-blue-soft"
                placeholder={c.emailPh}
              />
            </div>
            <div>
              <label htmlFor="message" className="text-xs tracking-wide text-white/55 uppercase">
                {c.message}
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="mt-2 w-full resize-y border border-white/20 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-blue-soft"
                placeholder={c.messagePh}
              />
            </div>
            <button
              type="submit"
              className="bg-blue px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-deep"
            >
              {c.send}
            </button>
            {sentHint ? <p className="text-sm text-white/65">{c.sent}</p> : null}
          </form>

          <div className="space-y-7">
            <div>
              <p className="text-xs tracking-[0.16em] text-white/50 uppercase">{c.mail}</p>
              <a
                href={`mailto:${site.email}`}
                className="mt-2 inline-block text-xl underline decoration-blue-soft decoration-2 underline-offset-8"
              >
                {site.email}
              </a>
            </div>
            <div>
              <p className="text-xs tracking-[0.16em] text-white/50 uppercase">{c.phone}</p>
              <a href={`tel:${site.phoneHref}`} className="mt-2 inline-block text-xl">
                {site.phone}
              </a>
            </div>
            <div>
              <p className="text-xs tracking-[0.16em] text-white/50 uppercase">
                {c.locationLabel}
              </p>
              <p className="mt-2 text-xl">{c.location}</p>
            </div>
            <div>
              <p className="text-xs tracking-[0.16em] text-white/50 uppercase">
                {c.document}
              </p>
              <a
                href={site.cv}
                download
                className="mt-2 inline-block text-xl underline decoration-blue-soft decoration-2 underline-offset-8"
              >
                {c.cv}
              </a>
            </div>
            <div className="flex flex-wrap gap-6 text-sm font-medium tracking-wide uppercase">
              <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href={site.links.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
