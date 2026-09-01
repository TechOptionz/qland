import { NextResponse } from "next/server";
import { sendEnquiryToAleesa } from "@/lib/aleesa-leads";
import { parseEnquiry } from "@/lib/enquiry";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Endpoint behind the contact, property management, property sales, house &
 * land, and Boutique Chevron Island forms. `source` records which page the
 * enquiry came from.
 *
 * Enquiries are filed in the Aleesa CRM when ALEESA_WEBSITE_FORM_API_KEY is
 * set. Without it they are only written to the server log — logs are not
 * durable storage, so configure Aleesa (or another destination) before
 * launch.
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

  try {
    const delivery = await sendEnquiryToAleesa(result.enquiry);
    if (delivery === "skipped") {
      console.log("[enquiry] captured (no destination configured)", result.enquiry);
    }
  } catch (error) {
    // The visitor filled the form in good faith; log the submission in full so
    // it is recoverable, then tell them to call rather than losing the lead
    // silently.
    console.error("[enquiry] Aleesa delivery failed", error, result.enquiry);
    return NextResponse.json(
      { error: `We couldn’t send that just now. Please call us on ${site.phone}.` },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
