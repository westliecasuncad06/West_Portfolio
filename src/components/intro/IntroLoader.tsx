import { profile } from "@/content/profile";

export type IntroState = "running" | "exit" | "gone";

/**
 * Opening countdown styled as a film leader: 3, 2, 1 with a sweeping hand,
 * then the frame splits open like letterbox bars. The countdown is pure CSS so
 * it shows on the very first paint, before any JavaScript has loaded.
 */
export function IntroLoader({ state, onSkip }: { state: IntroState; onSkip: () => void }) {
  if (state === "gone") return null;
  return (
    <div className="intro" data-state={state} aria-hidden onClick={onSkip}>
      <div className="intro-half intro-half--top" />
      <div className="intro-half intro-half--bottom" />
      <div className="intro-stage">
        <span className="intro-cross intro-cross--h" />
        <span className="intro-cross intro-cross--v" />
        <div className="intro-ring">
          <span className="intro-sweep" />
          <span className="intro-hand" />
          <span className="intro-num" style={{ animationDelay: "0.1s" }}>
            3
          </span>
          <span className="intro-num" style={{ animationDelay: "0.5s" }}>
            2
          </span>
          <span className="intro-num intro-num--last" style={{ animationDelay: "0.9s" }} data-intro-last>
            1
          </span>
        </div>
        <div className="intro-meta">
          <p className="intro-name">{profile.name}</p>
          <span className="intro-bar">
            <span />
          </span>
        </div>
      </div>
    </div>
  );
}
