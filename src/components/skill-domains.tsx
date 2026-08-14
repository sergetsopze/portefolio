import { site } from "@/data/site";

export function SkillDomains() {
  return (
    <section id="competences" className="bg-paper px-6 py-24 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="section-rule mb-8 h-px w-24 bg-sea" />
        <h2 className="font-[family-name:var(--font-syne)] text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          Blocs de compétences
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">
          Compétences organisées par domaines d’expertise — administration,
          cloud, support, développement et supervision.
        </p>

        <div className="mt-14 grid gap-0 border-t border-line md:grid-cols-2">
          {site.skillDomains.map((domain) => (
            <article
              key={domain.id}
              id={domain.id}
              className="border-b border-line px-0 py-10 md:px-8 md:odd:border-r md:odd:pl-0 md:even:pr-0"
            >
              <h3 className="font-[family-name:var(--font-syne)] text-2xl font-semibold text-ink">
                {domain.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">
                {domain.summary}
              </p>
              <ul className="mt-6 space-y-2.5">
                {domain.skills.map((skill) => (
                  <li
                    key={skill}
                    className="flex gap-3 text-sm leading-snug text-ink"
                  >
                    <span
                      className="mt-2 h-1 w-1 shrink-0 bg-sea"
                      aria-hidden
                    />
                    <span>{skill}</span>
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
