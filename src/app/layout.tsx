import type { Metadata } from "next";
import { Figtree, Syne } from "next/font/google";
import { UiProvider } from "@/components/ui-provider";
import { site } from "@/data/site";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${site.name} — Administrateur Systèmes, Réseaux & Sécurité`,
  description:
    "Portfolio de Serge TSOPZE, administrateur systèmes, réseaux et sécurité. Alternance M2 dès septembre 2026.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${syne.variable} ${figtree.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("portfolio-theme");document.documentElement.classList.toggle("dark",t!=="light");document.documentElement.classList.toggle("light",t==="light");}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <UiProvider>{children}</UiProvider>
      </body>
    </html>
  );
}
