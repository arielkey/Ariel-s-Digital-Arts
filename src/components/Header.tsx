"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import TipJarButton from "./TipJarButton";
import CartButton from "./CartButton";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "./LanguageProvider";

const NAV_LINKS = [
  { href: "/", key: "nav.home" },
  { href: "/shop", key: "nav.shop" },
  { href: "/gallery", key: "nav.gallery" },
  { href: "/about", key: "nav.about" },
  { href: "/about#commissions", key: "nav.commissions" },
  { href: "/contact", key: "nav.contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 border-b border-sage-200/60 bg-cream-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex min-w-0 shrink items-center gap-3"
          onClick={() => setMenuOpen(false)}
        >
          <Logo className="h-10 w-10 shrink-0" />
          <span className="truncate font-display text-lg tracking-wide text-sage-800">
            Ariel&apos;s Digital Arts
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-link"
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <LanguageToggle />
          <ThemeToggle />
          <CartButton />
          <TipJarButton />
          <button
            className="text-sage-800 md:hidden cursor-pointer"
            aria-label={t("common.toggleMenu")}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav className="flex flex-col gap-1 border-t border-sage-200/60 bg-cream-50 px-4 py-3 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-sage-50 hover:text-link"
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
