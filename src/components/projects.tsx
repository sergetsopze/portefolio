"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { ProjectCategory } from "@/data/site";
import { useUi } from "@/components/ui-provider";

type ProjectItem = ReturnType<typeof useUi>["t"]["projects"]["items"][number];

function Gallery({
  title,
  images,
  compact = false,
}: {
  title: string;
  images: readonly string[];
  compact?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const current = images[index] ?? images[0];

  return (
    <div
      className={`relative overflow-hidden bg-ink/10 ${
        compact ? "aspect-[16/9]" : "aspect-[16/9] md:aspect-[16/8]"
      }`}
    >
      {current ? (
        <Image
          src={current}
          alt={`${title} ${index + 1}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          sizes={compact ? "(max-width: 768px) 100vw, 33vw" : "90vw"}
        />
      ) : (
        <div className="flex h-full items-center justify-center text-sm text-white/70">
          Screenshots
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      {!compact && images.length > 1 ? (
        <>
          <button
            type="button"
            aria-label="Image précédente"
            onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
            className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/45 px-2 py-1 text-white"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Image suivante"
            onClick={() => setIndex((i) => (i + 1) % images.length)}
            className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/45 px-2 py-1 text-white"
          >
            ›
          </button>
        </>
      ) : null}
    </div>
  );
}

export function Projects() {
  const { t } = useUi();
  const [filter, setFilter] = useState<ProjectCategory>("all");
  const [activeId, setActiveId] = useState<string | null>(null);
  const items = t.projects.items;
  const visible = useMemo(
    () =>
      filter === "all" ? items : items.filter((item) => item.category === filter),
    [filter, items],
  );
  const active = items.find((item) => item.id === activeId) as ProjectItem | undefined;

  useEffect(() => {
    if (!activeId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeId]);

  useEffect(() => {
    setActiveId(null);
  }, [filter]);

  return (
    <section id="projets" className="bg-mist px-6 py-24 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold tracking-[0.2em] text-blue uppercase">
          {t.projects.kicker}
        </p>
        <h2 className="mt-4 font-[family-name:var(--font-syne)] text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          {t.projects.title}
        </h2>
        <p className="mt-3 max-w-2xl text-ink-soft">{t.projects.hint}</p>

        <div className="mt-8 flex flex-wrap gap-2">
          {t.projects.filters.map((chip) => (
            <button
              key={chip.id}
              type="button"
              onClick={() => setFilter(chip.id as ProjectCategory)}
              className={`px-4 py-2 text-sm transition-colors ${
                filter === chip.id
                  ? "bg-blue text-white"
                  : "border border-line bg-card text-ink-soft hover:text-blue"
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((project) => (
            <li key={project.id}>
              <button
                type="button"
                onClick={() => setActiveId(project.id)}
                className="group flex h-full w-full flex-col overflow-hidden border border-line bg-card text-left transition-all hover:-translate-y-1 hover:border-blue/50 hover:shadow-[0_12px_30px_rgba(15,23,42,0.12)]"
              >
                <Gallery title={project.title} images={project.images} compact />
                <div className="flex flex-1 flex-col p-4">
                  <span className="text-[11px] font-semibold tracking-wide text-blue uppercase">
                    {project.status}
                  </span>
                  <h3 className="mt-1.5 font-[family-name:var(--font-syne)] text-lg font-semibold leading-snug text-ink group-hover:text-blue">
                    {project.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-ink-soft">
                    {project.summary}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="border border-line bg-mist px-2 py-0.5 text-[11px] text-ink"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span className="mt-4 text-sm font-medium text-blue">
                    {t.projects.openDetail} →
                  </span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {active ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-6"
          onClick={() => setActiveId(null)}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            className="max-h-[92vh] w-full max-w-3xl overflow-y-auto bg-card text-ink shadow-2xl sm:rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <Gallery title={active.title} images={active.images} />
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-wide text-blue uppercase">
                    {active.status}
                  </p>
                  <h3
                    id="project-dialog-title"
                    className="mt-2 font-[family-name:var(--font-syne)] text-2xl font-semibold md:text-3xl"
                  >
                    {active.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveId(null)}
                  className="shrink-0 border border-line px-3 py-1.5 text-xs font-semibold uppercase hover:border-blue hover:text-blue"
                >
                  {t.projects.closeLabel}
                </button>
              </div>
              <p className="mt-4 text-base leading-relaxed text-ink-soft">
                {active.description}
              </p>
              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-xs tracking-wide text-ink-soft uppercase">
                    {t.projects.roleLabel}
                  </dt>
                  <dd className="mt-1 text-sm text-ink">{active.role}</dd>
                </div>
                <div>
                  <dt className="text-xs tracking-wide text-ink-soft uppercase">
                    {t.projects.resultLabel}
                  </dt>
                  <dd className="mt-1 text-sm text-ink">{active.result}</dd>
                </div>
              </dl>
              {"steps" in active && active.steps ? (
                <ol className="mt-6 space-y-2">
                  <li className="text-xs font-semibold tracking-wide text-ink-soft uppercase">
                    {t.projects.stepsLabel}
                  </li>
                  {active.steps.map((step, i) => (
                    <li key={step} className="flex gap-3 text-sm text-ink-soft">
                      <span className="font-semibold text-blue">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              ) : null}
              <div className="mt-6 flex flex-wrap gap-2">
                {active.stack.map((tech) => (
                  <span
                    key={tech}
                    className="border border-line bg-mist px-2 py-1 text-xs text-ink"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
