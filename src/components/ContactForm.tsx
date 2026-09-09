"use client";

import { useState } from "react";

const REASONS = ["General Inquiry", "Custom Commission", "Order Question", "Other"];

export default function ContactForm({ initialMessage = "" }: { initialMessage?: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState(REASONS[0]);
  const [message, setMessage] = useState(initialMessage);
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
        body: JSON.stringify({ name, email, reason, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-sage-200 bg-sage-50 px-6 py-8 text-center">
        <p className="font-display text-lg text-sage-800">Message sent!</p>
        <p className="mt-2 text-sm text-foreground/70">
          Thanks for reaching out — I&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground/80">
          Name
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg border border-sage-200 px-3 py-2 text-sm focus:border-sage-500 focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground/80">
          Email
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
        Reason
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="rounded-lg border border-sage-200 px-3 py-2 text-sm focus:border-sage-500 focus:outline-none"
        >
          {REASONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground/80">
        Message
        <textarea
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="rounded-lg border border-sage-200 px-3 py-2 text-sm focus:border-sage-500 focus:outline-none"
        />
      </label>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="self-start rounded-full bg-sage-600 px-6 py-2.5 text-sm font-medium text-cream-50 transition-colors hover:bg-sage-700 disabled:opacity-60 cursor-pointer"
      >
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
