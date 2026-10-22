"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Track } from "@/content/skills";
import { cn } from "@/lib/cn";
import { SkillIcon } from "./SkillIcon";

export type TrackData = Omit<Track, "skills"> & { skills: { name: string; note?: string; usedIn: string[] }[] };

const listJoin = (items: string[]) =>
  items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;

const describe = (s: { name: string; note?: string; usedIn: string[] }) => {
  if (s.usedIn.length > 0) return `${s.name}: used in ${listJoin(s.usedIn)}.${s.note ? ` ${s.note}.` : ""}`;
  return s.note ? `${s.name}: ${s.note}.` : s.name;
};

/** Each track lists its tools as clips. A clip's width grows with the number of projects that used it. */
export function SkillTracks({ tracks }: { tracks: TrackData[] }) {
  const [selected, setSelected] = useState<{ track: string; name: string } | null>(null);
  const selectedSkill = selected
    ? tracks.find((t) => t.id === selected.track)?.skills.find((s) => s.name === selected.name)
    : undefined;

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-slate">
        {tracks.map((track) => {
          const skill = selected?.track === track.id ? selectedSkill : undefined;
          return (
            <div key={track.id} className="grid border-b border-slate last:border-b-0 md:grid-cols-[15rem_1fr]">
              <div className="border-b border-slate bg-graphite px-4 py-4 md:border-r md:border-b-0">
                <div className="flex items-baseline gap-2.5">
                  <span aria-hidden className="type-tabular text-xs font-semibold text-dim">
                    {track.id}
                  </span>
                  <h3 className="font-semibold text-paper">{track.label}</h3>
                </div>
                <p className="mt-1 text-sm leading-snug text-dim">{track.summary}</p>
              </div>

              <div className="bg-ink px-3 py-3">
                <ul className="flex flex-wrap gap-1.5" aria-label={`${track.label} skills`}>
                  {track.skills.map((s) => {
                    const isOn = skill?.name === s.name;
                    return (
                      <li key={s.name}>
                        <button
                          type="button"
                          aria-pressed={isOn}
                          onClick={() => setSelected(isOn ? null : { track: track.id, name: s.name })}
                          onMouseEnter={() => setSelected({ track: track.id, name: s.name })}
                          style={{ paddingInline: `${0.7 + s.usedIn.length * 0.55}rem` }}
                          className={cn(
                            "flex h-10 items-center gap-2 rounded-[3px] border text-sm font-medium whitespace-nowrap transition-colors duration-150",
                            isOn
                              ? "border-leaf bg-slate text-paper"
                              : "border-slate bg-graphite text-mist hover:border-rule hover:text-paper",
                          )}
                        >
                          <SkillIcon name={s.name} className="size-4 shrink-0" />
                          {s.name}
                        </button>
                      </li>
                    );
                  })}
                </ul>

                <AnimatePresence initial={false}>
                  {skill ? (
                    <motion.div
                      key="inspector"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-3 flex gap-2.5 border-t border-slate pt-3 text-sm text-mist">
                        <span aria-hidden className="mt-1 h-3 w-[3px] shrink-0 rounded-full bg-leaf" />
                        {describe(skill)}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        {selectedSkill ? describe(selectedSkill) : ""}
      </p>
    </>
  );
}
