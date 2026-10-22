import { describe, expect, it } from "vitest";
import { getMailerConfig } from "@/lib/mailer";

describe("getMailerConfig", () => {
  it("returns null when the Gmail user is missing", () => {
    expect(getMailerConfig({ GMAIL_APP_PASSWORD: "abcd efgh ijkl mnop" })).toBeNull();
  });

  it("returns null when the app password is missing", () => {
    expect(getMailerConfig({ GMAIL_USER: "west@gmail.com" })).toBeNull();
  });

  it("strips the spaces Google shows inside app passwords", () => {
    const config = getMailerConfig({ GMAIL_USER: "west@gmail.com", GMAIL_APP_PASSWORD: "abcd efgh ijkl mnop" });
    expect(config?.pass).toBe("abcdefghijklmnop");
  });

  it("sends to the portfolio inbox when CONTACT_TO_EMAIL is not set", () => {
    const config = getMailerConfig({ GMAIL_USER: "west@gmail.com", GMAIL_APP_PASSWORD: "x" });
    expect(config).toEqual({ user: "west@gmail.com", pass: "x", to: "westliecasuncad06work@gmail.com" });
  });

  it("uses CONTACT_TO_EMAIL when it is set", () => {
    const config = getMailerConfig({
      GMAIL_USER: "west@gmail.com",
      GMAIL_APP_PASSWORD: "x",
      CONTACT_TO_EMAIL: "inbox@example.com",
    });
    expect(config?.to).toBe("inbox@example.com");
  });
});
