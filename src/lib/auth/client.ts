"use client";

import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser-side Supabase client for Auth — separate from the plain
 * `supabase`/`supabaseAdmin` clients in lib/supabase.ts (which don't manage
 * cookies and are used for one-off public reads / admin writes).
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
