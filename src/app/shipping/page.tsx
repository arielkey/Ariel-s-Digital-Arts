import type { Metadata } from "next";
import LegalPageContent from "@/components/LegalPageContent";
import { shippingPolicy } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Shipping Policy | Ariel's Digital Arts",
};

export default function ShippingPolicyPage() {
  return <LegalPageContent doc={shippingPolicy} currentSlug="shipping" />;
}
