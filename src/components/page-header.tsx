import { site } from "@/data/site";

const nav = [
  { href: "/", label: "Portfolio" },
  { href: "/#competences", label: "Compétences" },
  { href: "/#contact", label: "Contact" },
  { href: "/opportunites", label: "Opportunités" },
];

export function PageHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <a
          href="/"
          className="font-[family-name:var(--font-syne)] text-sm font-semibold tracking-[0.18em] text-ink uppercase"
        >
          {site.name}
        </a>
        <nav className="flex items-center gap-5 text-sm text-ink-soft md:gap-8">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative transition-colors hover:text-ink after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-sea after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
