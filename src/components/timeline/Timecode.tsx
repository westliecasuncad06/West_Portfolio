"use client";

import { useMotionValueEvent, type MotionValue } from "motion/react";
import { useRef } from "react";
import { formatTimecode } from "@/lib/timeline";
import { cn } from "@/lib/cn";

/** Running HH:MM:SS:FF readout. Writes to the DOM directly so scrolling never re-renders React. */
export function Timecode({ frames, className }: { frames: MotionValue<number>; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useMotionValueEvent(frames, "change", (v) => {
    if (ref.current) ref.current.textContent = formatTimecode(v);
  });
  return (
    <span ref={ref} aria-hidden className={cn("type-tabular", className)}>
      {formatTimecode(0)}
    </span>
  );
}
