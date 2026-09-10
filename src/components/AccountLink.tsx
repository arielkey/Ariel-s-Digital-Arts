"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "lucide-react";
import { createClient } from "@/lib/auth/client";
import { useLanguage } from "./LanguageProvider";

export default function AccountLink() {
  const { t } = useLanguage();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => setLoggedIn(!!data.session));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <Link
      href={loggedIn ? "/account" : "/login"}
      aria-label={loggedIn ? t("nav_account.myAccount") : t("nav_account.logIn")}
      className="text-sage-800 cursor-pointer"
    >
      <User className="h-5 w-5" />
    </Link>
  );
}
