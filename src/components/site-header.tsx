"use client";

import { useEffect, useState } from "react";
import { navItems, site } from "@/data/site";
import { useUi } from "@/components/ui-provider";

export function SiteHeader() {
  const { t, locale, theme, toggleLocale, toggleTheme } = useUi();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#accueil");

  useEffect(() => {
    const ids = navItems.map((item) => item.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0.1, 0.25, 0.5] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[92px] flex-col border-r border-line bg-paper/90 backdrop-blur xl:flex">
        <a
          href="#accueil"
          className="flex h-20 items-center justify-center font-[family-name:var(--font-syne)] text-lg font-semibold text-blue"
        >
          {site.initials}
        </a>
        <nav className="flex flex-1 flex-col items-center gap-1 px-2 py-4">
          {navItems.map((item) => {
            const label = t.nav[item.key];
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                title={label}
                className={`flex w-full flex-col items-center rounded-md px-1 py-2 text-center transition-colors ${
                  isActive ? "bg-blue/10 text-blue" : "text-ink-soft hover:text-blue"
                }`}
              >
                <span className="text-[10px] font-semibold tracking-wider">
                  {item.num}
                </span>
                <span className="mt-0.5 text-[10px] leading-tight">{label}</span>
              </a>
            );
          })}
        </nav>
        <div className="flex flex-col items-center gap-3 border-t border-line py-4">
          <button
            type="button"
            onClick={toggleLocale}
            className="text-xs font-semibold tracking-wide text-ink-soft hover:text-blue"
            aria-label="Changer la langue"
          >
            {locale === "fr" ? "FR" : "EN"}
            <span className="text-ink-soft/50">/{locale === "fr" ? "EN" : "FR"}</span>
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="text-xs font-semibold text-ink-soft hover:text-blue"
            aria-label="Changer le thème"
          >
            {theme === "dark" ? "☾" : "☀"}
          </button>
        </div>
      </aside>

      <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-paper/90 backdrop-blur xl:hidden">
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <a
            href="#accueil"
            className="font-[family-name:var(--font-syne)] text-sm font-semibold tracking-[0.12em] text-ink uppercase"
          >
            {site.name}
          </a>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLocale}
              className="px-2 py-1 text-xs font-semibold text-ink-soft"
            >
              {locale === "fr" ? "FR/EN" : "EN/FR"}
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className="px-2 py-1 text-sm text-ink-soft"
              aria-label="Changer le thème"
            >
              {theme === "dark" ? "☾" : "☀"}
            </button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="border border-line px-3 py-1.5 text-xs font-semibold uppercase"
            >
              {open ? "×" : "Menu"}
            </button>
          </div>
        </div>
        {open ? (
          <nav className="border-t border-line bg-paper px-4 py-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 py-2.5 text-ink"
              >
                <span className="text-xs font-semibold text-blue">{item.num}</span>
                <span>{t.nav[item.key]}</span>
              </a>
            ))}
          </nav>
        ) : null}
      </header>
    </>
  );
}
