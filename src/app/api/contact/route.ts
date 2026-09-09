import { NextRequest, NextResponse } from "next/server";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !toEmail) {
    return NextResponse.json(
      {
        error:
          "The contact form isn't connected yet. Add RESEND_API_KEY and CONTACT_TO_EMAIL to .env.local.",
      },
      { status: 503 }
    );
  }

  const { name, email, reason, message, subject, deadline, budget, reference } =
    (await req.json()) as {
      name?: string;
      email?: string;
      reason?: string;
      message?: string;
      subject?: string;
      deadline?: string;
      budget?: string;
      reference?: string;
    };

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "That email address doesn't look right." }, { status: 400 });
  }

  const commissionDetails = [
    subject ? `<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>` : "",
    deadline ? `<p><strong>Deadline:</strong> ${escapeHtml(deadline)}</p>` : "",
    budget ? `<p><strong>Budget range:</strong> ${escapeHtml(budget)}</p>` : "",
    reference ? `<p><strong>Reference / inspiration:</strong> ${escapeHtml(reference)}</p>` : "",
  ].join("");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Ariel's Digital Arts <onboarding@resend.dev>",
      to: [toEmail],
      reply_to: email,
      subject: `New message from ${name}${reason ? ` — ${reason}` : ""}`,
      html: `
        <p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>
        ${reason ? `<p><strong>Reason:</strong> ${escapeHtml(reason)}</p>` : ""}
        ${commissionDetails}
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Resend error:", text);
    return NextResponse.json({ error: "Could not send your message right now." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
