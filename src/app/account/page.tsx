import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/auth/server";
import AccountPageContent from "@/components/AccountPageContent";

export const metadata: Metadata = {
  title: "My Account | Ariel's Digital Arts",
};

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();

  return <AccountPageContent email={user.email ?? ""} profile={profile} />;
}
