"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { ProjectCategory } from "@/data/site";
import { useUi } from "@/components/ui-provider";

function ProjectGallery({
  title,
  images,
}: {
  title: string;
  images: readonly string[];
}) {
  const [index, setIndex] = useState(0);
  const current = images[index] ?? images[0];

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-ink/10">
      {current ? (
        <Image
          src={current}
          alt={`${title} ${index + 1}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ) : (
        <div className="flex h-full items-center justify-center text-sm text-white/70">
          Screenshots
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
      {images.length > 1 ? (
        <>
          <button
            type="button"
            aria-label="Image précédente"
            onClick={(e) => {
              e.preventDefault();
              setIndex((i) => (i - 1 + images.length) % images.length);
            }}
            className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/45 px-2 py-1 text-white"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Image suivante"
            onClick={(e) => {
              e.preventDefault();
              setIndex((i) => (i + 1) % images.length);
            }}
            className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/45 px-2 py-1 text-white"
          >
            ›
          </button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Image ${i + 1}`}
                onClick={(e) => {
                  e.preventDefault();
                  setIndex(i);
                }}
                className={`h-1.5 w-1.5 rounded-full ${
                  i === index ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

export function Projects() {
  const { t } = useUi();
  const [filter, setFilter] = useState<ProjectCategory>("all");
  const items = t.projects.items;
  const visible = useMemo(
    () =>
      filter === "all" ? items : items.filter((item) => item.category === filter),
    [filter, items],
  );

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

        <ul className="mt-10 grid gap-8 md:grid-cols-2">
          {visible.map((project) => (
            <li key={project.id}>
              <article className="group overflow-hidden border border-line bg-card transition-transform hover:-translate-y-1">
                <ProjectGallery title={project.title} images={project.images} />
                <div className="p-5">
                  <span className="text-xs font-semibold tracking-wide text-blue uppercase">
                    {project.status}
                  </span>
                  <h3 className="mt-2 font-[family-name:var(--font-syne)] text-2xl font-semibold text-ink">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-soft">{project.summary}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {project.description}
                  </p>
                  <p className="mt-4 text-sm">
                    <span className="font-semibold text-ink">Rôle / Role · </span>
                    <span className="text-ink-soft">{project.role}</span>
                  </p>
                  <p className="mt-1 text-sm">
                    <span className="font-semibold text-ink">Résultat / Result · </span>
                    <span className="text-ink-soft">{project.result}</span>
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="border border-line bg-mist px-2 py-1 text-xs text-ink"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
