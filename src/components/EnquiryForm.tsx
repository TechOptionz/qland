"use client";

import { useId, useState } from "react";

export type FormField = {
  /** Must match a field name accepted by `parseEnquiry` in `src/lib/enquiry.ts`. */
  name:
    | "name"
    | "firstName"
    | "lastName"
    | "email"
    | "phone"
    | "address"
    | "postcode"
    | "subject"
    | "contactMethod"
    | "bedrooms"
    | "budget"
    | "buyerType"
    | "message";
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  /** Example input shown in the empty control. Ignored by `select`, which
   *  already shows a "Please choose…" option. */
  placeholder?: string;
  autoComplete?: string;
  options?: readonly string[];
  /** Spans the full width of the grid rather than one column. */
  wide?: boolean;
};

/**
 * The enquiry form used by the contact, property management, property sales,
 * and house & land pages.
 *
 * `tone` picks the palette: `amber` for the gradient panels (dark controls on
 * the amber card) and `light` for a form sitting on the cream page background.
 */
export default function EnquiryForm({
  fields,
  source,
  submitLabel = "Send enquiry",
  successMessage = "Thank you for your enquiry, we will get back to you shortly.",
  tone = "amber",
  columns = 2,
}: {
  fields: readonly FormField[];
  source: string;
  submitLabel?: string;
  successMessage?: string;
  tone?: "amber" | "light";
  columns?: 1 | 2;
}) {
  const uid = useId();
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setPending(true);
    setError(null);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source }),
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

  const dark = tone === "amber";

  if (sent) {
    return (
      <div
        role="status"
        className={`pop-in rounded-[14px] px-6 py-5 text-[15px] font-bold ${
          dark ? "bg-ink text-amber-light" : "bg-ink text-amber-light"
        }`}
      >
        {successMessage}
      </div>
    );
  }

  const controlClass = `w-full rounded-xl px-[18px] py-[15px] text-sm outline-none transition-[box-shadow,background-color] duration-200 placeholder:text-body ${
    dark
      ? "border-none bg-cream focus:bg-white focus:ring-2 focus:ring-ink/30"
      : "border border-line bg-white focus:border-amber focus:ring-2 focus:ring-amber/30"
  }`;

  const labelClass = `text-[12px] font-bold tracking-[0.08em] uppercase ${
    dark ? "text-ink/70" : "text-muted"
  }`;

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-4">
      <div
        className={`grid grid-cols-1 gap-4 ${columns === 2 ? "sm:grid-cols-2" : ""}`}
      >
        {fields.map((field) => {
          const id = `${uid}-${field.name}`;
          const type = field.type ?? "text";
          const value = values[field.name] ?? "";
          const set = (v: string) =>
            setValues((prev) => ({ ...prev, [field.name]: v }));

          return (
            <div
              key={field.name}
              className={`flex flex-col gap-1.5 ${
                field.wide && columns === 2 ? "sm:col-span-2" : ""
              }`}
            >
              <label htmlFor={id} className={labelClass}>
                {field.label}
              </label>

              {type === "textarea" ? (
                <textarea
                  id={id}
                  name={field.name}
                  rows={5}
                  placeholder={field.placeholder}
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  className={`${controlClass} resize-y`}
                />
              ) : type === "select" ? (
                <select
                  id={id}
                  name={field.name}
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  className={`${controlClass} cursor-pointer`}
                >
                  <option value="">Please choose…</option>
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={id}
                  name={field.name}
                  type={type}
                  autoComplete={field.autoComplete}
                  placeholder={field.placeholder}
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  className={controlClass}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className={`cursor-pointer rounded-full px-[26px] py-[14px] text-sm font-extrabold transition-[background-color,color,scale] duration-200 active:scale-[0.98] disabled:opacity-60 motion-reduce:transition-none motion-reduce:active:scale-100 ${
            dark
              ? "bg-ink text-cream hover:bg-cream hover:text-ink"
              : "bg-amber text-ink hover:bg-ink hover:text-cream"
          }`}
        >
          {pending ? "Sending…" : submitLabel}
        </button>

        {error && (
          <p
            role="alert"
            className={`rise-in m-0 text-[13px] font-semibold [animation-duration:300ms] ${
              dark ? "text-ink" : "text-body-strong"
            }`}
          >
            {error}
          </p>
        )}
      </div>
    </form>
  );
}
