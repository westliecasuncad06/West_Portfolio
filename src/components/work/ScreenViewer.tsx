"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useId, useRef, useState, type KeyboardEvent } from "react";
import type { RoleGallery } from "@/content/projects";
import { cn } from "@/lib/cn";
import { DeviceFrame } from "./DeviceFrame";
import { Lightbox } from "./Lightbox";

type Props = {
  title: string;
  domain?: string;
  galleries: RoleGallery[];
  /** Cap on screenshots per role shown here; the case study shows them all. */
  limit?: number;
};

/**
 * Role tabs over a framed screen, with a filmstrip of every shot for that role.
 * The screen wipes in like a cut the first time it scrolls into view.
 */
export function ScreenViewer({ title, domain, galleries, limit }: Props) {
  const [role, setRole] = useState(0);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const tabsId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const gallery = galleries[role];
  const shots = limit ? gallery.shots.slice(0, limit) : gallery.shots;
  const shot = shots[index] ?? shots[0];
  const count = shots.length;

  const selectRole = (i: number) => {
    setRole(i);
    setIndex(0);
  };
  const step = useCallback((d: number) => setIndex((i) => (i + d + count) % count), [count]);

  const onTabKey = (e: KeyboardEvent) => {
    const last = galleries.length - 1;
    let next = role;
    if (e.key === "ArrowRight") next = role === last ? 0 : role + 1;
    else if (e.key === "ArrowLeft") next = role === 0 ? last : role - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    selectRole(next);
    tabRefs.current[next]?.focus();
  };

  if (!shot) return null;

  return (
    <div>
      {galleries.length > 1 ? (
        <div
          role="tablist"
          aria-label={`${title} user roles`}
          onKeyDown={onTabKey}
          data-lenis-prevent
          className="-mx-1 mb-4 flex gap-1 overflow-x-auto px-1 pb-1 max-lg:pr-10 max-lg:[mask-image:linear-gradient(to_right,#000_85%,transparent)]"
        >
          {galleries.map((g, i) => (
            <button
              key={g.role}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              type="button"
              id={`${tabsId}-tab-${i}`}
              aria-selected={i === role}
              aria-controls={`${tabsId}-panel`}
              tabIndex={i === role ? 0 : -1}
              onClick={() => selectRole(i)}
              className={cn(
                "relative shrink-0 rounded-md px-3.5 py-2 text-sm font-semibold whitespace-nowrap transition-colors",
                i === role ? "text-ink" : "text-mist hover:text-paper",
              )}
            >
              {i === role ? (
                <motion.span layoutId={`${tabsId}-pill`} className="absolute inset-0 rounded-md bg-leaf" transition={{ type: "spring", bounce: 0.15, duration: 0.45 }} />
              ) : null}
              <span className="relative">
                {g.role}
                <span className={cn("type-tabular ml-1.5 text-xs", i === role ? "text-ink/70" : "text-dim")}>{g.shots.length}</span>
              </span>
            </button>
          ))}
        </div>
      ) : null}

      <div
        role={galleries.length > 1 ? "tabpanel" : undefined}
        id={`${tabsId}-panel`}
        aria-labelledby={galleries.length > 1 ? `${tabsId}-tab-${role}` : undefined}
      >
        {gallery.blurb ? <p className="mb-4 text-mist">{gallery.blurb}</p> : null}

        {/* The observer sits on an unclipped wrapper: Chromium treats a fully clipped element as never visible. */}
        <motion.div initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.15 }}>
        <motion.div
          className="relative aspect-[16/10] w-full"
          variants={{
            hidden: { clipPath: "inset(0 100% 0 0 round 8px)" },
            shown: { clipPath: "inset(0 0% 0 0 round 8px)" },
          }}
          transition={{ duration: reduce ? 0 : 0.9, ease: [0.7, 0, 0.2, 1] }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={shot.src}
              className={cn("absolute inset-0", shot.device === "phone" && "rounded-lg border border-slate bg-graphite")}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.3 }}
            >
              <DeviceFrame shot={shot} domain={domain} />
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`View "${shot.caption}" full size`}
            className="absolute right-3 bottom-3 z-10 grid size-10 place-items-center rounded-md border border-rule bg-ink/80 text-paper backdrop-blur hover:bg-slate"
          >
            <Expand className="size-4" />
          </button>
        </motion.div>
        </motion.div>

        <div className="mt-3 flex items-center gap-3">
          <p className="min-w-0 flex-1 truncate text-sm text-mist" aria-live="polite">
            {shot.caption}
          </p>
          <span className="type-tabular text-sm text-dim">
            {index + 1} / {count}
          </span>
          {count > 1 ? (
            <div className="flex gap-1.5">
              <button type="button" onClick={() => step(-1)} aria-label="Previous screenshot" className="grid size-9 place-items-center rounded-md border border-rule text-paper hover:bg-graphite">
                <ChevronLeft className="size-4" />
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Next screenshot" className="grid size-9 place-items-center rounded-md border border-rule text-paper hover:bg-graphite">
                <ChevronRight className="size-4" />
              </button>
            </div>
          ) : null}
        </div>

        {count > 1 ? (
          <ol aria-label="Screenshots" className="sprockets mt-3 flex gap-2 overflow-x-auto rounded-md bg-slate px-2 py-4" data-lenis-prevent>
            {shots.map((s, i) => (
              <li key={s.src} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={s.caption}
                  aria-current={i === index ? "true" : undefined}
                  className={cn(
                    "relative block w-28 overflow-hidden rounded-[3px] border-2 transition-[border-color,opacity] sm:w-32",
                    i === index ? "border-leaf" : "border-transparent opacity-60 hover:opacity-100",
                  )}
                >
                  <Image src={s.thumb} width={480} height={300} alt="" className="aspect-[16/10] w-full object-cover" />
                </button>
              </li>
            ))}
          </ol>
        ) : null}
      </div>

      <Lightbox title={title} shots={shots} index={index} open={open} onIndex={setIndex} onClose={() => setOpen(false)} />
    </div>
  );
}
