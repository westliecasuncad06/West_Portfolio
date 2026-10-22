import nodemailer from "nodemailer";
import type { ContactInput } from "@/lib/contact-schema";

export const DEFAULT_CONTACT_TO = "westliecasuncad06work@gmail.com";

export type MailerConfig = { user: string; pass: string; to: string };

export type MailMessage = {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
};

export type MailTransport = { sendMail(message: MailMessage): Promise<unknown> };

type Env = Record<string, string | undefined>;

/** Reads Gmail SMTP settings. Returns null when email isn't configured. */
export function getMailerConfig(env: Env = process.env): MailerConfig | null {
  const user = env.GMAIL_USER?.trim();
  const pass = env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");
  if (!user || !pass) return null;
  return { user, pass, to: env.CONTACT_TO_EMAIL?.trim() || DEFAULT_CONTACT_TO };
}

export function createGmailTransport(config: MailerConfig): MailTransport {
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user: config.user, pass: config.pass },
  });
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const paragraphs = (value: string) => escapeHtml(value).replace(/\n/g, "<br />");

const wrap = (body: string) =>
  `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#17161C;max-width:560px">${body}</div>`;

export function buildOwnerEmail(input: ContactInput, config: MailerConfig): MailMessage {
  const phoneLine = input.phone ? `Phone: ${input.phone}\n` : "";
  return {
    from: `Portfolio contact form <${config.user}>`,
    to: config.to,
    replyTo: input.email,
    subject: `Portfolio message from ${input.name}`,
    text: `From: ${input.name} <${input.email}>\n${phoneLine}\n${input.message}\n`,
    html: wrap(
      `<p><strong>${escapeHtml(input.name)}</strong> &lt;${escapeHtml(input.email)}&gt;` +
        (input.phone ? `<br />Phone: ${escapeHtml(input.phone)}` : "") +
        `</p><p>${paragraphs(input.message)}</p>` +
        `<p style="color:#5f5e6b;font-size:13px">Reply to this email to answer ${escapeHtml(input.name)} directly.</p>`,
    ),
  };
}

export function buildAutoReply(input: ContactInput, config: MailerConfig): MailMessage {
  const first = input.name.split(/\s+/)[0];
  return {
    from: `Westlie Casuncad <${config.user}>`,
    to: input.email,
    replyTo: config.to,
    subject: "Thanks, I got your message",
    text:
      `Hi ${first},\n\nThanks for reaching out. I got your message and will reply within 1–2 days.\n\n` +
      `Westlie Casuncad\n\n---\nYour message:\n${input.message}\n`,
    html: wrap(
      `<p>Hi ${escapeHtml(first)},</p>` +
        `<p>Thanks for reaching out. I got your message and will reply within 1–2 days.</p>` +
        `<p>Westlie Casuncad</p>` +
        `<hr style="border:none;border-top:1px solid #dddde2" />` +
        `<p style="color:#5f5e6b;font-size:13px">Your message:<br />${paragraphs(input.message)}</p>`,
    ),
  };
}
