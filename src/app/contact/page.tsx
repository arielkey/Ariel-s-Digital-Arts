import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Ariel's Digital Arts",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <h1 className="font-display text-3xl text-ink-900">Contact</h1>
      <p className="mt-3 max-w-xl text-foreground/70">
        A simple contact form goes here — built out in the next phase.
      </p>
    </section>
  );
}
