import { z } from "zod";

/** Shared by the contact form (inline errors) and the API route (trust boundary). */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your name, at least 2 characters.")
    .max(80, "Keep your name under 80 characters.")
    .regex(/^[^\r\n]*$/, "Your name can't contain line breaks."),
  email: z.string().trim().max(254, "That email address is too long.").pipe(z.email("Enter a valid email address.")),
  phone: z
    .string()
    .trim()
    .max(30, "Keep the phone number under 30 characters.")
    .regex(/^[+()\d\s-]*$/, "Use digits, spaces, +, - or parentheses."),
  message: z
    .string()
    .trim()
    .min(10, "Write at least 10 characters so I know how to help.")
    .max(2000, "Keep the message under 2,000 characters."),
  /** Honeypot. Hidden from people; bots tend to fill it. */
  company: z.string(),
  /** Epoch ms when the form was first rendered. */
  startedAt: z.number().int().nonnegative(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = "name" | "email" | "phone" | "message";
export type FieldErrors = Partial<Record<ContactField, string>>;

export type ValidationResult = { ok: true; data: ContactInput } | { ok: false; fieldErrors: FieldErrors };

export function validateContact(input: unknown): ValidationResult {
  const parsed = contactSchema.safeParse(input);
  if (parsed.success) return { ok: true, data: parsed.data };

  const flat = z.flattenError(parsed.error).fieldErrors as Record<string, string[] | undefined>;
  const fieldErrors: FieldErrors = {};
  for (const field of ["name", "email", "phone", "message"] as const) {
    const first = flat[field]?.[0];
    if (first) fieldErrors[field] = first;
  }
  return { ok: false, fieldErrors };
}
