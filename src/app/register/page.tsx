import type { Metadata } from "next";
import AuthPageShell from "@/components/AuthPageShell";
import RegisterForm from "@/components/RegisterForm";

export const metadata: Metadata = {
  title: "Create Account | Ariel's Digital Arts",
};

export default function RegisterPage() {
  return (
    <AuthPageShell titleKey="auth.createAccount">
      <RegisterForm />
    </AuthPageShell>
  );
}
