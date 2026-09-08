import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Ariel's Digital Arts",
};

export default function GalleryPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <h1 className="font-display text-3xl text-ink-900">Gallery</h1>
      <p className="mt-3 max-w-xl text-foreground/70">
        A portfolio-style showcase of original art pieces, pulled live from
        Supabase — built out in the next phase.
      </p>
    </section>
  );
}
