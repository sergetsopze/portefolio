"use client";

import { site } from "@/data/site";
import { useUi } from "@/components/ui-provider";

export function About() {
  const { t } = useUi();
  const about = t.about;

  return (
    <section id="propos" className="bg-mist px-6 py-24 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold tracking-[0.2em] text-blue uppercase">
          {about.kicker}
        </p>
        <p className="mt-4 text-sm font-medium tracking-wide text-blue">
          {about.diploma}
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-syne)] text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          {about.headline}
        </h2>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-5 text-lg leading-relaxed text-ink-soft">
            <p>{about.p1}</p>
            <p>{about.p2}</p>
            <p>{about.p3}</p>
          </div>

          <aside className="h-fit border border-line bg-card p-6 md:p-8">
            <p className="text-xs font-semibold tracking-[0.16em] text-blue uppercase">
              {about.factsTitle}
            </p>
            <dl className="mt-6 space-y-5">
              {about.facts.map((fact) => (
                <div key={fact.label} className="border-b border-line pb-4 last:border-0">
                  <dt className="text-xs tracking-wide text-ink-soft uppercase">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 text-base font-medium text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {about.stats.map((stat) => (
            <li key={stat.label} className="border border-line bg-card p-5">
              <p className="font-[family-name:var(--font-syne)] text-3xl font-semibold text-blue">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-ink-soft">{stat.label}</p>
            </li>
          ))}
        </ul>
        <p className="sr-only">{site.name}</p>
      </div>
    </section>
  );
}
