/**
 * Fixed-window, in-memory rate limiter.
 *
 * Best effort only: on Vercel each serverless instance keeps its own memory,
 * so the limit applies per instance. It stops casual floods, not determined abuse.
 */
export type RateLimiter = {
  /** Records one hit for `key`. Returns how long to wait when over the limit. */
  hit(key: string, now: number): { ok: true } | { ok: false; retryAfterSeconds: number };
};

export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }): RateLimiter {
  const windows = new Map<string, { start: number; count: number }>();

  return {
    hit(key, now) {
      const current = windows.get(key);
      if (!current || now - current.start >= windowMs) {
        windows.set(key, { start: now, count: 1 });
        return { ok: true };
      }
      if (current.count >= limit) {
        return { ok: false, retryAfterSeconds: Math.ceil((current.start + windowMs - now) / 1000) };
      }
      current.count += 1;
      return { ok: true };
    },
  };
}
