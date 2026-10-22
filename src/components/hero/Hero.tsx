"use client";

import { motion, useReducedMotion } from "motion/react";
import { SiGithub, SiWhatsapp } from "react-icons/si";
import { Mail } from "lucide-react";
import { profile } from "@/content/profile";
import { buttonClass } from "@/components/ui/Button";
import { useIntroReady } from "@/components/intro/useIntro";
import { Viewfinder } from "./Viewfinder";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The single orchestrated moment: the name's letters stretch from condensed to
 * expanded like a clip rolling in, then the tagline and actions follow.
 */
export function Hero() {
  const reduce = useReducedMotion();
  // Nothing moves until the opening countdown hands over.
  const ready = useIntroReady();
  const t = (delay: number, duration = 0.7) => ({ delay: reduce ? 0 : delay, duration: reduce ? 0 : duration, ease: EASE });
  const rise = ready ? { opacity: 1, y: 0 } : undefined;

  const word = (text: string, offset: number) => (
    <span className="block whitespace-nowrap" aria-hidden>
      {[...text].map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: "0.3em", fontVariationSettings: '"wdth" 62' }}
          animate={ready ? { opacity: 1, y: 0, fontVariationSettings: '"wdth" 125' } : undefined}
          transition={t(0.15 + (offset + i) * 0.04, 0.9)}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );

  return (
    <section id="intro" data-clip="Intro" aria-labelledby="intro-title" className="relative pt-28 pb-20 lg:pt-36 lg:pb-28">
      <div className="shell grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <h1
            id="intro-title"
            aria-label={profile.name}
            className="type-display text-[clamp(3.1rem,12.5vw,4.5rem)] text-paper sm:text-[clamp(4.5rem,11vw,6.5rem)] lg:text-[clamp(5rem,7.6vw,7.75rem)]"
          >
            {word(profile.firstName, 0)}
            {word(profile.lastName, profile.firstName.length)}
          </h1>

          <motion.p
            className="mt-8 max-w-[22ch] text-[1.9rem] leading-[1.12] font-semibold text-paper sm:text-[2.6rem]"
            initial={{ opacity: 0, y: 14 }}
            animate={rise}
            transition={t(0.8)}
          >
            {profile.tagline}
          </motion.p>

          <motion.p
            className="mt-5 max-w-[56ch] text-lg text-mist"
            initial={{ opacity: 0, y: 14 }}
            animate={rise}
            transition={t(0.9)}
          >
            {profile.intro}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 14 }}
            animate={rise}
            transition={t(1.0)}
          >
            <a href="#work" className={buttonClass("primary")}>
              See my work
            </a>
            <a href="#contact" className={buttonClass("outline")}>
              Send a message
            </a>
          </motion.div>

          <motion.ul
            className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-dim"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : undefined}
            transition={t(1.15)}
          >
            <li>
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-paper">
                <Mail aria-hidden className="size-4" />
                {profile.email}
              </a>
            </li>
            <li>
              <a href={profile.whatsapp.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-paper">
                <SiWhatsapp aria-hidden className="size-4" />
                WhatsApp {profile.whatsapp.display}
              </a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-paper">
                <SiGithub aria-hidden className="size-4" />
                GitHub
              </a>
            </li>
          </motion.ul>
        </div>

        <div className="lg:col-span-5">
          <Viewfinder />
        </div>
      </div>
    </section>
  );
}
