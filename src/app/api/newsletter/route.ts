import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiKey = process.env.CONVERTKIT_API_KEY;
  const formId = process.env.CONVERTKIT_FORM_ID;

  if (!apiKey || !formId) {
    return NextResponse.json(
      {
        error:
          "Email signup isn't configured yet. Add CONVERTKIT_API_KEY and CONVERTKIT_FORM_ID to .env.local.",
      },
      { status: 503 }
    );
  }

  const { email } = (await req.json()) as { email?: string };
  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  const res = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ api_key: apiKey, email }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Could not sign up right now." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
