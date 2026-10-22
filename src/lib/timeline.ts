/** Frames per second for the scroll timecode. */
export const FPS = 24;
/** Pixels of scrolling that make one frame. */
export const PX_PER_FRAME = 4;

const pad = (n: number) => String(n).padStart(2, "0");

/** Formats a frame count as HH:MM:SS:FF at 24 fps. */
export function formatTimecode(frames: number): string {
  const total = Math.max(0, Math.floor(frames));
  const ff = total % FPS;
  const totalSeconds = Math.floor(total / FPS);
  const ss = totalSeconds % 60;
  const mm = Math.floor(totalSeconds / 60) % 60;
  const hh = Math.floor(totalSeconds / 3600);
  return `${pad(hh)}:${pad(mm)}:${pad(ss)}:${pad(ff)}`;
}

/**
 * The page position the playhead points at. It slides from the top of the
 * viewport (before scrolling) to the bottom of the viewport (at full scroll),
 * so it covers the whole document exactly once.
 */
export function playheadY({ scrollY, viewport, docHeight }: { scrollY: number; viewport: number; docHeight: number }) {
  const maxScroll = docHeight - viewport;
  if (maxScroll <= 0) return 0;
  const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
  return scrollY + viewport * progress;
}

export type ClipRange = { start: number; end: number };

/** Turns section tops (px) into clip ranges as fractions of the page. The first clip starts at 0. */
export function clipRanges(tops: number[], docHeight: number): ClipRange[] {
  if (tops.length === 0 || docHeight <= 0) return [];
  const starts = tops.map((top, i) => (i === 0 ? 0 : Math.min(1, Math.max(0, top / docHeight))));
  return starts.map((start, i) => ({ start, end: i + 1 < starts.length ? starts[i + 1] : 1 }));
}

/** Index of the clip that contains `fraction` (0..1). */
export function activeClipIndex(ranges: ClipRange[], fraction: number): number {
  for (let i = ranges.length - 1; i >= 0; i--) {
    if (fraction >= ranges[i].start) return i;
  }
  return 0;
}
