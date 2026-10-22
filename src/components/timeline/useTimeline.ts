"use client";

import { useMotionValue, useMotionValueEvent } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { activeClipIndex, clipRanges, playheadY, PX_PER_FRAME, type ClipRange } from "@/lib/timeline";

export type Clip = ClipRange & { id: string; label: string };

/** Header height plus breathing room, matching the anchor-scroll offset. */
const HEADER_OFFSET = 100;

/**
 * Reads every `[data-clip]` section on the page and tracks scrolling:
 * which clip is active, where the playhead sits (0..1), and the frame count.
 */
export function useTimeline() {
  const [clips, setClips] = useState<Clip[]>([]);
  const [active, setActive] = useState(0);
  const fraction = useMotionValue(0);
  const frames = useMotionValue(0);
  const clipsRef = useRef<Clip[]>([]);

  useMotionValueEvent(fraction, "change", (v) => setActive(activeClipIndex(clipsRef.current, v)));

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const docHeight = document.documentElement.scrollHeight;
      const y = playheadY({ scrollY: window.scrollY, viewport: window.innerHeight, docHeight });
      fraction.set(docHeight > 0 ? y / docHeight : 0);
      frames.set(y / PX_PER_FRAME);
    };

    const measure = () => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-clip]"));
      const docHeight = document.documentElement.scrollHeight;
      // A section counts as started once its top passes under the fixed header.
      const tops = sections.map((el) => el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET);
      const ranges = clipRanges(tops, docHeight);
      const next = sections.map((el, i) => ({ id: el.id, label: el.dataset.clip ?? el.id, ...ranges[i] }));
      clipsRef.current = next;
      setClips(next);
      update();
      setActive(activeClipIndex(next, fraction.get()));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(frame);
    };
  }, [fraction, frames]);

  return { clips, active, fraction, frames };
}
