"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { addManualOffer, readInbox } from "@/lib/jobs/storage";

export function CaptureOffer() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"saving" | "ok" | "error">("saving");
  const [title, setTitle] = useState("");

  useEffect(() => {
    const url = searchParams.get("url")?.trim() || "";
    const jobTitle = searchParams.get("title")?.trim() || "";
    if (!url) {
      setStatus("error");
      return;
    }

    const already = readInbox().some((job) => job.url === url);
    if (!already) {
      addManualOffer({
        title: jobTitle || "Offre enregistrée",
        company: searchParams.get("company")?.trim() || "",
        location: searchParams.get("location")?.trim() || "",
        url,
        contract: searchParams.get("contract")?.trim() || "",
      });
    }
    setTitle(jobTitle || "Offre");
    setStatus("ok");
  }, [searchParams]);

  return (
    <div className="mx-auto flex min-h-svh max-w-md flex-col justify-center px-6 text-center">
      {status === "saving" ? (
        <p className="text-sm text-slate-500">Enregistrement…</p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm text-red-600">
          Ouvre une offre, puis reclique sur le raccourci.
        </p>
      ) : null}
      {status === "ok" ? (
        <>
          <p className="text-xs font-semibold tracking-wide text-blue-700 uppercase">
            Enregistrée
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">{title}</h1>
          <p className="mt-2 text-sm text-slate-500">
            Elle est dans Sauvegardées, dans l’appli Veille.
          </p>
          <a
            href="/opportunites"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Retour à la veille
          </a>
        </>
      ) : null}
    </div>
  );
}
