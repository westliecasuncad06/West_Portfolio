"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import type { Shot } from "@/content/media";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/cn";

type Props = {
  title: string;
  shots: Shot[];
  index: number;
  open: boolean;
  onIndex: (i: number) => void;
  onClose: () => void;
};

/** Full-screen viewer. Arrow keys step through the shots and Escape closes it. */
export function Lightbox({ title, shots, index, open, onIndex, onClose }: Props) {
  const shot = shots[index];
  const count = shots.length;
  const go = (d: number) => onIndex((index + d + count) % count);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onIndex((index + 1) % count);
      if (e.key === "ArrowLeft") onIndex((index - 1 + count) % count);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, index, count, onIndex]);

  return (
    <Modal open={open} onClose={onClose} label={`${title} screenshots`} className="h-dvh w-dvw">
      {shot ? (
        <div className="flex h-full flex-col">
          <div className="shell flex items-center gap-4 py-3">
            <p className="min-w-0 flex-1 truncate">
              <span className="font-semibold text-paper">{title}</span>
              <span className="text-dim"> / {shot.caption}</span>
            </p>
            <span className="type-tabular shrink-0 text-sm text-dim">
              {index + 1} of {count}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              autoFocus
              className="grid size-11 shrink-0 place-items-center rounded-md border border-rule text-paper hover:bg-graphite"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* The image area has a definite size, so the screenshot always fits between the bars. */}
          <div className="relative min-h-0 flex-1">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={shot.src}
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => {
                  if (e.target === e.currentTarget) onClose();
                }}
                className={cn(
                  "absolute inset-0 px-4 pb-4 sm:px-16",
                  shot.device === "tall" ? "overflow-y-auto" : "flex items-center justify-center",
                )}
              >
                <Image
                  src={shot.src}
                  width={shot.width}
                  height={shot.height}
                  alt={shot.alt}
                  className={cn(
                    "rounded-md border border-slate",
                    shot.device === "tall" ? "mx-auto h-auto w-full max-w-5xl" : "h-auto max-h-full w-auto max-w-full object-contain",
                  )}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {count > 1 ? (
            <div className="flex justify-center gap-3 pb-6">
              <button type="button" onClick={() => go(-1)} aria-label="Previous screenshot" className="grid size-12 place-items-center rounded-full border border-rule text-paper hover:bg-graphite">
                <ChevronLeft className="size-5" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next screenshot" className="grid size-12 place-items-center rounded-full border border-rule text-paper hover:bg-graphite">
                <ChevronRight className="size-5" />
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </Modal>
  );
}
