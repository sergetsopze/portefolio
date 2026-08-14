import { site } from "@/data/site";

export function About() {
  return (
    <section id="profil" className="bg-mist px-6 py-24 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="section-rule mb-8 h-px w-24 bg-sea" />
        <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
          <div>
            <h2 className="font-[family-name:var(--font-syne)] text-4xl font-semibold tracking-tight text-ink md:text-5xl">
              {site.about.title}
            </h2>
            <p className="mt-3 text-sm tracking-wide text-ink-soft uppercase">
              {site.role}
            </p>
          </div>
          <div>
            <p className="max-w-2xl text-lg leading-relaxed text-ink-soft">
              {site.about.text}
            </p>
            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium tracking-wide text-ink uppercase">
              {site.about.highlights.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-sea" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-ink-soft">{site.location}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
