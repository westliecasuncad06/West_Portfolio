import Image from "next/image";
import Link from "next/link";
import { profile } from "@/content/profile";
import { buttonClass } from "@/components/ui/Button";
import { MobileTimeline } from "@/components/timeline/MobileTimeline";

/** `base` is "" on the home page and "/" on case-study pages, so anchors reach the home sections. */
export function SiteHeader({ base = "" }: { base?: "" | "/" }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-slate/70 bg-ink/85 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-leaf focus:px-4 focus:py-2 focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>
      <div className="shell flex h-16 items-center gap-4">
        <Link href={base === "/" ? "/" : "#intro"} className="flex shrink-0 items-center gap-3" aria-label={`${profile.name}, home`}>
          <Image src="/images/logo-mark.png" alt="" width={36} height={36} className="size-9" />
          <span className="hidden font-semibold text-paper sm:inline">{profile.name}</span>
        </Link>
        <MobileTimeline contactHref={`${base}#contact`} />
        <nav aria-label="Contact" className="ml-auto hidden items-center gap-6 lg:flex">
          <a href={`mailto:${profile.email}`} className="text-sm text-dim transition-colors hover:text-paper">
            {profile.email}
          </a>
          <a href={`${base}#contact`} className={buttonClass("primary", "h-10 px-4 text-sm")}>
            Send a message
          </a>
        </nav>
      </div>
    </header>
  );
}
