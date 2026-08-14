"use client";

import { useUi } from "@/components/ui-provider";

export function Experience() {
  const { t } = useUi();
  const exp = t.experience;

  return (
    <section id="experience" className="bg-paper px-6 py-24 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold tracking-[0.2em] text-blue uppercase">
          {exp.kicker}
        </p>
        <h2 className="mt-4 font-[family-name:var(--font-syne)] text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          {exp.title}
        </h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          <div>
            <h3 className="font-[family-name:var(--font-syne)] text-xl font-semibold text-ink">
              {exp.educationTitle}
            </h3>
            <ol className="mt-6 space-y-8">
              {exp.education.map((item) => (
                <li key={item.title} className="border-l-2 border-blue/40 pl-5">
                  <p className="text-sm text-blue">{item.period}</p>
                  <p className="mt-1 font-[family-name:var(--font-syne)] text-lg font-semibold text-ink">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">{item.school}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {item.details}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-line bg-mist px-2 py-1 text-xs text-ink"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="font-[family-name:var(--font-syne)] text-xl font-semibold text-ink">
              {exp.jobsTitle}
            </h3>
            <ol className="mt-6 space-y-8">
              {exp.jobs.map((job) => (
                <li
                  key={job.title}
                  className="border border-line bg-card p-5 transition-transform hover:-translate-y-0.5"
                >
                  <p className="text-sm text-blue">
                    {job.kind} · {job.period}
                  </p>
                  <p className="mt-1 font-[family-name:var(--font-syne)] text-lg font-semibold text-ink">
                    {job.title}
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">{job.org}</p>
                  <ul className="mt-4 space-y-2">
                    {job.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-2 text-sm leading-relaxed text-ink-soft"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 bg-blue" aria-hidden />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-blue/25 bg-blue/10 px-2 py-1 text-xs text-blue"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
