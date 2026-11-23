"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import TipJarButton from "./TipJarButton";
import CartButton from "./CartButton";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import AccountLink from "./AccountLink";
import ShopMenu, { SHOP_LINKS } from "./ShopMenu";
import { useLanguage } from "./LanguageProvider";

const LINK_CLASS = "text-sm font-medium text-foreground/80 transition-colors hover:text-link";
const DRAWER_LINK_CLASS =
  "rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-sage-50 hover:text-link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-sage-200/60 bg-cream-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex min-w-0 shrink items-center gap-3" onClick={closeMenu}>
          <Logo className="h-10 w-10 shrink-0" />
          <span className="truncate font-display text-lg tracking-wide text-sage-800">
            Ariel&apos;s Digital Arts
          </span>
        </Link>

        <nav className="hidden items-center gap-6 whitespace-nowrap lg:flex">
          <Link href="/crimson-valkyrie" className={LINK_CLASS}>
            {t("nav.crimsonValkyrie")}
          </Link>
          <ShopMenu />
          <Link href="/about" className={LINK_CLASS}>
            {t("nav.about")}
          </Link>
          <Link href="/contact" className={LINK_CLASS}>
            {t("nav.contact")}
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <div className="hidden items-center gap-4 lg:flex">
            <LanguageToggle />
            <ThemeToggle />
            <AccountLink />
            <TipJarButton />
          </div>
          <CartButton />
          <button
            className="text-sage-800 lg:hidden cursor-pointer"
            aria-label={t("common.toggleMenu")}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav className="flex flex-col gap-1 border-t border-sage-200/60 bg-cream-50 px-4 py-3 lg:hidden">
          <Link href="/crimson-valkyrie" onClick={closeMenu} className={DRAWER_LINK_CLASS}>
            {t("nav.crimsonValkyrie")}
          </Link>
          <p className="px-3 pt-2 text-xs font-medium uppercase tracking-wider text-foreground/50">
            {t("nav.shop")}
          </p>
          {SHOP_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={closeMenu} className={`${DRAWER_LINK_CLASS} ps-6`}>
              {t(link.key)}
            </Link>
          ))}
          <Link href="/about" onClick={closeMenu} className={`${DRAWER_LINK_CLASS} mt-1`}>
            {t("nav.about")}
          </Link>
          <Link href="/contact" onClick={closeMenu} className={DRAWER_LINK_CLASS}>
            {t("nav.contact")}
          </Link>
          <div className="mt-2 flex items-center gap-4 border-t border-sage-200/60 px-3 pt-4">
            <LanguageToggle />
            <ThemeToggle />
            <AccountLink />
            <TipJarButton />
          </div>
        </nav>
      ) : null}
    </header>
  );
}
