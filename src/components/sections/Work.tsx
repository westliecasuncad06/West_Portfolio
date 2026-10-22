import { projects } from "@/content/projects";
import { Section } from "@/components/ui/Section";
import { ProjectFeature } from "@/components/work/ProjectFeature";

export function Work() {
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);

  return (
    <Section
      id="work"
      clip="Work"
      title="Work"
      intro="Systems real people log into every day. Pick a role to see the screens that person uses."
    >
      <div className="grid grid-cols-1 gap-28 lg:gap-36">
        {featured.map((p) => (
          <ProjectFeature key={p.slug} project={p} />
        ))}
      </div>

      <div className="mt-32 lg:mt-40">
        <h3 className="type-title text-4xl text-paper sm:text-5xl">More work</h3>
        <p className="mt-3 max-w-[60ch] text-mist">Side builds and earlier work, from a stage timer for live events to my first e-commerce sites.</p>
        <div className="mt-14 grid grid-cols-1 gap-24 lg:gap-28">
          {more.map((p) => (
            <ProjectFeature key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </Section>
  );
}
