import { site } from "@/data/site";

export function Education() {
  return (
    <section id="formation" className="bg-paper px-6 py-24 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="section-rule mb-8 h-px w-24 bg-sea" />
        <h2 className="font-[family-name:var(--font-syne)] text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          Formation
        </h2>

        <ul className="mt-12 space-y-10">
          {site.education.map((item) => (
            <li
              key={item.title}
              className="grid gap-3 border-t border-line pt-8 md:grid-cols-[11rem_1fr] md:gap-10"
            >
              <p className="text-sm tracking-wide text-ink-soft">{item.period}</p>
              <div>
                <h3 className="font-[family-name:var(--font-syne)] text-2xl font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-1 text-base text-sea">
                  {item.school} · {item.location}
                </p>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-soft">
                  {item.details}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-14 border-t border-line pt-8">
          <h3 className="font-[family-name:var(--font-syne)] text-xl font-semibold text-ink">
            Langues
          </h3>
          <ul className="mt-4 flex flex-wrap gap-x-10 gap-y-2 text-base text-ink-soft">
            {site.languages.map((lang) => (
              <li key={lang.name}>
                {lang.name}{" "}
                <span className="font-medium text-ink">({lang.level})</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
