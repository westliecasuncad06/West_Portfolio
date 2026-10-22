"use client";

import { Check, CircleAlert, LoaderCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { validateContact, type ContactField, type FieldErrors } from "@/lib/contact-schema";
import { profile } from "@/content/profile";
import { cn } from "@/lib/cn";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent"; email: string } | { kind: "error"; message: string };

const empty = { name: "", email: "", phone: "", message: "" };

const fields: { name: ContactField; label: string; type?: string; autoComplete: string; optional?: boolean }[] = [
  { name: "name", label: "Name", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", optional: true },
];

export function ContactForm() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const startedAt = useRef(0);
  const honeypot = useRef<HTMLInputElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const set = (name: ContactField, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
    if (status.kind === "error" || status.kind === "sent") setStatus({ kind: "idle" });
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const payload = { ...values, company: honeypot.current?.value ?? "", startedAt: startedAt.current };
    const check = validateContact(payload);
    if (!check.ok) {
      setErrors(check.fieldErrors);
      const first = Object.keys(check.fieldErrors)[0];
      if (first) document.getElementById(`contact-${first}`)?.focus();
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fieldErrors?: FieldErrors };
      if (res.ok && data.ok) {
        setStatus({ kind: "sent", email: check.data.email });
        setValues(empty);
        setErrors({});
        startedAt.current = Date.now();
        return;
      }
      if (data.fieldErrors) setErrors(data.fieldErrors);
      setStatus({ kind: "error", message: data.error ?? "The message didn't go through." });
    } catch {
      setStatus({ kind: "error", message: "Your connection dropped before the message was sent." });
    }
  }

  const input = (name: ContactField) =>
    cn(
      "w-full rounded-md border bg-ink px-4 py-3 text-paper placeholder:text-dim transition-colors outline-none focus:border-leaf focus-visible:outline-none",
      errors[name] ? "border-red-400" : "border-rule",
    );

  return (
    <form onSubmit={onSubmit} noValidate className="relative rounded-lg border border-slate bg-graphite p-5 sm:p-8">
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company
          <input ref={honeypot} name="company" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f.name} className={f.name === "phone" ? "sm:col-span-2" : undefined}>
            <label htmlFor={`contact-${f.name}`} className="mb-2 block text-sm font-semibold text-paper">
              {f.label}
              {f.optional ? <span className="font-normal text-dim"> (optional)</span> : null}
            </label>
            <input
              id={`contact-${f.name}`}
              name={f.name}
              type={f.type ?? "text"}
              autoComplete={f.autoComplete}
              value={values[f.name]}
              onChange={(e) => set(f.name, e.target.value)}
              aria-invalid={errors[f.name] ? true : undefined}
              aria-describedby={errors[f.name] ? `contact-${f.name}-error` : undefined}
              className={input(f.name)}
            />
            {errors[f.name] ? (
              <p id={`contact-${f.name}-error`} className="mt-2 text-sm text-red-300">
                {errors[f.name]}
              </p>
            ) : null}
          </div>
        ))}

        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className="mb-2 block text-sm font-semibold text-paper">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={6}
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            className={cn(input("message"), "resize-y")}
          />
          {errors.message ? (
            <p id="contact-message-error" className="mt-2 text-sm text-red-300">
              {errors.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status.kind === "sending"}
          className="inline-flex h-12 min-w-44 items-center justify-center gap-2 rounded-md bg-leaf px-6 font-semibold text-ink transition-[filter] hover:brightness-110 disabled:cursor-progress disabled:opacity-80"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={status.kind}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="inline-flex items-center gap-2"
            >
              {status.kind === "sending" ? (
                <>
                  <LoaderCircle aria-hidden className="size-4 animate-spin" /> Sending…
                </>
              ) : status.kind === "sent" ? (
                <>
                  <Check aria-hidden className="size-4" /> Message sent
                </>
              ) : (
                "Send message"
              )}
            </motion.span>
          </AnimatePresence>
        </button>

        <div aria-live="polite" className="min-h-6 text-sm">
          {status.kind === "sent" ? (
            <p className="text-mist">
              Thanks. A confirmation is on its way to <span className="text-paper">{status.email}</span>, and I&apos;ll reply within 1–2 days.
            </p>
          ) : null}
          {status.kind === "error" ? (
            <p className="flex gap-2 text-red-300">
              <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
              <span>
                {status.message} You can also email{" "}
                <a href={`mailto:${profile.email}`} className="text-paper underline underline-offset-4">
                  {profile.email}
                </a>
                .
              </span>
            </p>
          ) : null}
        </div>
      </div>
    </form>
  );
}
