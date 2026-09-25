"use client";

import BookCard from "./BookCard";
import { useLanguage } from "./LanguageProvider";
import { books } from "@/lib/books";

export default function BooksPageContent() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-10">
        <h1 className="font-display text-3xl text-foreground">{t("books.title")}</h1>
        <p className="mt-3 max-w-xl text-foreground/70">{t("books.description")}</p>
      </div>

      <div className="grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}
