import type { Metadata } from "next";
import LegalPageContent from "@/components/LegalPageContent";
import { termsOfSale } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms of Sale & Refund Policy | Ariel's Digital Arts",
};

export default function TermsOfSalePage() {
  return <LegalPageContent doc={termsOfSale} currentSlug="terms-of-sale" />;
}
