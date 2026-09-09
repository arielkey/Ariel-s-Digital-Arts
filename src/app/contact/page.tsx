import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Ariel's Digital Arts",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ piece?: string; title?: string; reason?: string }>;
}) {
  const { title, reason } = await searchParams;

  const initialMessage = title
    ? `Hi Ariel, I'm interested in "${title}" from your gallery. `
    : "";

  return (
    <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl text-ink-900">Contact</h1>
      <p className="mt-3 text-foreground/70">
        Questions about an order, interested in a gallery piece, or want to
        commission something custom? Send a message and I&apos;ll get back to
        you soon.
      </p>

      <div className="mt-10">
        <ContactForm initialMessage={initialMessage} initialReason={reason} />
      </div>
    </section>
  );
}
