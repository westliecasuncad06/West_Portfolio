import { validateContact } from "@/lib/contact-schema";
import {
  buildAutoReply,
  buildOwnerEmail,
  createGmailTransport,
  getMailerConfig,
  type MailerConfig,
  type MailTransport,
} from "@/lib/mailer";
import { createRateLimiter, type RateLimiter } from "@/lib/rate-limit";

/** Submissions faster than this after the form rendered are treated as bots. */
const MIN_FILL_MS = 3_000;

type Deps = {
  getConfig: () => MailerConfig | null;
  createTransport: (config: MailerConfig) => MailTransport;
  limiter: RateLimiter;
  now: () => number;
  logError: (message: string, error?: unknown) => void;
};

const json = (status: number, body: unknown, headers?: Record<string, string>) =>
  Response.json(body, { status, headers });

const clientIp = (request: Request) =>
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
  request.headers.get("x-real-ip")?.trim() ||
  "unknown";

export function createContactHandler(deps?: Partial<Deps>) {
  const d: Deps = {
    getConfig: () => getMailerConfig(),
    createTransport: createGmailTransport,
    limiter: createRateLimiter({ limit: 5, windowMs: 10 * 60_000 }),
    now: Date.now,
    logError: (message, error) => console.error(`[contact] ${message}`, error),
    ...deps,
  };

  return async function handleContact(request: Request): Promise<Response> {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return json(400, { ok: false, error: "Send the form as JSON." });
    }

    const result = validateContact(body);
    if (!result.ok) {
      return json(400, { ok: false, error: "Check the highlighted fields.", fieldErrors: result.fieldErrors });
    }
    const input = result.data;
    const now = d.now();

    // Spam: answer like a success so bots learn nothing.
    if (input.company !== "" || now - input.startedAt < MIN_FILL_MS) {
      return json(200, { ok: true });
    }

    const config = d.getConfig();
    if (!config) {
      d.logError("GMAIL_USER or GMAIL_APP_PASSWORD is missing");
      return json(500, {
        ok: false,
        error: "Email isn't configured on the server yet. Email me directly instead.",
      });
    }

    const limit = d.limiter.hit(clientIp(request), now);
    if (!limit.ok) {
      const minutes = Math.ceil(limit.retryAfterSeconds / 60);
      return json(
        429,
        { ok: false, error: `Too many messages from this connection. Try again in ${minutes} min.` },
        { "Retry-After": String(limit.retryAfterSeconds) },
      );
    }

    const transport = d.createTransport(config);
    try {
      await transport.sendMail(buildOwnerEmail(input, config));
    } catch (error) {
      d.logError("owner email failed", error);
      return json(502, {
        ok: false,
        error: "The email service didn't accept the message. Try again, or email me directly.",
      });
    }

    try {
      await transport.sendMail(buildAutoReply(input, config));
    } catch (error) {
      // The owner already has the message, so the visitor still sees success.
      d.logError("auto-reply failed", error);
    }

    return json(200, { ok: true });
  };
}
