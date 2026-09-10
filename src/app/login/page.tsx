import type { Metadata } from "next";
import AuthPageShell from "@/components/AuthPageShell";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Log In | Ariel's Digital Arts",
};

export default function LoginPage() {
  return (
    <AuthPageShell titleKey="auth.logIn">
      <LoginForm />
    </AuthPageShell>
  );
}
