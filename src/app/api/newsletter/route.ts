import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiKey = process.env.KIT_API_KEY;
  const formId = process.env.KIT_FORM_ID;

  if (!apiKey || !formId) {
    return NextResponse.json(
      {
        error: "Email signup isn't configured yet. Add KIT_API_KEY and KIT_FORM_ID to .env.local.",
      },
      { status: 503 }
    );
  }

  const { email } = (await req.json()) as { email?: string };
  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  const res = await fetch(`https://api.kit.com/v4/forms/${formId}/subscribers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Kit-Api-Key": apiKey,
    },
    body: JSON.stringify({ email_address: email }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Kit API error:", text);
    return NextResponse.json({ error: "Could not sign up right now." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
