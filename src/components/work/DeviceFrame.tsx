import Image from "next/image";
import type { Shot } from "@/content/media";
import { cn } from "@/lib/cn";

/** Shows a screenshot inside a browser window or a phone, filling its parent. */
export function DeviceFrame({ shot, domain, className }: { shot: Shot; domain?: string; className?: string }) {
  if (shot.device === "phone") {
    return (
      <div className={cn("flex size-full items-center justify-center p-4 sm:p-6", className)}>
        <div
          className="relative h-full overflow-hidden rounded-[1.75rem] border-[5px] border-slate bg-ink shadow-[0_24px_60px_-20px_rgb(0_0_0/0.8)]"
          style={{ aspectRatio: `${shot.width} / ${shot.height}` }}
        >
          <span aria-hidden className="absolute top-1.5 left-1/2 z-10 h-1.5 w-12 -translate-x-1/2 rounded-full bg-slate" />
          <Image src={shot.src} width={shot.width} height={shot.height} alt={shot.alt} className="size-full object-cover object-top" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex size-full flex-col overflow-hidden rounded-lg border border-slate bg-graphite", className)}>
      <div aria-hidden className="flex h-8 shrink-0 items-center gap-1.5 border-b border-slate px-3">
        <span className="size-2.5 rounded-full bg-rule" />
        <span className="size-2.5 rounded-full bg-rule" />
        <span className="size-2.5 rounded-full bg-rule" />
        {domain ? (
          <span className="mx-auto max-w-[60%] truncate rounded-[4px] bg-ink/70 px-3 py-0.5 text-[0.7rem] text-dim">{domain}</span>
        ) : null}
      </div>
      {shot.device === "tall" ? (
        <div
          tabIndex={0}
          aria-label={`${shot.alt}. Hover or focus to scroll the full page.`}
          className="scroll-shot relative min-h-0 flex-1 overflow-hidden"
          data-lenis-prevent
        >
          <Image src={shot.src} width={shot.width} height={shot.height} alt={shot.alt} className="block h-auto w-full" />
        </div>
      ) : (
        <div className="relative min-h-0 flex-1">
          <Image src={shot.src} width={shot.width} height={shot.height} alt={shot.alt} className="absolute inset-0 size-full object-cover object-top" />
        </div>
      )}
    </div>
  );
}
