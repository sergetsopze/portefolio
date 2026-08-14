"use client";

import { useEffect, useRef, useState } from "react";
import { useUi } from "@/components/ui-provider";

function SkillBars({
  bars,
}: {
  bars: readonly { label: string; value: number }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setShow(true);
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="mt-14 space-y-5">
      {bars.map((bar) => (
        <div key={bar.label}>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-ink">{bar.label}</span>
            <span className="text-blue">{bar.value}%</span>
          </div>
          <div className="h-1.5 overflow-hidden bg-line">
            <div
              className={`h-full bg-blue ${show ? "bar-fill" : "scale-x-0"}`}
              style={{ width: `${bar.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

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

        <SkillBars bars={skills.bars} />
      </div>
    </section>
  );
}
