"use client";

import { useState } from "react";

export default function CommissionForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [deadline, setDeadline] = useState("");
  const [budget, setBudget] = useState("");
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
          reason: "Custom Commission",
          message,
          subject,
          deadline,
          budget,
          reference,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
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
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-sage-200 bg-sage-50 px-6 py-8 text-center">
        <p className="font-display text-lg text-sage-800">Request sent!</p>
        <p className="mt-2 text-sm text-foreground/70">
          Thanks for reaching out — I&apos;ll let you know if it&apos;s something I can take on.
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
            className="rounded-lg border border-sage-200 bg-white px-3 py-2 text-sm focus:border-sage-500 focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground/80">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border border-sage-200 bg-white px-3 py-2 text-sm focus:border-sage-500 focus:outline-none"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground/80">
          Subject
          <input
            type="text"
            placeholder="e.g. a dragon portrait, a pet, a character"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="rounded-lg border border-sage-200 bg-white px-3 py-2 text-sm focus:border-sage-500 focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground/80">
          Deadline
          <input
            type="text"
            placeholder="e.g. flexible, or a specific date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="rounded-lg border border-sage-200 bg-white px-3 py-2 text-sm focus:border-sage-500 focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground/80">
          Budget range
          <input
            type="text"
            placeholder="e.g. $100–150"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="rounded-lg border border-sage-200 bg-white px-3 py-2 text-sm focus:border-sage-500 focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground/80">
          Reference / inspiration
          <input
            type="text"
            placeholder="link to an image, or describe it"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            className="rounded-lg border border-sage-200 bg-white px-3 py-2 text-sm focus:border-sage-500 focus:outline-none"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground/80">
        Message
        <textarea
          required
          rows={5}
          placeholder="Tell me a bit more about what you have in mind."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="rounded-lg border border-sage-200 bg-white px-3 py-2 text-sm focus:border-sage-500 focus:outline-none"
        />
      </label>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="self-start rounded-full bg-gold-400 px-6 py-2.5 text-sm font-medium text-ink-900 transition-colors hover:bg-gold-300 disabled:opacity-60 cursor-pointer"
      >
        {status === "loading" ? "Sending…" : "Request a Commission"}
      </button>
    </form>
  );
}
