"use client";

import { useEffect, useRef, useState } from "react";

type Role = "user" | "bot";
type Message = { role: Role; text: string };

const GREETING: Message = {
  role: "bot",
  text: "Hi! I’m the Qland assistant. Ask me anything about buying, building, or managing property in Brisbane.",
};

const FALLBACK =
  "Thanks for your message! For a quick answer, call us on 0423 584 690 or book a free strategy session at calendly.com/qland-booking. Our team will be in touch.";

const SESSION_KEY = "qland_chat_session_id";

/**
 * A stable id for this visitor's conversation, reused across page loads.
 *
 * The Aleesa provider keys the transcript and the inbox thread on it, so a
 * fresh id every turn would leave the bot with no memory and scatter one
 * conversation across many threads. Providers that hold no state ignore it.
 */
function getSessionId(): string {
  try {
    const existing = window.localStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const created = `chat_${crypto.randomUUID()}`;
    window.localStorage.setItem(SESSION_KEY, created);
    return created;
  } catch {
    // Private mode / storage disabled: still usable, just not across reloads.
    return `chat_${crypto.randomUUID()}`;
  }
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const bodyRef = useRef<HTMLDivElement>(null);
  // Minted lazily on the first send: localStorage is browser-only, and doing
  // it in an effect would set state during render for no benefit.
  const sessionIdRef = useRef("");

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, thinking, open]);

  async function send() {
    const text = input.trim();
    if (!text || thinking) return;

    const next = [...messages, { role: "user" as const, text }];
    setMessages(next);
    setInput("");
    setThinking(true);

    let reply = "";
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, text: m.text })),
          // Read by the Aleesa provider so the conversation stays one thread
          // in the inbox; ignored by providers that hold no state.
          sessionId: (sessionIdRef.current ||= getSessionId()),
          page: window.location.pathname,
        }),
      });
      if (res.ok) {
        const data: { reply?: string } = await res.json();
        reply = (data.reply ?? "").trim();
      }
    } catch {
      // Network failure — fall through to the canned reply below.
    }

    setMessages([...next, { role: "bot", text: reply || FALLBACK }]);
    setThinking(false);
  }

  return (
    <div className="fixed right-5 bottom-5 z-100 flex flex-col items-end gap-3">
      {open && (
        <div className="pop-in flex h-[480px] max-h-[calc(100vh-120px)] w-[min(360px,calc(100vw-40px))] flex-col overflow-hidden rounded-[18px] border border-line bg-white shadow-[0_24px_60px_rgba(22,19,14,0.25)]">
          <div className="flex items-center gap-3 bg-ink px-[18px] py-4 text-cream">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber font-extrabold text-ink">
              Q
            </span>
            <span className="flex flex-col">
              <span className="text-sm font-bold">Qland Assistant</span>
              <span className="flex items-center gap-1.5 text-[11.5px] text-amber-light">
                <span className="inline-block h-[7px] w-[7px] rounded-full bg-[#6BCB77]" />
                Online now
              </span>
            </span>
          </div>

          <div
            ref={bodyRef}
            className="flex flex-1 flex-col gap-2.5 overflow-y-auto bg-cream p-4"
            aria-live="polite"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`rise-in max-w-[85%] rounded-[14px] px-3.5 py-2.5 text-[13.5px] leading-[1.55] whitespace-pre-wrap [animation-duration:300ms] ${
                  m.role === "user"
                    ? "self-end bg-amber text-ink"
                    : "self-start border border-line bg-white text-body-strong"
                }`}
              >
                {m.text}
              </div>
            ))}
            {thinking && (
              <div className="rise-in self-start rounded-[14px] border border-line bg-white px-3.5 py-2.5 text-[13.5px] text-muted [animation-duration:300ms]">
                Typing…
              </div>
            )}
          </div>

          <div className="flex gap-2 border-t border-line bg-white p-3">
            <label htmlFor="chat-input" className="sr-only">
              Ask about buying or building
            </label>
            <input
              id="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") send();
              }}
              placeholder="Ask about buying or building…"
              className="flex-1 rounded-full border border-line bg-cream px-4 py-2.5 text-[13.5px] outline-none focus:border-amber"
            />
            <button
              type="button"
              onClick={send}
              disabled={thinking}
              className="cursor-pointer rounded-full bg-amber px-[18px] text-[13px] font-extrabold text-ink disabled:opacity-60"
            >
              Send
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Chat with us"}
        aria-expanded={open}
        className="flex h-[58px] w-[58px] cursor-pointer items-center justify-center rounded-full bg-amber text-2xl text-ink shadow-[0_12px_30px_rgba(240,166,60,0.5)] transition-[background-color,color,scale] duration-200 hover:scale-105 hover:bg-ink hover:text-amber-light active:scale-95 motion-reduce:transition-none motion-reduce:hover:scale-100"
      >
        {open ? "✕" : "💬"}
      </button>
    </div>
  );
}
