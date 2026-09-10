"use client";

import { Mail } from "lucide-react";
import { InstagramIcon, TikTokIcon, PinterestIcon, FacebookIcon } from "./SocialIcons";
import FeedbackForm from "./FeedbackForm";
import { useLanguage } from "./LanguageProvider";

export default function ContactPageContent() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
      <h1 className="font-display text-3xl text-foreground">{t("contact.title")}</h1>
      <p className="mt-3 text-foreground/70">{t("contact.description")}</p>

      <a
        href="mailto:executiveorganizeak@gmail.com"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-sage-600 px-6 py-3 text-sm font-medium text-mist-50 transition-colors hover:bg-sage-700"
      >
        <Mail className="h-4 w-4" />
        executiveorganizeak@gmail.com
      </a>

      <div className="mt-8 flex items-center justify-center gap-6">
        <a
          href="https://instagram.com/arielsdigitalarts"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-link transition-colors hover:text-sage-800"
        >
          <InstagramIcon className="h-7 w-7" />
        </a>
        <a
          href="https://tiktok.com/@arielsdigitalarts"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TikTok"
          className="text-link transition-colors hover:text-sage-800"
        >
          <TikTokIcon className="h-7 w-7" />
        </a>
        <a
          href="https://pinterest.com/arielsdigitalarts"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Pinterest"
          className="text-link transition-colors hover:text-sage-800"
        >
          <PinterestIcon className="h-7 w-7" />
        </a>
        <a
          href="https://facebook.com/arielsdigitalarts"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="text-link transition-colors hover:text-sage-800"
        >
          <FacebookIcon className="h-7 w-7" />
        </a>
      </div>

      <p className="mt-10 text-sm text-foreground/60">
        {t("contact.commissionsPointerPre")}{" "}
        <a href="/about#commissions" className="font-medium text-link underline hover:text-sage-800">
          {t("nav.commissions")}
        </a>{" "}
        {t("contact.commissionsPointerPost")}
      </p>

      <div className="mt-16 rounded-2xl border border-sage-200 bg-cream-50 p-6 text-start sm:p-8">
        <h2 className="font-display text-xl text-foreground">{t("contact.feedbackHeading")}</h2>
        <p className="mt-2 text-sm text-foreground/70">{t("contact.feedbackDesc")}</p>
        <div className="mt-6">
          <FeedbackForm />
        </div>
      </div>
    </section>
  );
}
