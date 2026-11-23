import type { Metadata } from "next";
import CrimsonValkyriePageContent from "@/components/CrimsonValkyriePageContent";

export const metadata: Metadata = {
  title: "The Crimson Valkyrie | Ariel's Digital Arts",
  description: "Hand-painted MTG card alters, custom tokens, and original fantasy art.",
};

export default function CrimsonValkyriePage() {
  return <CrimsonValkyriePageContent />;
}
