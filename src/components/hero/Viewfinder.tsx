"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { image } from "@/content/media";
import { profile } from "@/content/profile";
import { useIntroReady } from "@/components/intro/useIntro";

const portrait = image("/images/westlie-portrait.webp");
const EASE = [0.22, 1, 0.36, 1] as const;

const corners = [
  { pos: "top-3 left-3 border-t-2 border-l-2", from: { x: -14, y: -14 } },
  { pos: "top-3 right-3 border-t-2 border-r-2", from: { x: 14, y: -14 } },
  { pos: "bottom-3 left-3 border-b-2 border-l-2", from: { x: -14, y: 14 } },
  { pos: "bottom-3 right-3 border-b-2 border-r-2", from: { x: 14, y: 14 } },
];

/** The portrait framed like a camera viewfinder, with a broadcast-style lower third. */
export function Viewfinder() {
  const reduce = useReducedMotion();
  const ready = useIntroReady();
  const t = (delay: number, duration: number) => ({ delay: reduce ? 0 : delay, duration: reduce ? 0 : duration, ease: EASE });

  return (
    <figure className="relative mx-auto w-full max-w-[26rem] lg:max-w-none">
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-graphite">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={ready ? { opacity: 1, scale: 1 } : undefined}
          transition={t(0.1, 1.2)}
        >
          <Image
            src={portrait.src}
            width={portrait.width}
            height={portrait.height}
            preload
            alt="Westlie Casuncad holding an open laptop, headphones around his neck"
            className="size-full object-cover object-top"
          />
        </motion.div>

        {/* Rule-of-thirds guides */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <span className="absolute inset-y-0 left-1/3 w-px bg-paper/10" />
          <span className="absolute inset-y-0 left-2/3 w-px bg-paper/10" />
          <span className="absolute inset-x-0 top-1/3 h-px bg-paper/10" />
          <span className="absolute inset-x-0 top-2/3 h-px bg-paper/10" />
        </div>

        {corners.map((c) => (
          <motion.span
            key={c.pos}
            aria-hidden
            className={`absolute size-8 border-paper/85 ${c.pos}`}
            initial={{ opacity: 0, ...c.from }}
            animate={ready ? { opacity: 1, x: 0, y: 0 } : undefined}
            transition={t(0.35, 0.55)}
          />
        ))}

        <motion.figcaption
          className="absolute right-6 bottom-6 left-6 flex overflow-hidden rounded-[4px] bg-ink/85 backdrop-blur-sm"
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={ready ? { clipPath: "inset(0 0% 0 0)" } : undefined}
          transition={t(1.0, 0.7)}
        >
          <span aria-hidden className="w-1.5 shrink-0 bg-leaf" />
          <span className="px-4 py-3">
            <span className="block font-semibold text-paper">{profile.role}</span>
            <span className="block text-sm text-mist">{profile.location}</span>
          </span>
        </motion.figcaption>
      </div>
    </figure>
  );
}
