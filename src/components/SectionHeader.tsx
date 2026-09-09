"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";

export default function SectionHeader({
  titleKey,
  linkHref,
  linkKey,
}: {
  titleKey: string;
  linkHref: string;
  linkKey: string;
}) {
  const { t } = useLanguage();

  return (
    <div className="mb-8 flex items-end justify-between">
      <h2 className="font-display text-2xl text-foreground">{t(titleKey)}</h2>
      <Link href={linkHref} className="text-sm font-medium text-link hover:text-sage-800">
        {t(linkKey)}
      </Link>
    </div>
  );
}
