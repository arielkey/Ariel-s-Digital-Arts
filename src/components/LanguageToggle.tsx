"use client";

import { useEffect, useRef, useState } from "react";
import { Globe } from "lucide-react";
import { LOCALES } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";

export default function LanguageToggle() {
  const { locale, setLocale, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={t("languageToggle.label")}
        className="text-sage-800 cursor-pointer"
      >
        <Globe className="h-5 w-5" />
      </button>

      {open ? (
        <div className="absolute start-0 top-full z-50 mt-2 w-36 overflow-hidden rounded-xl border border-sage-200 bg-cream-50 py-1 shadow-lg md:start-auto md:end-0">
          {LOCALES.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLocale(l.code);
                setOpen(false);
              }}
              className={`block w-full px-4 py-2 text-start text-sm transition-colors cursor-pointer ${
                locale === l.code
                  ? "bg-sage-100 font-medium text-sage-800"
                  : "text-foreground/80 hover:bg-sage-50"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
