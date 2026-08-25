"use client";

import { useState } from "react";

const inputClass =
  "rounded-xl border-none bg-cream px-[18px] py-[15px] text-sm outline-none focus:ring-2 focus:ring-ink/30";

export default function RegisterInterestForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [values, setValues] = useState({ name: "", email: "", phone: "" });

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setPending(true);
    setError(null);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data: { error?: string } = await res.json().catch(() => ({}));
      if (res.ok) {
        setSent(true);
      } else {
        setError(data.error ?? "Something went wrong. Please call us on 0423 584 690.");
      }
    } catch {
      setError("Couldn’t reach the server. Please call us on 0423 584 690.");
    } finally {
      setPending(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-[14px] bg-ink px-6 py-5 text-[15px] font-bold text-amber-light">
        Thank you — we&apos;ll be in touch shortly. For anything urgent, call 0423 584 690.
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-3">
      {/* Single row only once there is room for three fields plus the button. */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 nav:grid-cols-[1fr_1fr_1fr_auto]">
        <label htmlFor="reg-name" className="sr-only">
          Full name
        </label>
        <input
          id="reg-name"
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          placeholder="Full name"
          className={inputClass}
        />

        <label htmlFor="reg-email" className="sr-only">
          Email
        </label>
        <input
          id="reg-email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          placeholder="Email"
          className={inputClass}
        />

        <label htmlFor="reg-phone" className="sr-only">
          Phone
        </label>
        <input
          id="reg-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
          placeholder="Phone"
          className={inputClass}
        />

        <button
          type="submit"
          disabled={pending}
          className="cursor-pointer rounded-xl bg-ink px-[18px] py-[15px] text-sm font-extrabold text-cream transition-colors hover:bg-cream hover:text-ink disabled:opacity-60"
        >
          {pending ? "Sending…" : "Register"}
        </button>
      </div>

      {error && (
        <p role="alert" className="m-0 text-[13px] font-semibold text-ink">
          {error}
        </p>
      )}
    </form>
  );
}
