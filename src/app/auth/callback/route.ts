import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/auth/server";

/**
 * Handles the redirect back from Supabase after a Google (or any OAuth)
 * sign-in — exchanges the auth code for a session, then sends the visitor
 * on to their account page.
 */
export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const next = req.nextUrl.searchParams.get("next") ?? "/account";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(new URL(next, req.nextUrl.origin));
    }
  }

  return NextResponse.redirect(new URL("/login?error=auth", req.nextUrl.origin));
}
