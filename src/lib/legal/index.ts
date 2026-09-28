import termsOfUse from "./terms-of-use";
import privacyPolicy from "./privacy-policy";
import termsOfSale from "./terms-of-sale";
import shippingPolicy from "./shipping-policy";
import type { LegalDocByLocale, Locale } from "./types";

export interface LegalPageMeta {
  slug: string;
  href: string;
  doc: LegalDocByLocale;
}

export const legalPages: LegalPageMeta[] = [
  { slug: "terms", href: "/terms", doc: termsOfUse },
  { slug: "privacy", href: "/privacy", doc: privacyPolicy },
  { slug: "terms-of-sale", href: "/terms-of-sale", doc: termsOfSale },
  { slug: "shipping", href: "/shipping", doc: shippingPolicy },
];

export function legalTitle(doc: LegalDocByLocale, locale: Locale): string {
  return doc[locale]?.title ?? doc.en.title;
}

export { termsOfUse, privacyPolicy, termsOfSale, shippingPolicy };
export type { LegalDocByLocale, Locale, LegalDoc, LegalSection, LegalBlock } from "./types";
