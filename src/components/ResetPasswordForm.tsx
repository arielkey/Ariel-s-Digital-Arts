"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/auth/client";
import { useLanguage } from "./LanguageProvider";

export default function ResetPasswordForm() {
  const { t } = useLanguage();
  const router = useRouter();
  const [hasSession, setHasSession] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const supabase = createClient();

    // The recovery link puts its tokens in the URL hash fragment (never
    // sent to the server), and @supabase/ssr's cookie-based browser
    // client doesn't auto-detect it like the plain client does — so pull
    // it out and establish the session ourselves.
    const hashParams = new URLSearchParams(window.location.hash.slice(1));
    const accessToken = hashParams.get("access_token");
    const refreshToken = hashParams.get("refresh_token");

    if (accessToken && refreshToken) {
      supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken }).then(({ error }) => {
        window.history.replaceState(null, "", window.location.pathname);
        setHasSession(!error);
      });
    } else {
      supabase.auth.getSession().then(({ data }) => setHasSession(!!data.session));
    }
  }, []);

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
    const { error: updateError } = await supabase.auth.updateUser({ password });
    if (updateError) {
      setStatus("error");
      setError(updateError.message || t("auth.error"));
      return;
    }
    setStatus("success");
  }

  if (hasSession === false) {
    return (
      <div className="rounded-2xl border border-sage-200 bg-sage-50 px-6 py-8 text-center">
        <p className="text-sm text-foreground/80">{t("auth.resetLinkExpired")}</p>
        <Link
          href="/forgot-password"
          className="mt-4 inline-block rounded-full bg-sage-600 px-6 py-2.5 text-sm font-medium text-mist-50 transition-colors hover:bg-sage-700"
        >
          {t("auth.resetPassword")}
        </Link>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-sage-200 bg-sage-50 px-6 py-8 text-center">
        <p className="text-sm text-foreground/80">{t("auth.passwordUpdated")}</p>
        <button
          onClick={() => router.push("/login")}
          className="mt-4 rounded-full bg-sage-600 px-6 py-2.5 text-sm font-medium text-mist-50 transition-colors hover:bg-sage-700 cursor-pointer"
        >
          {t("auth.backToLogIn")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground/80">
        {t("auth.newPassword")}
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
        {t("auth.confirmNewPassword")}
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
        {status === "loading" ? t("auth.updatingPassword") : t("auth.updatePassword")}
      </button>
    </form>
  );
}
