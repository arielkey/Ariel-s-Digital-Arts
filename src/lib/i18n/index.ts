import en, { type Dictionary } from "./en";
import es from "./es";
import ar from "./ar";

export type Locale = "en" | "es" | "ar";

export const LOCALES: { code: Locale; label: string; dir: "ltr" | "rtl" }[] = [
  { code: "en", label: "English", dir: "ltr" },
  { code: "es", label: "Español", dir: "ltr" },
  { code: "ar", label: "العربية", dir: "rtl" },
];

export const translations: Record<Locale, Dictionary> = { en, es, ar };

export type { Dictionary };
