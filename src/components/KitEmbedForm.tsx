"use client";

import { useEffect, useRef } from "react";

const EMBED_SRC = "https://ariel-s-digital-arts.kit.com/f5cc99f86b/index.js";
const EMBED_UID = "f5cc99f86b";

/**
 * Kit's own hosted signup form, embedded via their script widget. Used
 * instead of a native API-based form because Kit's free plan blocks
 * third-party apps from writing subscribers via the API — this embed is
 * Kit's own form, so it works on the free plan. If the account upgrades to
 * a paid plan later, this can be swapped back for a site-styled form that
 * posts to Kit's API directly (KIT_API_KEY / KIT_FORM_ID are already set
 * up for that — see .env.example).
 *
 * The script is injected manually (not via next/script) so it re-runs
 * correctly if this component ever remounts client-side, since Next.js
 * dedupes <Script> tags by src and wouldn't re-execute it otherwise.
 */
export default function KitEmbedForm() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-uid", EMBED_UID);
    script.src = EMBED_SRC;
    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return <div ref={containerRef} className="w-full max-w-md" />;
}
