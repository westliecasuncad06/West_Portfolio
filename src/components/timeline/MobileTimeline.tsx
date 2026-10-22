"use client";

import { Menu, X } from "lucide-react";
import { motion, useTransform } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { jumpTo } from "@/lib/jump";
import { Modal } from "@/components/ui/Modal";
import { Timecode } from "./Timecode";
import { useTimeline } from "./useTimeline";

/** On small screens the timeline collapses into the header: current clip, timecode, and a menu of clips. */
export function MobileTimeline({ contactHref }: { contactHref: string }) {
  const { clips, active, fraction, frames } = useTimeline();
  const [open, setOpen] = useState(false);
  const scaleX = useTransform(fraction, (v) => v);

  return (
    <>
      <div className="flex min-w-0 flex-1 items-center justify-end gap-3 lg:hidden">
        <span className="truncate text-sm font-semibold text-paper">{clips[active]?.label ?? "Intro"}</span>
        <Timecode frames={frames} className="text-sm text-dim" />
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open the section menu"
          className="grid size-10 shrink-0 place-items-center rounded-md border border-rule text-paper"
        >
          <Menu className="size-5" />
        </button>
      </div>

      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-leaf lg:hidden"
        style={{ scaleX }}
      />

      <Modal open={open} onClose={() => setOpen(false)} label="Sections" className="h-dvh w-dvw">
        <div className="flex h-full flex-col bg-ink px-4 pt-3 pb-8">
          <div className="flex items-center justify-between">
            <span className="text-sm text-dim">Jump to a clip</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close the section menu"
              className="grid size-10 place-items-center rounded-md border border-rule text-paper"
            >
              <X className="size-5" />
            </button>
          </div>
          <ol className="mt-8 grid gap-2">
            {clips.map((clip, i) => (
              <li key={clip.id}>
                <a
                  href={`#${clip.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                    setTimeout(() => jumpTo(clip.id), 40);
                  }}
                  aria-current={i === active ? "location" : undefined}
                  className={cn(
                    "flex items-center gap-4 rounded-md border px-4 py-3 text-2xl type-title",
                    i === active ? "border-leaf/70 bg-slate text-paper" : "border-slate bg-graphite text-mist",
                  )}
                >
                  <span aria-hidden className={cn("h-6 w-[3px] rounded-full", i === active ? "bg-leaf" : "bg-rule")} />
                  {clip.label}
                </a>
              </li>
            ))}
          </ol>
          <a
            href={contactHref}
            onClick={(e) => {
              if (!contactHref.startsWith("#")) return setOpen(false);
              e.preventDefault();
              setOpen(false);
              setTimeout(() => jumpTo(contactHref.slice(1)), 40);
            }}
            className="mt-auto inline-flex h-12 items-center justify-center rounded-md bg-leaf font-semibold text-ink"
          >
            Send a message
          </a>
        </div>
      </Modal>
    </>
  );
}
