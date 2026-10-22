import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { projects } from "@/content/projects";
import { tracks } from "@/content/skills";
import { certificates } from "@/content/certificates";
import { projectSlugs } from "@/content/slugs";

const publicFile = (src: string) => join(process.cwd(), "public", src);
const skillNames = new Set(tracks.flatMap((t) => t.skills.map((s) => s.name)));

describe("portfolio content", () => {
  it.each(projects.map((p) => [p.name, p.stack] as const))("%s lists only skills that the Skills section shows", (_name, stack) => {
    expect(stack.filter((tech) => !skillNames.has(tech))).toEqual([]);
  });

  it.each(projects.map((p) => [p.name, p] as const))("%s has at least one screenshot on disk", (_name, project) => {
    const shots = project.galleries.flatMap((g) => g.shots);
    expect(shots.length).toBeGreaterThan(0);
    for (const s of shots) {
      expect(existsSync(publicFile(s.src)), s.src).toBe(true);
      expect(existsSync(publicFile(s.thumb)), s.thumb).toBe(true);
    }
  });

  it("has a unique slug for every project", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("lets the proxy through to every project page and no others", () => {
    expect([...projectSlugs].sort()).toEqual(projects.map((p) => p.slug).sort());
  });

  it.each(certificates.map((c) => [c.title, c] as const))("%s has its PDF and thumbnail on disk", (_title, cert) => {
    expect(existsSync(publicFile(cert.pdf))).toBe(true);
    expect(existsSync(publicFile(cert.thumb))).toBe(true);
  });
});
