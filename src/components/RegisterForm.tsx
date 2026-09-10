"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/auth/client";
import { useLanguage } from "./LanguageProvider";
import GoogleIcon from "./GoogleIcon";

export default function RegisterForm() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setStatus("error");
      setError(t("auth.passwordsDontMatch"));
      return;
    }
    setStatus("loading");
    setError("");
    const supabase = createClient();
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    if (signUpError) {
      setStatus("error");
      setError(signUpError.message || t("auth.error"));
      return;
    }
    setStatus("success");
  }

  async function handleGoogle() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-sage-200 bg-sage-50 px-6 py-8 text-center">
        <p className="text-sm text-foreground/80">{t("auth.checkEmailToConfirm")}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <button
        onClick={handleGoogle}
        type="button"
        className="inline-flex items-center justify-center gap-2 rounded-full border border-sage-200 bg-cream-50 px-4 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-sage-50 cursor-pointer"
      >
        <GoogleIcon />
        {t("auth.continueWithGoogle")}
      </button>

      <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-foreground/50">
        <div className="h-px flex-1 bg-sage-200" />
        {t("auth.orContinueWith")}
        <div className="h-px flex-1 bg-sage-200" />
      </div>

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
        <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground/80">
          {t("auth.password")}
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg border border-sage-200 bg-cream-50 px-3 py-2 text-sm focus:border-sage-500 focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground/80">
          {t("auth.confirmPassword")}
          <input
            type="password"
            required
            minLength={6}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="rounded-lg border border-sage-200 bg-cream-50 px-3 py-2 text-sm focus:border-sage-500 focus:outline-none"
          />
        </label>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-full bg-sage-600 px-6 py-2.5 text-sm font-medium text-mist-50 transition-colors hover:bg-sage-700 disabled:opacity-60 cursor-pointer"
        >
          {status === "loading" ? t("auth.signingUp") : t("auth.signUp")}
        </button>
      </form>

      <p className="text-center text-sm text-foreground/60">
        {t("auth.haveAccount")}{" "}
        <Link href="/login" className="font-medium text-link underline hover:text-sage-800">
          {t("auth.logIn")}
        </Link>
      </p>
    </div>
  );
}
