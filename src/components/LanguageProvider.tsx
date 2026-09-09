"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { LOCALES, translations, type Locale } from "@/lib/i18n";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dir: "ltr" | "rtl";
  t: (path: string, vars?: Record<string, string | number>) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "language";

function getByPath(obj: unknown, path: string): unknown {
  return path
    .split(".")
    .reduce<unknown>(
      (acc, key) => (acc && typeof acc === "object" ? (acc as Record<string, unknown>)[key] : undefined),
      obj
    );
}

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    // One-time hydration from localStorage: the server always renders "en"
    // (it has no access to the visitor's stored preference), so the first
    // client render must match that before this effect can correct it.
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "es" || stored === "ar") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocaleState(stored);
    }
  }, []);

  const dir = LOCALES.find((l) => l.code === locale)?.dir ?? "ltr";

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const t = useCallback(
    (path: string, vars?: Record<string, string | number>) => {
      const value = getByPath(translations[locale], path) ?? getByPath(translations.en, path);
      let str = typeof value === "string" ? value : path;
      if (vars) {
        for (const [key, v] of Object.entries(vars)) {
          str = str.replace(`{${key}}`, String(v));
        }
      }
      return str;
    },
    [locale]
  );

  return <LanguageContext.Provider value={{ locale, setLocale, dir, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
