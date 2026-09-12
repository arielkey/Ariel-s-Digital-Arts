import type { Metadata } from "next";
import AuthPageShell from "@/components/AuthPageShell";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password | Ariel's Digital Arts",
};

export default function ForgotPasswordPage() {
  return (
    <AuthPageShell titleKey="auth.resetPassword">
      <ForgotPasswordForm />
    </AuthPageShell>
  );
}
