import { site } from "@/data/site";

export function Projects() {
  return (
    <section id="projets" className="bg-paper px-6 py-24 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="section-rule mb-8 h-px w-24 bg-sea" />
        <h2 className="font-[family-name:var(--font-syne)] text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          Projets
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">
          Réalisations professionnelles, académiques et personnelles à détailler.
        </p>

        <ul className="mt-14 divide-y divide-line border-y border-line">
          {site.projects.map((project) => {
            const inner = (
              <>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="text-sm tracking-wide text-ink-soft">
                    {project.year}
                  </span>
                  <span className="text-xs font-semibold tracking-wide text-sea uppercase">
                    {project.type}
                  </span>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-syne)] text-2xl font-semibold text-ink transition-colors group-hover:text-sea md:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink-soft">{project.context}</p>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-soft">
                    {project.description}
                  </p>
                  <p className="mt-3 text-sm text-ink/70">
                    {project.stack.join(" · ")}
                  </p>
                </div>
                <span className="text-sm font-medium text-sea transition-transform group-hover:translate-x-1">
                  {project.href ? "Voir →" : ""}
                </span>
              </>
            );

            return (
              <li key={project.title}>
                {project.href ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid gap-3 py-8 md:grid-cols-[9rem_1fr_auto] md:items-start md:gap-8 md:py-10"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="group grid gap-3 py-8 md:grid-cols-[9rem_1fr_auto] md:items-start md:gap-8 md:py-10">
                    {inner}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
