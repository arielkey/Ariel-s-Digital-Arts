"use client";

import { useLanguage } from "./LanguageProvider";

export default function AuthPageShell({
  titleKey,
  children,
}: {
  titleKey: string;
  children: React.ReactNode;
}) {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-md px-4 py-20 sm:px-6">
      <h1 className="mb-8 text-center font-display text-3xl text-foreground">{t(titleKey)}</h1>
      {children}
    </section>
  );
}
