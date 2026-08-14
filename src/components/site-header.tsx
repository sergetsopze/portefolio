import { site } from "@/data/site";

const nav = [
  { href: "#profil", label: "Profil" },
  { href: "#competences", label: "Compétences" },
  { href: "#experience", label: "Expérience" },
  { href: "#projets", label: "Projets" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5 md:px-10">
        <a
          href="#top"
          className="shrink-0 font-[family-name:var(--font-syne)] text-sm font-semibold tracking-[0.16em] text-white uppercase"
        >
          {site.name}
        </a>
        <nav className="hidden items-center gap-5 text-sm text-white/85 lg:flex lg:gap-6">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative transition-colors hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="border border-white/35 px-3 py-2 text-xs font-semibold tracking-wide text-white uppercase transition-colors hover:border-white hover:bg-white/10 lg:hidden"
        >
          Contact
        </a>
      </div>
    </header>
  );
}
