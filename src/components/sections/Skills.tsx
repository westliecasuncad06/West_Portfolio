import { tracks, usedIn } from "@/content/skills";
import { Section } from "@/components/ui/Section";
import { SkillTracks, type TrackData } from "./SkillTracks";

export function Skills() {
  const data: TrackData[] = tracks.map((t) => ({
    ...t,
    skills: t.skills.map((s) => ({ ...s, usedIn: usedIn(s.name) })),
  }));

  return (
    <Section
      id="skills"
      clip="Skills"
      title="Skills"
      intro="Every language and tool from the projects above, laid out like tracks in an edit. Wider clips were used in more projects. Select a clip to see where."
    >
      <SkillTracks tracks={data} />
    </Section>
  );
}
