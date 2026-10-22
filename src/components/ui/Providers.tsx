"use client";

import Lenis from "lenis";
import { MotionConfig } from "motion/react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { IntroLoader, type IntroState } from "@/components/intro/IntroLoader";
import { IntroContext } from "@/components/intro/useIntro";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** How long the letterbox bars take to open, matching the CSS transition. */
const EXIT_MS = 650;

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";
const subscribeReduce = (onChange: () => void) => {
  const media = window.matchMedia(REDUCE_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};

/** The visitor's reduced-motion setting, readable during render. The server assumes motion is fine. */
const usePrefersReducedMotion = () =>
  useSyncExternalStore(
    subscribeReduce,
    () => window.matchMedia(REDUCE_QUERY).matches,
    () => false,
  );

/**
 * Smooth scrolling, the reduced-motion setting for Motion, and the opening
 * countdown. Entrances on the page wait for the countdown through IntroContext.
 */
export function Providers({ children }: { children: ReactNode }) {
  const reduce = usePrefersReducedMotion();
  const [intro, setIntro] = useState<IntroState>("running");
  const [finishedIntro, setFinishedIntro] = useState(false);
  const finished = useRef(false);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    setIntro((s) => (s === "running" ? "exit" : s));
    setFinishedIntro(true);
  }, []);

  // Smooth scrolling. Off when the visitor prefers reduced motion.
  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({
      autoRaf: true,
      // Lenis already honours the page's scroll-padding-top, which clears the fixed header.
      anchors: true,
      lerp: 0.12,
      prevent: (node) => node.closest("dialog, [data-lenis-prevent]") !== null,
    });
    window.__lenis = lenis;
    if (!finished.current) lenis.stop();
    return () => {
      lenis.destroy();
      delete window.__lenis;
    };
  }, [reduce]);

  // Opening countdown: wait for the CSS "1" to finish, then open the frame.
  useEffect(() => {
    if (reduce) return;
    document.documentElement.style.overflow = "hidden";

    let active = true;
    const done = () => {
      if (active) finish();
    };
    const last = document.querySelector<HTMLElement>("[data-intro-last]");
    const animation = last?.getAnimations?.()[0];
    (animation ? animation.finished : Promise.resolve()).then(done, done);

    window.addEventListener("keydown", done, { once: true });
    return () => {
      active = false;
      window.removeEventListener("keydown", done);
    };
  }, [reduce, finish]);

  useEffect(() => {
    if (intro !== "exit") return;
    document.documentElement.style.overflow = "";
    window.__lenis?.start();
    const t = setTimeout(() => setIntro("gone"), EXIT_MS);
    return () => clearTimeout(t);
  }, [intro]);

  return (
    <MotionConfig reducedMotion="user">
      <IntroContext.Provider value={finishedIntro || reduce}>
        <IntroLoader state={reduce ? "gone" : intro} onSkip={finish} />
        {children}
      </IntroContext.Provider>
    </MotionConfig>
  );
}
