import { About } from "@/components/about";
import { Certifications } from "@/components/certifications";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Skills } from "@/components/skills";
import { WelcomeSplash } from "@/components/welcome-splash";

export default function Home() {
  return (
    <>
      <WelcomeSplash />
      <SiteHeader />
      <main className="xl:pl-[92px]">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
      </main>
      <div className="xl:pl-[92px]">
        <SiteFooter />
      </div>
    </>
  );
}
