export type LegalBlock = { type: "p"; text: string } | { type: "ul"; items: string[] };

export interface LegalSection {
  heading: string;
  blocks: LegalBlock[];
}

export interface LegalDoc {
  title: string;
  effectiveDateLabel: string;
  effectiveDate: string;
  intro: string;
  sections: LegalSection[];
}

export type Locale = "en" | "es" | "ar";
export type LegalDocByLocale = Record<Locale, LegalDoc>;
