import type { ReactNode } from "react";

export default function OpportunitesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-full bg-slate-100 text-slate-900 antialiased">
      {children}
    </div>
  );
}
