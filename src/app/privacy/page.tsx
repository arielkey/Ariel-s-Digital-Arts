import type { Metadata } from "next";
import LegalPageContent from "@/components/LegalPageContent";
import { privacyPolicy } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy | Ariel's Digital Arts",
};

export default function PrivacyPolicyPage() {
  return <LegalPageContent doc={privacyPolicy} currentSlug="privacy" />;
}
