import { projects } from "./projects";

export type Skill = {
  name: string;
  /** Shown when the skill isn't tied to a project in this portfolio. */
  note?: string;
};

export type Track = { id: string; label: string; summary: string; skills: Skill[] };

const s = (name: string, note?: string): Skill => ({ name, note });

/** Every language and tool used across the projects, grouped like tracks in an editing timeline. */
export const tracks: Track[] = [
  {
    id: "V1",
    label: "Languages",
    summary: "What the code is written in.",
    skills: [s("TypeScript"), s("JavaScript"), s("PHP"), s("Python"), s("SQL"), s("Dart"), s("HTML"), s("CSS")],
  },
  {
    id: "V2",
    label: "Frontend",
    summary: "Interfaces people click, tap and scan. More than 2 years.",
    skills: [
      s("Next.js"),
      s("React"),
      s("Tailwind CSS"),
      s("shadcn/ui"),
      s("Radix UI"),
      s("Base UI"),
      s("TanStack Query"),
      s("React Hook Form"),
      s("Zod"),
      s("Motion", "Also animates this site"),
      s("GSAP"),
      s("Recharts"),
      s("Bootstrap"),
      s("AJAX"),
    ],
  },
  {
    id: "V3",
    label: "Backend and data",
    summary: "APIs, databases, auth and real-time sync. More than 2 years.",
    skills: [
      s("Laravel"),
      s("Laravel Sanctum"),
      s("REST APIs"),
      s("Supabase"),
      s("PostgreSQL"),
      s("MySQL"),
      s("Firebase"),
      s("FastAPI"),
      s("Pusher"),
      s("Google Apps Script"),
    ],
  },
  {
    id: "V4",
    label: "Machine learning",
    summary: "Forecasts that give staff an early warning.",
    skills: [s("scikit-learn"), s("XGBoost")],
  },
  {
    id: "V5",
    label: "Mobile",
    summary: "Apps that live on a phone.",
    skills: [s("Flutter")],
  },
  {
    id: "V6",
    label: "Testing and quality",
    summary: "How I know it still works tomorrow.",
    skills: [
      s("Vitest"),
      s("Testing Library"),
      s("Playwright"),
      s("PHPUnit"),
      s("Larastan"),
      s("Pint"),
      s("pytest"),
      s("Ruff"),
      s("mypy"),
      s("ESLint"),
    ],
  },
  {
    id: "V7",
    label: "Deploy and tools",
    summary: "Getting it online and keeping it there.",
    skills: [
      s("Vercel"),
      s("Git", "Every project"),
      s("GitHub", "Every project"),
      s("InfinityFree"),
      s("WordPress", "Udemy certificate"),
    ],
  },
  {
    id: "V8",
    label: "AI-assisted development",
    summary: "I work with AI coding agents to ship faster, and I review and test every change myself.",
    skills: [
      s("Claude Code"),
      s("Superpowers workflows", "Plan, test first, then build"),
      s("Playwright MCP", "AI-driven browser checks"),
      s("Spec-driven development", "Specs before code"),
    ],
  },
  {
    id: "V9",
    label: "Video editing",
    summary: "Church and event videos, cut to the beat. More than 5 years.",
    skills: [
      s("Premiere Pro", "Church and event videos"),
      s("After Effects", "Motion graphics"),
      s("Filmora", "Quick-turnaround edits"),
    ],
  },
];

/** Names of the portfolio projects that used a skill. */
export const usedIn = (skill: string) => projects.filter((p) => p.stack.includes(skill)).map((p) => p.name);
