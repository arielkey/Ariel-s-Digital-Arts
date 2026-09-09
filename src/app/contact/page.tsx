import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { InstagramIcon, TikTokIcon } from "@/components/SocialIcons";
import FeedbackForm from "@/components/FeedbackForm";

export const metadata: Metadata = {
  title: "Contact | Ariel's Digital Arts",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
      <h1 className="font-display text-3xl text-ink-900">Contact</h1>
      <p className="mt-3 text-foreground/70">
        Questions about an order, or interested in a piece from the gallery?
        Reach out any time — I&apos;d love to hear from you.
      </p>

      <a
        href="mailto:executiveorganizeak@gmail.com"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-sage-600 px-6 py-3 text-sm font-medium text-cream-50 transition-colors hover:bg-sage-700"
      >
        <Mail className="h-4 w-4" />
        executiveorganizeak@gmail.com
      </a>

      <div className="mt-8 flex items-center justify-center gap-6">
        <a
          href="https://instagram.com/arielsdigitalarts"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-sage-700 transition-colors hover:text-sage-900"
        >
          <InstagramIcon className="h-7 w-7" />
        </a>
        <a
          href="https://tiktok.com/@arielsdigitalarts"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TikTok"
          className="text-sage-700 transition-colors hover:text-sage-900"
        >
          <TikTokIcon className="h-7 w-7" />
        </a>
      </div>

      <p className="mt-10 text-sm text-foreground/60">
        Looking to commission a custom piece? Head over to the{" "}
        <a href="/about#commissions" className="font-medium text-sage-700 underline hover:text-sage-800">
          Commissions
        </a>{" "}
        section instead.
      </p>

      <div className="mt-16 rounded-2xl border border-sage-200 bg-white p-6 text-left sm:p-8">
        <h2 className="font-display text-xl text-ink-900">
          Have feedback, a suggestion, or a complaint?
        </h2>
        <p className="mt-2 text-sm text-foreground/70">
          Let me know here — I read every message.
        </p>
        <div className="mt-6">
          <FeedbackForm />
        </div>
      </div>
    </section>
  );
}
