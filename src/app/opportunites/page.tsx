import { Suspense } from "react";
import { JobsBoard } from "@/components/jobs-board";

export const metadata = {
  title: "Alternance M2 — administrateur systèmes & réseaux",
  description:
    "Nouvelles offres d’alternance systèmes, réseaux, RSSI et support N2/N3.",
};

export default function OpportunitesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-svh items-center justify-center text-sm text-slate-500">
          Ouverture de la veille…
        </div>
      }
    >
      <JobsBoard />
    </Suspense>
  );
}
