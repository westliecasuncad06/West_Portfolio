#!/usr/bin/env node
/**
 * Captures Elevate Campus Hub screenshots for the portfolio gallery.
 *
 *   node scripts/capture-campus-hub.mjs            public pages only
 *   node scripts/capture-campus-hub.mjs --roles    public pages + each role in .env.capture
 *
 * Role logins come from .env.capture (gitignored), for example:
 *   CH_SUPER_ADMIN_EMAIL=...   CH_SUPER_ADMIN_PASSWORD=...
 *   CH_CAMPUS_HEAD_EMAIL=...   CH_CAMPUS_HEAD_PASSWORD=...
 *   CH_FACILITATOR_EMAIL=...   CH_FACILITATOR_PASSWORD=...
 *   CH_STUDENT_EMAIL=...       CH_STUDENT_PASSWORD=...
 * Use demo accounts with dummy data and 2FA off. If the login page shows a
 * Cloudflare Turnstile check, the browser opens and you finish signing in yourself.
 *
 * Output: public/work/campus-hub/*.webp, thumbs/, and entries in src/content/media-manifest.json.
 * Review every image for real personal data before committing.
 */
import { chromium } from "@playwright/test";
import sharp from "sharp";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BASE = "https://elevate-campus-hub.vercel.app";
const OUT = join(ROOT, "public/work/campus-hub");
const MANIFEST = join(ROOT, "src/content/media-manifest.json");
const GRAPHITE = { r: 23, g: 22, b: 28, alpha: 1 };

const DESKTOP = { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 };
const PHONE = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true };

/** name -> [path, device] */
const PUBLIC = [
  ["landing", "/", "desktop"],
  ["landing-full", "/", "tall"],
  ["landing-phone", "/", "phone"],
  ["login", "/login", "desktop"],
  ["login-phone", "/login", "phone"],
];

const ROLES = {
  SUPER_ADMIN: [
    ["admin-dashboard", "/admin", "desktop"],
    ["admin-users", "/admin/users", "desktop"],
    ["admin-campuses", "/admin/campuses", "desktop"],
    ["admin-programs", "/admin/programs", "desktop"],
    ["admin-logs", "/admin/logs", "desktop"],
  ],
  CAMPUS_HEAD: [
    ["head-dashboard", "/campus-head", "desktop"],
    ["head-live", "/campus-head/live", "desktop"],
    ["head-attendance", "/campus-head/attendance", "desktop"],
    ["head-reports", "/campus-head/reports", "desktop"],
    ["head-students", "/campus-head/students", "desktop"],
    ["head-facilitators", "/campus-head/facilitators", "desktop"],
    ["head-history", "/campus-head/history", "desktop"],
  ],
  FACILITATOR: [
    ["facilitator-today", "/facilitator", "desktop"],
    ["facilitator-today-phone", "/facilitator", "phone"],
    ["facilitator-students", "/facilitator/students", "desktop"],
    ["facilitator-history", "/facilitator/history", "desktop"],
    ["facilitator-chat-phone", "/facilitator/chat", "phone"],
  ],
  STUDENT: [
    ["student-home-phone", "/student", "phone"],
    ["student-attendance-phone", "/student/attendance", "phone"],
    ["student-home", "/student", "desktop"],
  ],
};

function loadEnv(file) {
  if (!existsSync(file)) return {};
  return Object.fromEntries(
    readFileSync(file, "utf8")
      .split(/\r?\n/)
      .filter((l) => /^\s*[A-Z0-9_]+\s*=/.test(l))
      .map((l) => {
        const i = l.indexOf("=");
        return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, "")];
      }),
  );
}

const manifest = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, "utf8")) : {};
mkdirSync(join(OUT, "thumbs"), { recursive: true });

async function save(name, device, png) {
  const maxW = device === "phone" ? 780 : device === "tall" ? 1440 : 1600;
  const info = await sharp(png).resize({ width: maxW, withoutEnlargement: true }).webp({ quality: 80 }).toFile(join(OUT, `${name}.webp`));
  const thumb = sharp(png);
  if (device === "phone") thumb.resize({ width: 480, height: 300, fit: "contain", background: GRAPHITE });
  else thumb.resize({ width: 480, height: 300, fit: "cover", position: "top" });
  await thumb.webp({ quality: 72 }).toFile(join(OUT, "thumbs", `${name}.webp`));
  manifest[`/work/campus-hub/${name}.webp`] = {
    width: info.width,
    height: info.height,
    thumb: `/work/campus-hub/thumbs/${name}.webp`,
  };
  console.log(`  saved ${name} (${info.width}x${info.height})`);
}

async function shoot(context, list) {
  const page = await context.newPage();
  for (const [name, path, device] of list) {
    const target = device === "phone" ? await context.browser().newContext({ ...PHONE, storageState: await context.storageState() }) : null;
    const p = target ? await target.newPage() : page;
    await p.goto(BASE + path, { waitUntil: "networkidle" }).catch(() => {});
    await p.waitForTimeout(1500);
    if (/\/login/.test(new URL(p.url()).pathname) && path !== "/login") {
      console.log(`  skipped ${name}: redirected to login`);
    } else {
      await save(name, device, await p.screenshot({ fullPage: device === "tall" }));
    }
    if (target) await target.close();
  }
  await page.close();
}

async function signIn(browser, role, env, headed) {
  const email = env[`CH_${role}_EMAIL`];
  const password = env[`CH_${role}_PASSWORD`];
  if (!email || !password) {
    console.log(`- ${role}: no login in .env.capture, skipping`);
    return null;
  }
  const context = await browser.newContext(DESKTOP);
  const page = await context.newPage();
  await page.goto(`${BASE}/login`, { waitUntil: "networkidle" });
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);

  const turnstile = await page.locator("iframe[src*='challenges.cloudflare.com'], .cf-turnstile").count();
  if (turnstile > 0) {
    if (!headed) {
      console.log(`- ${role}: Turnstile is on. Re-run with --headed and finish signing in yourself.`);
      await context.close();
      return null;
    }
    console.log(`- ${role}: complete the Turnstile check and press Sign in in the browser window...`);
  } else {
    await page.getByRole("button", { name: "Sign in" }).click();
  }
  await page.waitForURL((url) => !url.pathname.startsWith("/login"), { timeout: 180_000 });
  await page.close();
  console.log(`- ${role}: signed in`);
  return context;
}

const args = new Set(process.argv.slice(2));
const headed = args.has("--headed");
const browser = await chromium.launch({ headless: !headed });

console.log("- public pages");
await shoot(await browser.newContext(DESKTOP), PUBLIC);

if (args.has("--roles")) {
  const env = loadEnv(join(ROOT, ".env.capture"));
  for (const [role, list] of Object.entries(ROLES)) {
    const context = await signIn(browser, role, env, headed);
    if (context) {
      await shoot(context, list);
      await context.close();
    }
  }
}

await browser.close();
const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(MANIFEST, JSON.stringify(sorted, null, 2) + "\n");
console.log("Done. Review the new images in public/work/campus-hub before committing.");
