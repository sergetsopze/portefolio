"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { copy, type Locale, type Theme } from "@/data/site";

type UiContextValue = {
  locale: Locale;
  theme: Theme;
  t: (typeof copy)[Locale];
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  toggleTheme: () => void;
};

const UiContext = createContext<UiContextValue | null>(null);

function readStored<T extends string>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  const value = window.localStorage.getItem(key);
  return (value as T) || fallback;
}

export function UiProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");
  const [theme, setTheme] = useState<Theme>("dark");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const nextLocale = readStored<Locale>("portfolio-locale", "fr");
    const nextTheme = readStored<Theme>("portfolio-theme", "dark");
    setLocaleState(nextLocale === "en" ? "en" : "fr");
    setTheme(nextTheme === "light" ? "light" : "dark");
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = locale;
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light", theme === "light");
    window.localStorage.setItem("portfolio-locale", locale);
    window.localStorage.setItem("portfolio-theme", theme);
  }, [locale, theme, ready]);

  const value = useMemo<UiContextValue>(
    () => ({
      locale,
      theme,
      t: copy[locale] ?? copy.fr,
      setLocale: setLocaleState,
      toggleLocale: () => setLocaleState((cur) => (cur === "fr" ? "en" : "fr")),
      toggleTheme: () => setTheme((cur) => (cur === "dark" ? "light" : "dark")),
    }),
    [locale, theme],
  );

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

export function useUi() {
  const ctx = useContext(UiContext);
  if (!ctx) throw new Error("useUi must be used within UiProvider");
  return ctx;
}
