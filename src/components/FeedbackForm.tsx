"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageProvider";

export default function FeedbackForm() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          reason: "Comment / Suggestion / Complaint",
          message,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? t("feedbackForm.error"));
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : t("feedbackForm.error"));
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-sage-200 bg-sage-50 px-6 py-8 text-center">
        <p className="font-display text-lg text-sage-800">{t("feedbackForm.successTitle")}</p>
        <p className="mt-2 text-sm text-foreground/70">{t("feedbackForm.successBody")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-start">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground/80">
          {t("feedbackForm.name")}
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg border border-sage-200 px-3 py-2 text-sm focus:border-sage-500 focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground/80">
          {t("feedbackForm.email")}
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border border-sage-200 px-3 py-2 text-sm focus:border-sage-500 focus:outline-none"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground/80">
        {t("feedbackForm.message")}
        <textarea
          required
          rows={5}
          placeholder={t("feedbackForm.messagePlaceholder")}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="rounded-lg border border-sage-200 px-3 py-2 text-sm focus:border-sage-500 focus:outline-none"
        />
      </label>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="self-start rounded-full bg-sage-600 px-6 py-2.5 text-sm font-medium text-mist-50 transition-colors hover:bg-sage-700 disabled:opacity-60 cursor-pointer"
      >
        {status === "loading" ? t("feedbackForm.sending") : t("feedbackForm.send")}
      </button>
    </form>
  );
}
