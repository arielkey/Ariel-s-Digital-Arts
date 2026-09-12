import type { Metadata } from "next";
import AuthPageShell from "@/components/AuthPageShell";
import ResetPasswordForm from "@/components/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Set New Password | Ariel's Digital Arts",
};

export default function ResetPasswordPage() {
  return (
    <AuthPageShell titleKey="auth.resetPassword">
      <ResetPasswordForm />
    </AuthPageShell>
  );
}
