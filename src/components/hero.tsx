"use client";

import Image from "next/image";
import { site } from "@/data/site";
import { useUi } from "@/components/ui-provider";

const marquee = [
  "Windows",
  "Linux",
  "Active Directory",
  "VLAN",
  "Pare-feu",
  "Wazuh",
  "Nmap",
  "Google Workspace",
  "PowerShell",
  "Python",
  "Bash",
  "Cisco",
  "EBIOS",
  "Support N2/N3",
];

export function Hero() {
  const { t } = useUi();
  const strip = [...marquee, ...marquee];

  return (
    <section id="accueil" className="relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(145deg, var(--hero-from) 0%, var(--hero-via) 48%, var(--hero-to) 100%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(59,130,246,0.28),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-6xl items-center gap-12 px-6 pb-16 pt-28 md:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:pt-24">
        <div>
          <p className="animate-rise inline-flex items-center gap-2 border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-medium tracking-[0.16em] text-white/75 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-soft" aria-hidden />
            {t.available}
          </p>
          <p className="animate-rise-delay-1 mt-6 text-sm font-medium tracking-[0.18em] text-blue-soft uppercase">
            {t.role}
          </p>
          <h1 className="animate-rise-delay-1 mt-3 font-[family-name:var(--font-syne)] text-5xl leading-[0.95] font-semibold tracking-tight text-white sm:text-6xl md:text-7xl">
            {site.name}
          </h1>
          <p className="animate-rise-delay-2 mt-6 max-w-xl text-base leading-relaxed text-white/78 md:text-lg">
            {t.tagline}
          </p>
          <div className="animate-rise-delay-3 mt-8 flex flex-wrap gap-3">
            <a
              href="#projets"
              className="bg-blue px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-deep"
            >
              {t.ctaProjects}
            </a>
            <a
              href="#contact"
              className="border border-white/35 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {t.ctaContact}
            </a>
          </div>
        </div>

        <div className="animate-rise-delay-2 mx-auto w-full max-w-sm">
          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
            <div className="relative aspect-[4/5]">
              <Image
                src={site.portrait}
                alt={site.name}
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 768px) 80vw, 380px"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0b1220] via-[#0b1220]/70 to-transparent p-5">
                <p className="font-[family-name:var(--font-syne)] text-lg font-semibold text-white">
                  {site.name}
                </p>
                <p className="mt-1 text-sm text-blue-soft">{t.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-10 md:px-10">
        <p className="mb-5 text-xs font-semibold tracking-[0.2em] text-white/50 uppercase">
          {t.stackTitle}
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {t.stack.map((layer) => (
            <article
              key={layer.code}
              className="border border-white/15 bg-white/5 p-4 backdrop-blur-sm transition-transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between text-xs tracking-wider text-blue-soft uppercase">
                <span>{layer.label}</span>
                <span>{layer.code}</span>
              </div>
              <p className="mt-3 text-sm text-white/80">{layer.items.join(" · ")}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10 bg-black/20 py-3">
        <div className="overflow-hidden">
          <div className="animate-marquee flex w-max gap-8 whitespace-nowrap px-4 text-xs font-medium tracking-[0.14em] text-white/55 uppercase">
            {strip.map((item, i) => (
              <span key={`${item}-${i}`} className="flex items-center gap-8">
                {item}
                <span className="text-blue-soft" aria-hidden>
                  ·
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
