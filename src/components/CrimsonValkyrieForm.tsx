"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageProvider";

const TYPES = [
  { value: "Full-art card alter", labelKey: "cvForm.typeFullAlter" },
  { value: "Partial card alter", labelKey: "cvForm.typePartialAlter" },
  { value: "Custom token", labelKey: "cvForm.typeCustomToken" },
  { value: "Basic token", labelKey: "cvForm.typeBasicToken" },
  { value: "Original artwork", labelKey: "cvForm.typeOriginal" },
  { value: "Something else", labelKey: "cvForm.typeOther" },
];

const fieldClass =
  "rounded-lg border border-sage-200 bg-cream-50 px-3 py-2 text-sm text-foreground placeholder:text-foreground/40 focus:border-sage-500 focus:outline-none";

export default function CrimsonValkyrieForm() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState(TYPES[0].value);
  const [subject, setSubject] = useState("");
  const [deadline, setDeadline] = useState("");
  const [reference, setReference] = useState("");
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
          reason: `Crimson Valkyrie — ${type}`,
          subject,
          deadline,
          reference,
          message,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? t("cvForm.error"));
      setStatus("success");
      setName("");
      setEmail("");
      setSubject("");
      setDeadline("");
      setReference("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : t("cvForm.error"));
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-bronze-500/40 bg-cream-50 px-6 py-10 text-center">
        <p className="font-display text-xl text-bronze-300">{t("cvForm.successTitle")}</p>
        <p className="mt-2 text-sm text-foreground/70">{t("cvForm.successBody")}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-2xl border border-bronze-500/40 bg-cream-50 p-5 sm:p-7"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label htmlFor="cv-name" className="flex flex-col gap-1.5 text-sm font-medium text-foreground/80">
          {t("cvForm.name")}
          <input id="cv-name" type="text" required value={name} onChange={(e) => setName(e.target.value)} className={fieldClass} />
        </label>
        <label htmlFor="cv-email" className="flex flex-col gap-1.5 text-sm font-medium text-foreground/80">
          {t("cvForm.email")}
          <input id="cv-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={fieldClass} />
        </label>
      </div>

      <label htmlFor="cv-type" className="flex flex-col gap-1.5 text-sm font-medium text-foreground/80">
        {t("cvForm.type")}
        <select id="cv-type" value={type} onChange={(e) => setType(e.target.value)} className={fieldClass}>
          {TYPES.map((o) => (
            <option key={o.value} value={o.value}>
              {t(o.labelKey)}
            </option>
          ))}
        </select>
      </label>

      <label htmlFor="cv-subject" className="flex flex-col gap-1.5 text-sm font-medium text-foreground/80">
        {t("cvForm.subject")}
        <input
          id="cv-subject"
          type="text"
          placeholder={t("cvForm.subjectPlaceholder")}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={fieldClass}
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label htmlFor="cv-deadline" className="flex flex-col gap-1.5 text-sm font-medium text-foreground/80">
          {t("cvForm.deadline")}
          <input
            id="cv-deadline"
            type="text"
            placeholder={t("cvForm.deadlinePlaceholder")}
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className={fieldClass}
          />
        </label>
        <label htmlFor="cv-reference" className="flex flex-col gap-1.5 text-sm font-medium text-foreground/80">
          {t("cvForm.reference")}
          <input
            id="cv-reference"
            type="text"
            placeholder={t("cvForm.referencePlaceholder")}
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            className={fieldClass}
          />
        </label>
      </div>

      <label htmlFor="cv-message" className="flex flex-col gap-1.5 text-sm font-medium text-foreground/80">
        {t("cvForm.message")}
        <textarea
          id="cv-message"
          required
          rows={5}
          placeholder={t("cvForm.messagePlaceholder")}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={fieldClass}
        />
      </label>

      {error ? <p className="text-sm text-red-400">{error}</p> : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="self-start rounded-full bg-crimson-500 px-7 py-2.5 text-sm font-medium text-mist-50 transition-colors hover:bg-crimson-400 disabled:opacity-60 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze-300"
      >
        {status === "loading" ? t("cvForm.sending") : t("cvForm.send")}
      </button>
    </form>
  );
}
