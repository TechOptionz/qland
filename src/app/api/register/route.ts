import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = { name?: unknown; email?: unknown; phone?: unknown };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim().slice(0, 200) : "";
  const email = typeof body.email === "string" ? body.email.trim().slice(0, 200) : "";
  const phone = typeof body.phone === "string" ? body.phone.trim().slice(0, 50) : "";

  if (!name) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!email && !phone) {
    return NextResponse.json(
      { error: "Please leave an email address or a phone number." },
      { status: 400 },
    );
  }
  if (email && !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "That email address looks incomplete." }, { status: 400 });
  }

  // NOTE: enquiries are only written to the server log. Wire this up to the
  // real destination (CRM, transactional email, or a database) before launch —
  // see README.md § "Register-interest form".
  console.log("[register] Boutique Chevron Island enquiry:", { name, email, phone });

  return NextResponse.json({ ok: true });
}
