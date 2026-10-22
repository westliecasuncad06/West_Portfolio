import { describe, expect, it } from "vitest";
import { activeClipIndex, clipRanges, formatTimecode, playheadY } from "@/lib/timeline";

describe("formatTimecode", () => {
  it.each([
    [0, "00:00:00:00"],
    [1, "00:00:00:01"],
    [23, "00:00:00:23"],
    [24, "00:00:01:00"],
    [24 * 60, "00:01:00:00"],
    [24 * 3600 + 2, "01:00:00:02"],
  ])("formats frame %i as %s", (frames, expected) => {
    expect(formatTimecode(frames)).toBe(expected);
  });

  it("never shows negative or fractional frames", () => {
    expect(formatTimecode(-5)).toBe("00:00:00:00");
    expect(formatTimecode(24.9)).toBe("00:00:01:00");
  });
});

describe("playheadY", () => {
  it("sits at the top of the page before scrolling", () => {
    expect(playheadY({ scrollY: 0, viewport: 800, docHeight: 4000 })).toBe(0);
  });

  it("reaches the very bottom of the page at full scroll", () => {
    expect(playheadY({ scrollY: 3200, viewport: 800, docHeight: 4000 })).toBe(4000);
  });

  it("moves from the top of the viewport toward its bottom as you scroll", () => {
    // halfway: 1600 scrolled + half of the 800px viewport
    expect(playheadY({ scrollY: 1600, viewport: 800, docHeight: 4000 })).toBe(2000);
  });

  it("stays at the top when the page doesn't scroll", () => {
    expect(playheadY({ scrollY: 0, viewport: 800, docHeight: 600 })).toBe(0);
  });
});

describe("clipRanges", () => {
  it("splits the page into clips that run from one section to the next", () => {
    expect(clipRanges([100, 1000, 3000], 4000)).toEqual([
      { start: 0, end: 0.25 },
      { start: 0.25, end: 0.75 },
      { start: 0.75, end: 1 },
    ]);
  });

  it("returns no clips for an empty page", () => {
    expect(clipRanges([], 0)).toEqual([]);
  });
});

describe("activeClipIndex", () => {
  const ranges = [
    { start: 0, end: 0.25 },
    { start: 0.25, end: 0.75 },
    { start: 0.75, end: 1 },
  ];

  it.each([
    [0, 0],
    [0.2, 0],
    [0.25, 1],
    [0.74, 1],
    [0.9, 2],
    [1, 2],
  ])("puts fraction %d in clip %i", (fraction, index) => {
    expect(activeClipIndex(ranges, fraction)).toBe(index);
  });
});
