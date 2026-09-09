import type { Metadata } from "next";
import AboutPageContent from "@/components/AboutPageContent";

export const metadata: Metadata = {
  title: "About | Ariel's Digital Arts",
  description:
    "The story behind Ariel's Digital Arts — original fantasy art inspired by dragons, made with a stickler's eye for detail.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
