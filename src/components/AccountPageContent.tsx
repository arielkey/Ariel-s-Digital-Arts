"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/auth/client";
import { useLanguage } from "./LanguageProvider";
import type { Profile } from "@/lib/types";

export default function AccountPageContent({
  email,
  profile,
}: {
  email: string;
  profile: Profile | null;
}) {
  const { t } = useLanguage();
  const router = useRouter();

  const [fullName, setFullName] = useState(profile?.full_name ?? "");
  const [address1, setAddress1] = useState(profile?.shipping_address1 ?? "");
  const [address2, setAddress2] = useState(profile?.shipping_address2 ?? "");
  const [city, setCity] = useState(profile?.shipping_city ?? "");
  const [state, setState] = useState(profile?.shipping_state ?? "");
  const [zip, setZip] = useState(profile?.shipping_zip ?? "");
  const [country, setCountry] = useState(profile?.shipping_country ?? "US");
  const [status, setStatus] = useState<"idle" | "loading" | "saved" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { error: upsertError } = await supabase.from("profiles").upsert({
      id: user.id,
      email,
      full_name: fullName,
      shipping_address1: address1,
      shipping_address2: address2 || null,
      shipping_city: city,
      shipping_state: state,
      shipping_zip: zip,
      shipping_country: country,
    });

    if (upsertError) {
      setStatus("error");
      setError(upsertError.message || t("account.error"));
      return;
    }
    setStatus("saved");
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl text-foreground">{t("account.title")}</h1>
        <button
          onClick={handleSignOut}
          className="rounded-full border border-sage-200 px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-sage-50 cursor-pointer"
        >
          {t("account.signOut")}
        </button>
      </div>
      <p className="mt-2 text-sm text-foreground/60">
        {t("account.signedInAs")} <span className="font-medium text-foreground/80">{email}</span>
      </p>

      <div className="mt-10 rounded-2xl border border-sage-200 bg-cream-50 p-6 sm:p-8">
        <h2 className="font-display text-xl text-foreground">{t("account.shippingTitle")}</h2>
        <p className="mt-2 text-sm text-foreground/70">{t("account.shippingDesc")}</p>

        <form onSubmit={handleSave} className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground/80">
            {t("account.fullName")}
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="rounded-lg border border-sage-200 bg-cream-100 px-3 py-2 text-sm focus:border-sage-500 focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground/80">
            {t("account.address1")}
            <input
              type="text"
              required
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              className="rounded-lg border border-sage-200 bg-cream-100 px-3 py-2 text-sm focus:border-sage-500 focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground/80">
            {t("account.address2")}
            <input
              type="text"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              className="rounded-lg border border-sage-200 bg-cream-100 px-3 py-2 text-sm focus:border-sage-500 focus:outline-none"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground/80">
              {t("account.city")}
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="rounded-lg border border-sage-200 bg-cream-100 px-3 py-2 text-sm focus:border-sage-500 focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground/80">
              {t("account.state")}
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="rounded-lg border border-sage-200 bg-cream-100 px-3 py-2 text-sm focus:border-sage-500 focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground/80">
              {t("account.zip")}
              <input
                type="text"
                required
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                className="rounded-lg border border-sage-200 bg-cream-100 px-3 py-2 text-sm focus:border-sage-500 focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground/80">
              {t("account.country")}
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="rounded-lg border border-sage-200 bg-cream-100 px-3 py-2 text-sm focus:border-sage-500 focus:outline-none"
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
              </select>
            </label>
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={status === "loading"}
            className="self-start rounded-full bg-sage-600 px-6 py-2.5 text-sm font-medium text-mist-50 transition-colors hover:bg-sage-700 disabled:opacity-60 cursor-pointer"
          >
            {status === "loading" ? t("account.saving") : status === "saved" ? t("account.saved") : t("account.save")}
          </button>
        </form>
      </div>
    </section>
  );
}
