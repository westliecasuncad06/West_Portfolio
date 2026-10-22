import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";
import { getProject, projects, visibleGalleries } from "@/content/projects";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { TimelineDock } from "@/components/timeline/TimelineDock";
import { ButtonLink } from "@/components/ui/Button";
import { ScreenViewer } from "@/components/work/ScreenViewer";
import { GalleryGrid } from "@/components/work/GalleryGrid";
import { SkillIcon } from "@/components/sections/SkillIcon";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: `${project.tagline} ${project.summary}`.slice(0, 300),
    openGraph: { title: `${project.name}: ${project.tagline}` },
  };
}

const sectionCls = "shell scroll-mt-24 py-16 lg:py-24";

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const galleries = visibleGalleries(project);
  const shotCount = galleries.reduce((n, g) => n + g.shots.length, 0);
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const primary = project.links.primary;
  const domain = primary && !primary.download && !primary.href.includes("github.com") ? new URL(primary.href).host.replace(/^www\./, "") : undefined;

  const facts = [
    ["Client", project.client],
    ["Year", project.year],
    ["My role", project.myRole],
    ["Status", project.status],
  ].filter((f): f is [string, string] => Boolean(f[1]));

  return (
    <>
      <SiteHeader base="/" />
      <main id="main" className="pt-16">
        <section id="overview" data-clip="Overview" aria-labelledby="case-title" className={sectionCls}>
          <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-dim transition-colors hover:text-paper">
            <ArrowLeft aria-hidden className="size-4" />
            All work
          </Link>
          <p className="mt-10 text-dim">{project.kind}</p>
          <h1 id="case-title" className="type-title mt-3 max-w-4xl text-6xl sm:text-7xl lg:text-8xl">
            {project.name}
          </h1>
          <p className="mt-6 max-w-[34ch] text-2xl leading-snug font-semibold text-paper sm:text-3xl">{project.tagline}</p>

          <dl className="mt-10 grid max-w-4xl grid-cols-2 gap-6 border-t border-slate pt-6 sm:grid-cols-4">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt className="text-sm text-dim">{k}</dt>
                <dd className="mt-1 text-paper">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            {primary ? (
              <ButtonLink
                href={primary.href}
                download={primary.download ? "" : undefined}
                icon={primary.download ? <Download aria-hidden className="size-4" /> : <ExternalLink aria-hidden className="size-4" />}
              >
                {primary.label}
              </ButtonLink>
            ) : null}
            <ButtonLink href="#gallery" variant="outline">
              {`See all ${shotCount} screenshots`}
            </ButtonLink>
            {project.links.secondary ? (
              <ButtonLink href={project.links.secondary.href} variant="quiet" className="self-center text-sm sm:ml-2">
                {project.links.secondary.label}
              </ButtonLink>
            ) : null}
          </div>

          <div className="mt-14">
            <ScreenViewer title={project.name} domain={domain} galleries={galleries} />
          </div>
        </section>

        <section id="details" data-clip="Details" aria-label="Project details" className={`${sectionCls} border-t border-slate`}>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <h2 className="type-title text-4xl sm:text-5xl">What it solves</h2>
              <p className="mt-5 max-w-[62ch] text-mist">{project.problem}</p>
              <p className="mt-4 max-w-[62ch] text-mist">{project.summary}</p>

              <h2 className="type-title mt-14 text-4xl sm:text-5xl">What it does</h2>
              <ul className="mt-6 grid max-w-[62ch] gap-3 text-mist">
                {project.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span aria-hidden className="mt-[0.75em] h-[2px] w-3 shrink-0 bg-leaf" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5">
              <h2 className="type-title text-3xl sm:text-4xl">Who uses it</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.roles.map((r) => (
                  <li key={r} className="rounded-[3px] border border-slate bg-graphite px-3 py-1.5 text-sm text-paper">
                    {r}
                  </li>
                ))}
              </ul>

              <h2 className="type-title mt-12 text-3xl sm:text-4xl">Built with</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((t) => (
                  <li key={t} className="flex items-center gap-2 rounded-[3px] border border-slate px-3 py-1.5 text-sm text-mist">
                    <SkillIcon name={t} className="size-3.5" />
                    {t}
                  </li>
                ))}
              </ul>

              {project.highlights ? (
                <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-slate pt-6">
                  {project.highlights.map((h) => (
                    <div key={h.label}>
                      <dt className="sr-only">{h.label}</dt>
                      <dd className="type-title text-2xl text-paper sm:text-3xl">{h.value}</dd>
                      <dd className="mt-1 text-sm leading-snug text-dim">{h.label}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </div>
          </div>
        </section>

        <section id="gallery" data-clip="Gallery" aria-labelledby="gallery-title" className={`${sectionCls} border-t border-slate`}>
          <h2 id="gallery-title" className="type-title text-5xl sm:text-6xl">
            Every screen, by user
          </h2>
          <p className="mt-4 max-w-[60ch] text-mist">Open any screenshot to see it full size. Use the arrow keys to step through.</p>
          <div className="mt-14 grid gap-16">
            {galleries.map((g) => (
              <div key={g.role}>
                <div className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="text-2xl font-semibold">{g.role}</h3>
                  <span className="type-tabular text-sm text-dim">
                    {g.shots.length} {g.shots.length === 1 ? "screen" : "screens"}
                  </span>
                  {g.blurb ? <p className="w-full text-mist">{g.blurb}</p> : null}
                </div>
                <GalleryGrid title={`${project.name}, ${g.role}`} shots={g.shots} />
              </div>
            ))}
          </div>
        </section>

        <section id="next" data-clip="Next" aria-label="Next project" className={`${sectionCls} border-t border-slate`}>
          <Link href={`/work/${next.slug}`} className="group block">
            <span className="text-sm text-dim">Next project</span>
            <span className="type-title mt-3 block text-5xl text-paper transition-colors group-hover:text-leaf sm:text-7xl">{next.name}</span>
            <span className="mt-3 block max-w-[50ch] text-mist">{next.tagline}</span>
          </Link>
        </section>
      </main>
      <Footer base="/" />
      <TimelineDock />
    </>
  );
}
