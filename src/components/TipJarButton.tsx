"use client";

import { useState } from "react";
import { Heart, X } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

const PRESET_AMOUNTS = [3, 5, 10, 20];

export default function TipJarButton() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState<number>(5);
  const [custom, setCustom] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedAmount = custom ? Number(custom) : amount;

  async function handleTip() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout/tip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: selectedAmount }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? t("tipJar.error"));
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : t("tipJar.error"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-full bg-gold-400 px-4 py-2 text-sm font-medium text-ink-900 transition-colors hover:bg-gold-300 cursor-pointer"
      >
        <Heart className="h-4 w-4" strokeWidth={2} />
        {t("tipJar.button")}
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/50 px-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-cream-50 p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg text-sage-800">{t("tipJar.leaveATip")}</h2>
              <button
                onClick={() => setOpen(false)}
                aria-label={t("tipJar.close")}
                className="text-link/60 hover:text-sage-800 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mb-4 text-sm text-foreground/70">{t("tipJar.description")}</p>
            <div className="mb-4 grid grid-cols-4 gap-2">
              {PRESET_AMOUNTS.map((preset) => (
                <button
                  key={preset}
                  onClick={() => {
                    setAmount(preset);
                    setCustom("");
                  }}
                  className={`rounded-lg border px-2 py-2 text-sm font-medium cursor-pointer transition-colors ${
                    !custom && amount === preset
                      ? "border-sage-600 bg-sage-100 text-sage-800"
                      : "border-sage-200 text-foreground/70 hover:border-sage-400"
                  }`}
                >
                  ${preset}
                </button>
              ))}
            </div>
            <label className="mb-4 block text-sm text-foreground/70">
              {t("tipJar.customAmount")}
              <input
                type="number"
                min={1}
                placeholder={t("tipJar.customAmountPlaceholder")}
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
                className="mt-1 w-full rounded-lg border border-sage-200 px-3 py-2 text-sm focus:border-sage-500 focus:outline-none"
              />
            </label>
            {error ? <p className="mb-3 text-sm text-red-600">{error}</p> : null}
            <button
              onClick={handleTip}
              disabled={loading || selectedAmount < 1}
              className="w-full rounded-full bg-sage-600 px-4 py-2.5 text-sm font-medium text-mist-50 transition-colors hover:bg-sage-700 disabled:opacity-50 cursor-pointer"
            >
              {loading ? t("tipJar.redirecting") : t("tipJar.tip", { amount: selectedAmount || 0 })}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
