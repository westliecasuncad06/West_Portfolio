import { Download, ExternalLink } from "lucide-react";
import { visibleGalleries, type Project } from "@/content/projects";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { ScreenViewer } from "./ScreenViewer";

const domainOf = (project: Project) => {
  const href = project.links.primary?.href;
  if (!href || project.links.primary?.download || href.includes("github.com")) return undefined;
  return new URL(href).host.replace(/^www\./, "");
};

function Actions({ project }: { project: Project }) {
  const { primary, secondary } = project.links;
  return (
    <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-4">
      {primary ? (
        <ButtonLink
          href={primary.href}
          variant="primary"
          download={primary.download ? "" : undefined}
          icon={primary.download ? <Download aria-hidden className="size-4" /> : <ExternalLink aria-hidden className="size-4" />}
        >
          {primary.label}
        </ButtonLink>
      ) : null}
      <ButtonLink href={`/work/${project.slug}`} variant="outline">
        Read the case study
      </ButtonLink>
      {secondary ? (
        <ButtonLink href={secondary.href} variant="quiet" className="text-sm sm:ml-2">
          {secondary.label}
        </ButtonLink>
      ) : null}
    </div>
  );
}

function Highlights({ project }: { project: Project }) {
  if (!project.highlights) return null;
  return (
    <dl className="mt-7 grid grid-cols-3 gap-4 border-t border-slate pt-5">
      {project.highlights.map((h) => (
        <div key={h.label}>
          <dt className="sr-only">{h.label}</dt>
          <dd className="type-title text-2xl text-paper sm:text-3xl">{h.value}</dd>
          <dd className="mt-1 text-sm leading-snug text-dim">{h.label}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Featured projects get the full width for their role-by-role screens; the rest sit beside their text. */
export function ProjectFeature({ project }: { project: Project }) {
  const galleries = visibleGalleries(project);
  const meta = [project.kind, project.client, project.year].filter(Boolean).join(", ");

  if (project.featured) {
    return (
      <article id={`project-${project.slug}`} aria-labelledby={`${project.slug}-name`} className="min-w-0 scroll-mt-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="min-w-0 lg:col-span-5">
            <p className="text-sm text-dim">{meta}</p>
            <h3 id={`${project.slug}-name`} className="type-title mt-3 text-5xl sm:text-6xl">
              {project.name}
            </h3>
            <p className="mt-5 text-xl leading-snug font-semibold text-paper sm:text-2xl">{project.tagline}</p>
          </div>
          <div className="min-w-0 lg:col-span-7 lg:pt-8">
            <p className="text-mist">{project.summary}</p>
            <Highlights project={project} />
            <Actions project={project} />
          </div>
        </div>
        <div className="mt-10 min-w-0">
          <ScreenViewer title={project.name} domain={domainOf(project)} galleries={galleries} limit={10} />
        </div>
      </article>
    );
  }

  return (
    <article id={`project-${project.slug}`} aria-labelledby={`${project.slug}-name`} className="grid min-w-0 scroll-mt-24 grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
      <div className={cn("min-w-0 lg:col-span-5")}>
        <p className="text-sm text-dim">{meta}</p>
        <h3 id={`${project.slug}-name`} className="type-title mt-3 text-4xl sm:text-5xl">
          {project.name}
        </h3>
        <p className="mt-4 text-lg leading-snug font-semibold text-paper">{project.tagline}</p>
        <p className="mt-4 text-mist">{project.summary}</p>
        <Highlights project={project} />
        <Actions project={project} />
      </div>
      <div className="min-w-0 lg:col-span-7">
        <ScreenViewer title={project.name} domain={domainOf(project)} galleries={galleries} />
      </div>
    </article>
  );
}
