/**
 * Shared types for the site assistant.
 *
 * The widget and the `/api/chat` route only ever see `ChatProvider`, so which
 * assistant actually answers — Aleesa or Claude — is decided in one place
 * (`provider.ts`) and nothing else changes with it.
 */

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type ChatReply = {
  /** Empty means "no answer" — the widget then shows the contact fallback. */
  content: string;
};

/**
 * Per-visitor context that travels with a turn.
 *
 * Only stateful providers use it. Aleesa needs `sessionId` to keep the
 * conversation together across turns and to file it in the right inbox
 * thread; the customer fields enrich the contact record it creates.
 */
export type ChatContext = {
  sessionId?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  /** Path the visitor was on, so the reply can be read in context. */
  page?: string;
};

/** Anything that can answer a conversation. */
export type ChatProvider = {
  name: string;
  reply(messages: ChatMessage[], context?: ChatContext): Promise<ChatReply>;
};

export const MAX_HISTORY = 20;
export const MAX_MESSAGE_LENGTH = 2000;
