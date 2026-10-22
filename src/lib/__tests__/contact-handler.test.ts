import { describe, expect, it, vi } from "vitest";
import { createContactHandler } from "@/lib/contact-handler";
import { createRateLimiter } from "@/lib/rate-limit";
import type { MailerConfig, MailMessage, MailTransport } from "@/lib/mailer";

const NOW = 1_700_000_100_000;
const config: MailerConfig = { user: "sender@gmail.com", pass: "secret", to: "inbox@example.com" };

const validBody = {
  name: "Maria Santos",
  email: "maria@example.com",
  phone: "",
  message: "Hi Westlie, I'd like a website for my bakery.",
  company: "",
  startedAt: NOW - 20_000,
};

/** Fake SMTP transport that records every message it is asked to send. */
function fakeTransport(failOn: "none" | "owner" | "autoreply" = "none") {
  const sent: MailMessage[] = [];
  const transport: MailTransport = {
    sendMail: vi.fn(async (msg: MailMessage) => {
      const isOwner = sent.length === 0;
      sent.push(msg);
      if ((failOn === "owner" && isOwner) || (failOn === "autoreply" && !isOwner)) {
        throw new Error("SMTP 535 Authentication failed");
      }
    }),
  };
  return { transport, sent };
}

function setup(opts: { failOn?: "none" | "owner" | "autoreply"; config?: MailerConfig | null; now?: () => number } = {}) {
  const { transport, sent } = fakeTransport(opts.failOn);
  const handler = createContactHandler({
    getConfig: () => (opts.config === undefined ? config : opts.config),
    createTransport: () => transport,
    limiter: createRateLimiter({ limit: 5, windowMs: 10 * 60_000 }),
    now: opts.now ?? (() => NOW),
    logError: () => {},
  });
  return { handler, sent };
}

function post(body: unknown, ip = "203.0.113.7") {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": `${ip}, 10.0.0.1` },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("contact handler", () => {
  it("emails the owner, then sends the visitor an auto-reply", async () => {
    const { handler, sent } = setup();
    const res = await handler(post(validBody));

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(sent).toHaveLength(2);
    expect(sent[0]).toMatchObject({ to: "inbox@example.com", replyTo: "maria@example.com" });
    expect(sent[0].subject).toContain("Maria Santos");
    expect(sent[0].text).toContain("I'd like a website for my bakery.");
    expect(sent[1]).toMatchObject({ to: "maria@example.com" });
    expect(sent[1].text).toContain("Maria");
  });

  it("escapes HTML from the visitor in the owner email", async () => {
    const { handler, sent } = setup();
    await handler(post({ ...validBody, message: "<script>alert('x')</script> please reply" }));

    expect(sent[0].html).not.toContain("<script>");
    expect(sent[0].html).toContain("&lt;script&gt;");
  });

  it("returns field errors and sends nothing when fields are invalid", async () => {
    const { handler, sent } = setup();
    const res = await handler(post({ ...validBody, email: "nope", message: "hi" }));

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.ok).toBe(false);
    expect(Object.keys(json.fieldErrors).sort()).toEqual(["email", "message"]);
    expect(sent).toHaveLength(0);
  });

  it("rejects a body that is not JSON", async () => {
    const { handler, sent } = setup();
    const res = await handler(post("name=Maria&email=maria@example.com"));

    expect(res.status).toBe(400);
    expect(sent).toHaveLength(0);
  });

  it("pretends to succeed but sends nothing when the honeypot is filled", async () => {
    const { handler, sent } = setup();
    const res = await handler(post({ ...validBody, company: "Spam Inc" }));

    expect(res.status).toBe(200);
    expect(sent).toHaveLength(0);
  });

  it("pretends to succeed but sends nothing when the form was submitted within 3 seconds", async () => {
    const { handler, sent } = setup();
    const res = await handler(post({ ...validBody, startedAt: NOW - 2_000 }));

    expect(res.status).toBe(200);
    expect(sent).toHaveLength(0);
  });

  it("returns 500 and sends nothing when email is not configured", async () => {
    const { handler, sent } = setup({ config: null });
    const res = await handler(post(validBody));

    expect(res.status).toBe(500);
    expect((await res.json()).error).toMatch(/configured/i);
    expect(sent).toHaveLength(0);
  });

  it("blocks the sixth message from one IP within ten minutes", async () => {
    const { handler, sent } = setup();
    for (let i = 0; i < 5; i++) {
      expect((await handler(post(validBody))).status).toBe(200);
    }
    const sixth = await handler(post(validBody));

    expect(sixth.status).toBe(429);
    expect(Number(sixth.headers.get("retry-after"))).toBeGreaterThan(0);
    expect(sent).toHaveLength(10);
  });

  it("still accepts messages from a different IP when one IP is blocked", async () => {
    const { handler } = setup();
    for (let i = 0; i < 6; i++) await handler(post(validBody, "203.0.113.7"));

    expect((await handler(post(validBody, "198.51.100.4"))).status).toBe(200);
  });

  it("accepts the same IP again once the ten-minute window has passed", async () => {
    let now = NOW;
    const { handler } = setup({ now: () => now });
    for (let i = 0; i < 6; i++) await handler(post(validBody));

    now = NOW + 10 * 60_000 + 1;
    expect((await handler(post({ ...validBody, startedAt: now - 20_000 }))).status).toBe(200);
  });

  it("returns 502 when the owner email cannot be sent", async () => {
    const { handler } = setup({ failOn: "owner" });
    const res = await handler(post(validBody));

    expect(res.status).toBe(502);
    expect((await res.json()).ok).toBe(false);
  });

  it("still succeeds when only the auto-reply fails", async () => {
    const { handler } = setup({ failOn: "autoreply" });
    const res = await handler(post(validBody));

    expect(res.status).toBe(200);
  });
});
