import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { assistantSystemPrompt } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODEL = "claude-opus-5";
const MAX_MESSAGES = 20;
const MAX_CHARS = 2000;

type IncomingMessage = { role: "user" | "bot"; text: string };

function isValid(body: unknown): body is { messages: IncomingMessage[] } {
  if (typeof body !== "object" || body === null) return false;
  const { messages } = body as { messages?: unknown };
  return (
    Array.isArray(messages) &&
    messages.every(
      (m) =>
        typeof m === "object" &&
        m !== null &&
        ((m as IncomingMessage).role === "user" ||
          (m as IncomingMessage).role === "bot") &&
        typeof (m as IncomingMessage).text === "string",
    )
  );
}

export async function POST(request: Request) {
  // Without a key the widget still works — the client falls back to the
  // "call us" reply when `reply` comes back empty.
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ reply: "" });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!isValid(body)) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const history = body.messages
    .slice(-MAX_MESSAGES)
    .map((m) => ({
      role: (m.role === "user" ? "user" : "assistant") as "user" | "assistant",
      content: m.text.slice(0, MAX_CHARS),
    }))
    // The Messages API rejects empty content and requires the turn to end on a user message.
    .filter((m) => m.content.trim().length > 0);

  while (history.length > 0 && history[0].role !== "user") history.shift();
  if (history.length === 0 || history[history.length - 1].role !== "user") {
    return NextResponse.json({ error: "Expected a trailing user message" }, { status: 400 });
  }

  try {
    const client = new Anthropic();
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      // A short FAQ answer needs no deep reasoning; low effort keeps it fast and cheap.
      output_config: { effort: "low" },
      system: assistantSystemPrompt,
      messages: history,
    });

    if (response.stop_reason === "refusal") {
      return NextResponse.json({ reply: "" });
    }

    const reply = response.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("")
      .trim();

    return NextResponse.json({ reply });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      console.error("[chat] rate limited");
      return NextResponse.json({ reply: "" }, { status: 200 });
    }
    if (error instanceof Anthropic.APIError) {
      console.error(`[chat] Anthropic API error ${error.status}:`, error.message);
    } else {
      console.error("[chat] unexpected error:", error);
    }
    // Never surface an error to the visitor — the widget shows the contact fallback.
    return NextResponse.json({ reply: "" }, { status: 200 });
  }
}
