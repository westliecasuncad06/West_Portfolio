import manifest from "./media-manifest.json";

export type Device = "desktop" | "phone" | "tall";

export type Shot = {
  src: string;
  width: number;
  height: number;
  thumb: string;
  /** Short label shown under the screen and in the filmstrip. */
  caption: string;
  /** Full description for screen readers. */
  alt: string;
  device: Device;
};

type ManifestEntry = { width: number; height: number; thumb?: string };
const entries = manifest as Record<string, ManifestEntry>;

/** Looks up an image's real size. Returns null for images that haven't been captured yet. */
export function shot(src: string, caption: string, alt: string, device: Device = "desktop"): Shot | null {
  const entry = entries[src];
  if (!entry) return null;
  return { src, width: entry.width, height: entry.height, thumb: entry.thumb ?? src, caption, alt, device };
}

export function image(src: string) {
  const entry = entries[src];
  if (!entry) throw new Error(`Missing image in media manifest: ${src}`);
  return { src, width: entry.width, height: entry.height };
}

export const present = <T,>(list: (T | null)[]): T[] => list.filter((x): x is T => x !== null);
