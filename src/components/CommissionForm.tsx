"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageProvider";

const REASONS = [
  { value: "Custom Commission", labelKey: "commissionForm.reasonCustomCommission" },
  { value: "General Inquiry", labelKey: "commissionForm.reasonGeneralInquiry" },
  { value: "Order Question", labelKey: "commissionForm.reasonOrderQuestion" },
  { value: "Other", labelKey: "commissionForm.reasonOther" },
];

export default function CommissionForm() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState(REASONS[0].value);
  const [subject, setSubject] = useState("");
  const [deadline, setDeadline] = useState("");
  const [budget, setBudget] = useState("");
  const [reference, setReference] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const isCommission = reason === "Custom Commission";

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
          reason,
          message,
          ...(isCommission ? { subject, deadline, budget, reference } : {}),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? t("commissionForm.error"));
      setStatus("success");
      setName("");
      setEmail("");
      setSubject("");
      setDeadline("");
      setBudget("");
      setReference("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : t("commissionForm.error"));
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-sage-200 bg-sage-50 px-6 py-8 text-center">
        <p className="font-display text-lg text-sage-800">{t("commissionForm.successTitle")}</p>
        <p className="mt-2 text-sm text-foreground/70">{t("commissionForm.successBody")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground/80">
          {t("commissionForm.name")}
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg border border-sage-200 bg-cream-50 px-3 py-2 text-sm focus:border-sage-500 focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground/80">
          {t("commissionForm.email")}
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border border-sage-200 bg-cream-50 px-3 py-2 text-sm focus:border-sage-500 focus:outline-none"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground/80">
        {t("commissionForm.reason")}
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="rounded-lg border border-sage-200 bg-cream-50 px-3 py-2 text-sm focus:border-sage-500 focus:outline-none"
        >
          {REASONS.map((r) => (
            <option key={r.value} value={r.value}>
              {t(r.labelKey)}
            </option>
          ))}
        </select>
      </label>

      {isCommission ? (
        <div className="grid gap-4 rounded-lg border border-gold-200 bg-gold-50/50 p-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground/80">
            {t("commissionForm.subject")}
            <input
              type="text"
              placeholder={t("commissionForm.subjectPlaceholder")}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="rounded-lg border border-sage-200 bg-cream-50 px-3 py-2 text-sm focus:border-sage-500 focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground/80">
            {t("commissionForm.deadline")}
            <input
              type="text"
              placeholder={t("commissionForm.deadlinePlaceholder")}
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="rounded-lg border border-sage-200 bg-cream-50 px-3 py-2 text-sm focus:border-sage-500 focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground/80">
            {t("commissionForm.budget")}
            <input
              type="text"
              placeholder={t("commissionForm.budgetPlaceholder")}
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="rounded-lg border border-sage-200 bg-cream-50 px-3 py-2 text-sm focus:border-sage-500 focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground/80">
            {t("commissionForm.reference")}
            <input
              type="text"
              placeholder={t("commissionForm.referencePlaceholder")}
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              className="rounded-lg border border-sage-200 bg-cream-50 px-3 py-2 text-sm focus:border-sage-500 focus:outline-none"
            />
          </label>
        </div>
      ) : null}

      <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground/80">
        {t("commissionForm.message")}
        <textarea
          required
          rows={5}
          placeholder={t("commissionForm.messagePlaceholder")}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="rounded-lg border border-sage-200 bg-cream-50 px-3 py-2 text-sm focus:border-sage-500 focus:outline-none"
        />
      </label>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="self-start rounded-full bg-gold-400 px-6 py-2.5 text-sm font-medium text-ink-900 transition-colors hover:bg-gold-300 disabled:opacity-60 cursor-pointer"
      >
        {status === "loading" ? t("commissionForm.sending") : t("commissionForm.send")}
      </button>
    </form>
  );
}
