# Westlie Casuncad: portfolio

Personal portfolio of Westlie Casuncad, full-stack developer and video editor. Built with Next.js 16, React 19, Tailwind CSS 4 and Motion, and deployed on Vercel.

The design treats the page like an editing timeline. Each section is a clip in the dock at the bottom, a playhead follows the scroll, and a film-leader countdown plays when the page opens.

The previous static HTML version lives on the `v1-static` branch.

## Run it locally

```bash
npm install
cp .env.example .env.local   # then fill in the Gmail values
npm run dev                  # http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm test` | Unit tests (contact API, timeline math, content checks) |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |

## Make the contact form send email

The form posts to `/api/contact`, which sends through Gmail SMTP with Nodemailer. You get the message, and the visitor gets an automatic confirmation.

1. Turn on 2-Step Verification for the Gmail account at https://myaccount.google.com/security.
2. Create an App Password at https://myaccount.google.com/apppasswords and copy the 16 characters.
3. Add these environment variables, both in `.env.local` and in Vercel under Project Settings, then Environment Variables:

| Variable | Value |
|---|---|
| `GMAIL_USER` | The Gmail address that sends the emails |
| `GMAIL_APP_PASSWORD` | The App Password from step 2 |
| `CONTACT_TO_EMAIL` | Optional. Where messages arrive. Defaults to westliecasuncad06@gmail.com |

4. Redeploy on Vercel so the new variables take effect.

Until these are set, the form tells visitors that email isn't configured and shows your address instead.

Spam protection is a hidden honeypot field, a minimum time on the form, and a limit of 5 messages per connection every 10 minutes. The limit is kept in memory, so on Vercel it applies per server instance.

## Deploy on Vercel

1. Go to https://vercel.com/new and import `westliecasuncad06/West_Portfolio`.
2. Keep the detected framework, Next.js, and the default build settings.
3. Add the environment variables above.
4. Deploy. Every push to `main` redeploys automatically.

## Edit the content

All text and data live in `src/content/`, so you don't need to touch the components.

| File | What it holds |
|---|---|
| `profile.ts` | Name, tagline, intro, about text, contact details |
| `projects.ts` | Every project, its screenshots grouped by user role, links and stack |
| `skills.ts` | Skill tracks. Project usage is computed from `projects.ts` |
| `path.ts` | Work and school timeline |
| `certificates.ts` | Certificates. PDFs and thumbnails live in `public/certificates/` |
| `services.ts` | What I do |

When you add a project, also add its slug to `src/content/slugs.ts`. A test checks that the two lists match.

Screenshots live in `public/work/<project>/` as WebP, with 480×300 thumbnails in `thumbs/`. Their sizes are recorded in `src/content/media-manifest.json`.

## Capture Campus Hub screenshots

`scripts/capture-campus-hub.mjs` signs in to https://elevate-campus-hub.vercel.app with demo accounts and saves screenshots for each role straight into the gallery.

1. Create `.env.capture` in the project root. It's gitignored. Use demo accounts with dummy data and 2FA off.

```bash
CH_SUPER_ADMIN_EMAIL=...
CH_SUPER_ADMIN_PASSWORD=...
CH_CAMPUS_HEAD_EMAIL=...
CH_CAMPUS_HEAD_PASSWORD=...
CH_FACILITATOR_EMAIL=...
CH_FACILITATOR_PASSWORD=...
CH_STUDENT_EMAIL=...
CH_STUDENT_PASSWORD=...
```

2. Run the capture. Add `--headed` if the login page shows a Cloudflare check, so you can finish signing in yourself.

```bash
node scripts/capture-campus-hub.mjs --roles
```

3. Look through the new images in `public/work/campus-hub/` for real personal data before committing. Role tabs appear on the site automatically once their screenshots exist.
