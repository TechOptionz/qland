import Anthropic from "@anthropic-ai/sdk";
import { assistantSystemPrompt } from "@/lib/site";
import type { ChatMessage, ChatProvider, ChatReply } from "./types";

/**
 * Claude, via the Anthropic Messages API.
 *
 * The fallback when Aleesa is not configured (see provider.ts). Stateless:
 * the whole conversation is replayed on every turn and the bot's training is
 * `assistantSystemPrompt` in src/lib/site.ts.
 */

const MODEL = "claude-opus-5";

export const anthropicProvider: ChatProvider = {
  name: "anthropic",
  async reply(messages: ChatMessage[]): Promise<ChatReply> {
    // The Messages API requires the turn to end on a user message.
    const history = [...messages];
    while (history.length > 0 && history[0].role !== "user") history.shift();
    if (history.length === 0 || history[history.length - 1].role !== "user") {
      throw new Error("Expected a trailing user message");
    }

    const client = new Anthropic();
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      // A short FAQ answer needs no deep reasoning; low effort keeps it fast and cheap.
      output_config: { effort: "low" },
      system: assistantSystemPrompt,
      messages: history,
    });

    // A refusal has no useful text in it; let the widget show the contact
    // fallback instead of an apology.
    if (response.stop_reason === "refusal") return { content: "" };

    const content = response.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("")
      .trim();

    return { content };
  },
};
