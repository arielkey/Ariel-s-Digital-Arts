"use client";

import { useState } from "react";

/**
 * Email capture UI. Wires to /api/newsletter, which will call ConvertKit
 * once CONVERTKIT_API_KEY / CONVERTKIT_FORM_ID are set (see .env.example).
 */
export default function NewsletterForm({
  variant = "footer",
}: {
  variant?: "footer" | "banner";
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setStatus("success");
      setMessage("You're on the list — check your inbox!");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const isBanner = variant === "banner";

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2 sm:flex-row">
        <label className="sr-only" htmlFor={`newsletter-email-${variant}`}>
          Email address
        </label>
        <input
          id={`newsletter-email-${variant}`}
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full rounded-full border px-4 py-2.5 text-sm focus:outline-none ${
            isBanner
              ? "border-cream-200 bg-cream-50/90 text-ink-900 focus:border-gold-400"
              : "border-sage-300 bg-white text-foreground focus:border-sage-500"
          }`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-colors cursor-pointer disabled:opacity-50 ${
            isBanner
              ? "bg-gold-400 text-ink-900 hover:bg-gold-300"
              : "bg-sage-600 text-cream-50 hover:bg-sage-700"
          }`}
        >
          {status === "loading" ? "Joining…" : isBanner ? "Get the Free Page" : "Subscribe"}
        </button>
      </form>
      {message ? (
        <p
          className={`mt-2 text-xs ${
            status === "error"
              ? "text-red-600"
              : isBanner
                ? "text-cream-50"
                : "text-sage-700"
          }`}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
