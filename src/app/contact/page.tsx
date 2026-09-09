import type { Metadata } from "next";
import ContactPageContent from "@/components/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact | Ariel's Digital Arts",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
