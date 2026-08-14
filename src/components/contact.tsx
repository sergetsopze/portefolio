import { site } from "@/data/site";

export function Contact() {
  return (
    <section id="contact" className="bg-ink px-6 py-24 text-white md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="section-rule mb-8 h-px w-24 bg-sea" />
        <h2 className="font-[family-name:var(--font-syne)] text-4xl font-semibold tracking-tight md:text-5xl">
          {site.contact.title}
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-white/75">{site.contact.text}</p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-xs tracking-[0.16em] text-white/50 uppercase">
              Email
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-2 inline-block font-[family-name:var(--font-syne)] text-xl font-medium underline decoration-sea decoration-2 underline-offset-8 transition-colors hover:text-white/85"
            >
              {site.email}
            </a>
          </div>
          <div>
            <p className="text-xs tracking-[0.16em] text-white/50 uppercase">
              Téléphone
            </p>
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="mt-2 inline-block text-xl text-white/90"
            >
              {site.phone}
            </a>
          </div>
          <div>
            <p className="text-xs tracking-[0.16em] text-white/50 uppercase">
              Localisation
            </p>
            <p className="mt-2 text-xl text-white/90">{site.location}</p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-6 text-sm font-medium tracking-wide uppercase">
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/75 transition-colors hover:text-white"
          >
            LinkedIn
          </a>
          <a
            href={site.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/75 transition-colors hover:text-white"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
