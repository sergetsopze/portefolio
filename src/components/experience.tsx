import { site } from "@/data/site";

export function Experience() {
  return (
    <section id="experience" className="bg-mist px-6 py-24 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="section-rule mb-8 h-px w-24 bg-sea" />
        <h2 className="font-[family-name:var(--font-syne)] text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          Expérience
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">
          Missions terrain en administration systèmes & réseaux et automatisation.
        </p>

        <ol className="mt-14 space-y-12">
          {site.experiences.map((exp) => (
            <li key={`${exp.org}-${exp.period}`} className="border-t border-line pt-10">
              <div className="grid gap-4 md:grid-cols-[11rem_1fr] md:gap-10">
                <p className="text-sm tracking-wide text-ink-soft">{exp.period}</p>
                <div>
                  <h3 className="font-[family-name:var(--font-syne)] text-2xl font-semibold text-ink">
                    {exp.title}
                  </h3>
                  <p className="mt-1 text-base text-sea">
                    {exp.org} · {exp.location}
                  </p>
                  <ul className="mt-5 space-y-3">
                    {exp.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-3 text-base leading-relaxed text-ink-soft"
                      >
                        <span
                          className="mt-2.5 h-1 w-1 shrink-0 bg-sea"
                          aria-hidden
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
