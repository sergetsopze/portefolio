"use client";

import { site } from "@/data/site";
import { useUi } from "@/components/ui-provider";

export function SiteFooter() {
  const { t } = useUi();

  return (
    <footer className="border-t border-white/10 bg-[#070b14] px-6 py-8 text-sm text-white/55 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name} — {t.contact.location}
        </p>
        <p>{t.footer}</p>
      </div>
    </footer>
  );
}
