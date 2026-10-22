import { describe, expect, it } from "vitest";
import { validateContact } from "@/lib/contact-schema";

const valid = {
  name: "Maria Santos",
  email: "maria@example.com",
  phone: "",
  message: "Hi Westlie, I'd like a website for my bakery.",
  company: "",
  startedAt: 1_700_000_000_000,
};

describe("validateContact", () => {
  it("accepts a complete submission and trims whitespace", () => {
    const result = validateContact({ ...valid, name: "  Maria Santos  ", email: " maria@example.com " });
    expect(result).toEqual({
      ok: true,
      data: { ...valid, name: "Maria Santos", email: "maria@example.com" },
    });
  });

  it("accepts a phone number with +, spaces, dashes and parentheses", () => {
    const result = validateContact({ ...valid, phone: "+63 (961) 582-0084" });
    expect(result.ok).toBe(true);
  });

  it.each([
    ["name too short", { name: "M" }, "name"],
    ["name containing a line break", { name: "Maria\nBcc: spam@example.com" }, "name"],
    ["invalid email", { email: "maria-at-example" }, "email"],
    ["phone with letters", { phone: "call me maybe" }, "phone"],
    ["message too short", { message: "hi" }, "message"],
    ["message too long", { message: "a".repeat(2001) }, "message"],
  ])("rejects %s", (_label, patch, field) => {
    const result = validateContact({ ...valid, ...patch });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(Object.keys(result.fieldErrors)).toEqual([field]);
      expect(result.fieldErrors[field as keyof typeof result.fieldErrors]).toMatch(/\w/);
    }
  });

  it("rejects a payload that is not an object", () => {
    expect(validateContact("name=Maria").ok).toBe(false);
  });
});
