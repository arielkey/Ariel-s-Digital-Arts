"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export const SHOP_LINKS = [
  { href: "/shop", key: "nav.shopMerch" },
  { href: "/gallery", key: "nav.shopArt" },
  { href: "/books", key: "nav.shopBooks" },
];

export default function ShopMenu() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      className="relative"
      ref={containerRef}
      onBlur={(e) => {
        if (!containerRef.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="shop-menu-panel"
        onClick={() => setOpen((v) => !v)}
        className="flex cursor-pointer items-center gap-1 text-sm font-medium text-foreground/80 transition-colors hover:text-link"
      >
        {t("nav.shop")}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open ? (
        <div
          id="shop-menu-panel"
          className="absolute start-0 top-full z-50 mt-3 w-52 overflow-hidden rounded-xl border border-sage-200 bg-cream-50 py-1 shadow-lg"
        >
          {SHOP_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-foreground/80 transition-colors hover:bg-sage-50 hover:text-link"
            >
              {t(link.key)}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
