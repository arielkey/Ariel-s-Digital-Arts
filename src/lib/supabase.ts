import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** Read-only client, respects Row Level Security. Used for public gallery reads. */
export const supabase = url && anonKey ? createClient(url, anonKey) : null;

/** Server-only client that bypasses RLS. Used by the checkout webhook to mark a piece sold. */
export const supabaseAdmin =
  url && serviceRoleKey ? createClient(url, serviceRoleKey) : null;
