import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  id: string;
  /** Name shown on this section's clip in the timeline dock. */
  clip: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Section({ id, clip, title, intro, children, className }: Props) {
  return (
    <section id={id} data-clip={clip} aria-labelledby={`${id}-title`} className={cn("relative py-24 lg:py-32", className)}>
      <div className="shell">
        {/* An in-point marker: where this clip starts. */}
        <div aria-hidden className="mb-10 flex items-center">
          <span className="h-4 w-[3px] rounded-full bg-leaf" />
          <span className="h-px flex-1 bg-rule" />
        </div>
        <header className="mb-12 max-w-3xl lg:mb-16">
          <h2 id={`${id}-title`} className="type-title text-[3.25rem] sm:text-7xl lg:text-[5.5rem]">
            {title}
          </h2>
          {intro ? <div className="mt-5 max-w-[62ch] text-lg text-mist">{intro}</div> : null}
        </header>
        {children}
      </div>
    </section>
  );
}
