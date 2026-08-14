"use client";

import { useUi } from "@/components/ui-provider";

export function Certifications() {
  const { t } = useUi();
  const certs = t.certs;

  return (
    <section id="certifications" className="bg-mist px-6 py-24 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold tracking-[0.2em] text-blue uppercase">
          {certs.kicker}
        </p>
        <h2 className="mt-4 font-[family-name:var(--font-syne)] text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          {certs.title}
        </h2>

        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {certs.items.map((item, i) => (
            <li
              key={item.title}
              className="group border border-line bg-card p-6 transition-transform hover:-translate-y-1 hover:border-blue/40"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-[family-name:var(--font-syne)] text-3xl font-semibold text-blue/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-xs font-semibold tracking-wide text-blue uppercase">
                  {item.status}
                </span>
              </div>
              <h3 className="mt-4 font-[family-name:var(--font-syne)] text-2xl font-semibold text-ink group-hover:text-blue">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {item.detail}
              </p>
              <p className="mt-4 text-sm text-ink">{item.issuer}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
