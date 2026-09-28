import type { Metadata } from "next";
import LegalPageContent from "@/components/LegalPageContent";
import { termsOfUse } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms of Use | Ariel's Digital Arts",
};

export default function TermsOfUsePage() {
  return <LegalPageContent doc={termsOfUse} currentSlug="terms" />;
}
