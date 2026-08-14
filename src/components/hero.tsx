import Image from "next/image";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2400&q=80"
          alt="Infrastructure réseau et baies serveurs"
          fill
          priority
          className="hero-media object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(8,18,30,0.88)_0%,rgba(10,24,36,0.72)_48%,rgba(12,40,46,0.58)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-6 pb-16 pt-28 md:px-10 md:pb-24">
        <p className="animate-rise text-sm font-medium tracking-[0.2em] text-white/70 uppercase">
          {site.subtitle}
        </p>
        <p className="animate-rise-delay-1 mt-4 font-[family-name:var(--font-syne)] text-5xl leading-none font-semibold tracking-tight text-white sm:text-6xl md:text-7xl">
          {site.name}
        </p>
        <h1 className="animate-rise-delay-2 mt-5 max-w-2xl font-[family-name:var(--font-syne)] text-2xl font-medium text-white/95 md:text-3xl">
          {site.role}
        </h1>
        <p className="animate-rise-delay-3 mt-4 max-w-2xl text-base leading-relaxed text-white/78 md:text-lg">
          {site.tagline}
        </p>
        <div className="animate-rise-delay-3 mt-8 flex flex-wrap gap-3">
          <a
            href="#competences"
            className="bg-sea px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-sea-deep"
          >
            Voir mes compétences
          </a>
          <a
            href="#contact"
            className="border border-white/40 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
          >
            Me contacter
          </a>
        </div>
        <p className="mt-8 max-w-2xl text-sm text-white/65">{site.availability}</p>
      </div>
    </section>
  );
}
