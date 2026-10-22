import { path } from "@/content/path";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";

/** Work and school in one timeline, newest first. */
export function Path() {
  return (
    <Section id="path" clip="Path" title="Path" intro="Where I've worked and studied, newest first.">
      <ol className="relative max-w-4xl">
        {path.map((entry, i) => (
          <li key={`${entry.place}-${entry.title}`} className="relative grid gap-1 pb-10 pl-8 sm:grid-cols-[11rem_1fr] sm:gap-8 sm:pl-0">
            <span aria-hidden className="absolute top-2 left-[5px] h-full w-px bg-slate sm:left-[11.75rem]" style={i === path.length - 1 ? { height: "0.75rem" } : undefined} />
            <span
              aria-hidden
              className={cn(
                "absolute top-[0.45rem] left-0 size-[11px] rounded-full border-2 sm:left-[calc(11.75rem-5px)]",
                entry.kind === "work" ? "border-leaf bg-leaf" : "border-mist bg-ink",
              )}
            />
            <p className="type-tabular text-sm text-dim sm:pt-1 sm:text-right sm:pr-4">{entry.dates}</p>
            <div className="sm:pl-6">
              <h3 className="text-xl font-semibold">{entry.place}</h3>
              <p className="text-mist">
                {entry.title}
                <span className="text-dim"> / {entry.kind === "work" ? "Work" : "School"}</span>
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
