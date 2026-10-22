"use client";

import { motion, useReducedMotion, useTransform } from "motion/react";
import { cn } from "@/lib/cn";
import { useIntroReady } from "@/components/intro/useIntro";
import { Timecode } from "./Timecode";
import { useTimeline } from "./useTimeline";

/**
 * Desktop navigation drawn as an editing timeline: each section is a clip,
 * the leaf playhead follows the scroll, and the timecode runs with it.
 */
export function TimelineDock() {
  const { clips, active, fraction, frames } = useTimeline();
  const left = useTransform(fraction, (v) => `${v * 100}%`);
  const reduce = useReducedMotion();
  const ready = useIntroReady();
  const current = clips[active];

  return (
    <motion.nav
      aria-label="Sections"
      initial={{ y: "100%" }}
      animate={ready ? { y: 0 } : undefined}
      transition={{ delay: reduce ? 0 : 1.1, duration: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 bottom-0 z-40 hidden border-t border-slate bg-ink/90 backdrop-blur-md lg:block"
    >
      <div className="shell flex h-[4.5rem] items-center gap-6">
        <div className="flex w-44 shrink-0 items-center gap-3">
          <span aria-hidden className="rounded-[3px] border border-rule px-1.5 py-0.5 text-xs font-semibold text-dim">
            V1
          </span>
          <span className="truncate font-semibold text-paper" aria-live="polite">
            {current?.label ?? "Intro"}
          </span>
        </div>

        <div className="relative h-11 flex-1">
          <div aria-hidden className="ruler-ticks absolute inset-x-0 top-0 h-2" />
          <ol className="absolute inset-x-0 top-3 h-8">
            {clips.map((clip, i) => (
              <li
                key={clip.id}
                className="absolute inset-y-0 px-px"
                style={{ left: `${clip.start * 100}%`, width: `${(clip.end - clip.start) * 100}%` }}
              >
                <a
                  href={`#${clip.id}`}
                  aria-current={i === active ? "location" : undefined}
                  className={cn(
                    "flex h-full items-center overflow-hidden rounded-[3px] border px-2 text-[0.8rem] font-medium whitespace-nowrap transition-colors duration-200",
                    i === active
                      ? "border-leaf/70 bg-slate text-paper"
                      : "border-slate bg-graphite text-dim hover:border-rule hover:text-mist",
                  )}
                >
                  <span className="truncate">{clip.label}</span>
                </a>
              </li>
            ))}
          </ol>
          <motion.div aria-hidden className="pointer-events-none absolute inset-y-0 -ml-px w-[2px] bg-leaf" style={{ left }}>
            <span className="absolute -top-1 left-1/2 h-0 w-0 -translate-x-1/2 border-x-[6px] border-t-[7px] border-x-transparent border-t-leaf" />
          </motion.div>
        </div>

        <Timecode frames={frames} className="w-[8.25rem] shrink-0 text-right text-lg font-semibold text-paper" />
      </div>
    </motion.nav>
  );
}
