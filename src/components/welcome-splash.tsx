"use client";

import { useEffect, useState } from "react";
import { useUi } from "@/components/ui-provider";

export function WelcomeSplash() {
  const { t } = useUi();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const seen = sessionStorage.getItem("portfolio-welcome");
    if (seen) {
      setVisible(false);
      return;
    }
    const timer = window.setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("portfolio-welcome", "1");
    }, 1600);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => {
        setVisible(false);
        sessionStorage.setItem("portfolio-welcome", "1");
      }}
      className="fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center bg-[#0b1220] text-white"
    >
      <p className="animate-rise text-xs tracking-[0.35em] text-blue-soft uppercase">
        Portfolio
      </p>
      <p className="animate-rise-delay-1 mt-4 font-[family-name:var(--font-syne)] text-3xl md:text-5xl">
        {t.welcome}
      </p>
      <p className="animate-rise-delay-2 mt-6 text-sm text-white/55">{t.enter}</p>
    </button>
  );
}
