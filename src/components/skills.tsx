"use client";

import { useUi } from "@/components/ui-provider";

export function Skills() {
  const { t } = useUi();
  const skills = t.skills;

  return (
    <section id="competences" className="bg-paper px-6 py-24 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold tracking-[0.2em] text-blue uppercase">
          {skills.kicker}
        </p>
        <h2 className="mt-4 font-[family-name:var(--font-syne)] text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          {skills.title}
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">{skills.intro}</p>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {skills.layers.map((layer) => (
            <article
              key={layer.title}
              className="border border-line bg-card p-5 transition-transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-[family-name:var(--font-syne)] text-xl font-semibold text-ink">
                  {layer.title}
                </h3>
                <span className="text-xs tracking-[0.16em] text-blue uppercase">
                  {layer.code}
                </span>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {layer.items.map((item) => (
                  <li
                    key={item.name}
                    className={`px-3 py-1.5 text-sm transition-colors ${
                      item.highlight
                        ? "bg-blue text-white"
                        : "border border-line bg-mist text-ink-soft"
                    }`}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
