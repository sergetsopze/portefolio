import { Suspense } from "react";
import { CaptureOffer } from "@/components/capture-offer";

export const metadata = {
  title: "Offre enregistrée",
};

export default function CapturerPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-svh items-center justify-center text-sm text-slate-500">
          Enregistrement…
        </div>
      }
    >
      <CaptureOffer />
    </Suspense>
  );
}
