import type { Metadata } from "next";
import BooksPageContent from "@/components/BooksPageContent";

export const metadata: Metadata = {
  title: "Coloring Books | Ariel's Digital Arts",
};

export default function BooksPage() {
  return <BooksPageContent />;
}
