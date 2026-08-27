import { NextResponse } from "next/server";
import { parseEnquiry } from "@/lib/enquiry";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Endpoint behind the contact, property management, property sales, and
 * house & land forms. `source` records which page the enquiry came from.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const result = parseEnquiry(body);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  // NOTE: enquiries are only written to the server log. Wire this up to the
  // real destination (CRM, transactional email, or a database) before launch —
  // see README.md § "Enquiry forms".
  console.log("[enquiry]", result.enquiry);

  return NextResponse.json({ ok: true });
}
