import { site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-ink px-6 py-8 text-sm text-white/55 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name} · {site.role}
        </p>
        <div className="flex flex-wrap gap-5">
          <a href="/opportunites" className="hover:text-white/80">
            Opportunités
          </a>
          <a href="#formation" className="hover:text-white/80">
            Formation
          </a>
          <span>Next.js · Vercel</span>
        </div>
      </div>
    </footer>
  );
}
