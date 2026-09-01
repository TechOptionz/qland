import { aleesaProvider } from "./aleesa-provider";
import { anthropicProvider } from "./anthropic-provider";
import type { ChatProvider } from "./types";

/**
 * THE SWAP POINT. First match wins:
 *
 *   1. Aleesa Web Chat — ALEESA_WEBHOOK_URL + ALEESA_WEBCHAT_API_KEY.
 *      The bot is trained in the Aleesa dashboard (Knowledge Base + Chat
 *      Agent) and every conversation lands in the Aleesa inbox, where a
 *      human can take over.
 *   2. Claude — ANTHROPIC_API_KEY. Trained by `assistantSystemPrompt` in
 *      src/lib/site.ts. No inbox, no memory between page loads.
 *   3. Nothing configured — the route answers with an empty reply and the
 *      widget shows the "call us / book a call" fallback.
 *
 * Nothing else in the app changes with the choice: the widget and the API
 * route only know about the ChatProvider interface.
 *
 * See .env.example for the variables.
 */
export function getChatProvider(): ChatProvider | null {
  if (process.env.ALEESA_WEBHOOK_URL && process.env.ALEESA_WEBCHAT_API_KEY) {
    return aleesaProvider;
  }
  return process.env.ANTHROPIC_API_KEY ? anthropicProvider : null;
}
