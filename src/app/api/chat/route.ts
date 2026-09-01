import { NextResponse } from "next/server";
import { getChatProvider } from "@/lib/chat/provider";
import { parseChatContext, parseMessages } from "@/lib/chat/validate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Answers a conversation turn. Which assistant answers — Aleesa Web Chat or
 * Claude — is decided in src/lib/chat/provider.ts.
 *
 * The response is always `{ reply }`, and an empty reply is a valid answer:
 * the widget then shows the "call us / book a call" fallback rather than an
 * error. Nothing about a provider failure reaches the browser.
 */
export async function POST(request: Request) {
  const provider = getChatProvider();
  // Nothing configured — the widget still works, on the fallback reply.
  if (!provider) return NextResponse.json({ reply: "" });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const messages = parseMessages(body);
  if (!messages) {
    return NextResponse.json(
      { error: "Expected { messages: [{ role, text }] }" },
      { status: 400 },
    );
  }

  // Optional; only stateful providers (Aleesa) read it.
  const context = parseChatContext(body);

  try {
    const { content } = await provider.reply(messages, context);
    return NextResponse.json({ reply: content });
  } catch (error) {
    // Never surface provider internals to the visitor.
    console.error(`[chat] ${provider.name} provider failed`, error);
    return NextResponse.json({ reply: "" });
  }
}
