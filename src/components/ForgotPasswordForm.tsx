"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/auth/client";
import { useLanguage } from "./LanguageProvider";

export default function ForgotPasswordForm() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      // Goes straight to the client page (not /auth/callback): Supabase's
      // recovery link carries its tokens in the URL hash fragment, which
      // never reaches a server route — only the browser client's own
      // auto-detection (on this page) can read it.
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (resetError) {
      setStatus("error");
      setError(resetError.message || t("auth.error"));
      return;
    }
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-sage-200 bg-sage-50 px-6 py-8 text-center">
        <p className="text-sm text-foreground/80">{t("auth.resetLinkSent")}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm text-foreground/70">{t("auth.resetPasswordDesc")}</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground/80">
          {t("auth.email")}
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border border-sage-200 bg-cream-50 px-3 py-2 text-sm focus:border-sage-500 focus:outline-none"
          />
        </label>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-full bg-sage-600 px-6 py-2.5 text-sm font-medium text-mist-50 transition-colors hover:bg-sage-700 disabled:opacity-60 cursor-pointer"
        >
          {status === "loading" ? t("auth.sendingResetLink") : t("auth.sendResetLink")}
        </button>
      </form>

      <p className="text-center text-sm text-foreground/60">
        <Link href="/login" className="font-medium text-link underline hover:text-sage-800">
          {t("auth.backToLogIn")}
        </Link>
      </p>
    </div>
  );
}
