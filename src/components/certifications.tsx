import { site } from "@/data/site";

export function Certifications() {
  return (
    <section
      id="certifications"
      className="bg-mist px-6 py-24 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="section-rule mb-8 h-px w-24 bg-sea" />
        <h2 className="font-[family-name:var(--font-syne)] text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          Certifications
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">
          Parcours de certification réseau, cybersécurité et gestion des risques.
        </p>

        <ul className="mt-12 divide-y divide-line border-y border-line">
          {site.certifications.map((cert) => (
            <li
              key={cert.title}
              className="grid gap-2 py-6 sm:grid-cols-[1fr_auto] sm:items-baseline"
            >
              <div>
                <h3 className="font-[family-name:var(--font-syne)] text-xl font-semibold text-ink">
                  {cert.title}
                </h3>
                <p className="mt-1 text-sm text-ink-soft">{cert.issuer}</p>
              </div>
              <span
                className={`text-sm font-medium ${
                  cert.status === "En cours" ? "text-sea" : "text-ink-soft"
                }`}
              >
                {cert.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
