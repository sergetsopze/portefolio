"use client";

import { site } from "@/data/site";
import { useUi } from "@/components/ui-provider";

export function PageHeader() {
  const { t, locale, theme, toggleLocale, toggleTheme } = useUi();

  const nav = [
    { href: "/", label: t.nav.home },
    { href: "/#propos", label: t.nav.about },
    { href: "/#contact", label: t.nav.contact },
    { href: "/opportunites", label: locale === "fr" ? "Opportunités" : "Opportunities" },
  ];

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <a
          href="/"
          className="font-[family-name:var(--font-syne)] text-sm font-semibold tracking-[0.18em] text-ink uppercase"
        >
          {site.name}
        </a>
        <nav className="flex items-center gap-4 text-sm text-ink-soft md:gap-6">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-blue">
              {item.label}
            </a>
          ))}
          <button type="button" onClick={toggleLocale} className="font-semibold">
            {locale === "fr" ? "FR/EN" : "EN/FR"}
          </button>
          <button type="button" onClick={toggleTheme} aria-label="Theme">
            {theme === "dark" ? "☾" : "☀"}
          </button>
        </nav>
      </div>
    </header>
  );
}
