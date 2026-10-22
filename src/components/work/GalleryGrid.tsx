"use client";

import Image from "next/image";
import { useState } from "react";
import type { Shot } from "@/content/media";
import { cn } from "@/lib/cn";
import { Lightbox } from "./Lightbox";

/** Every screenshot for one role. Opening one starts the lightbox there. */
export function GalleryGrid({ title, shots }: { title: string; shots: Shot[] }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
        {shots.map((s, i) => (
          <li key={s.src}>
            <button
              type="button"
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
              className="group block w-full text-left"
            >
              <span className={cn("block overflow-hidden rounded-md border border-slate bg-graphite transition-colors group-hover:border-leaf")}>
                <Image src={s.thumb} width={480} height={300} alt={s.alt} className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              </span>
              <span className="mt-2 block text-sm text-mist group-hover:text-paper">{s.caption}</span>
            </button>
          </li>
        ))}
      </ul>
      <Lightbox title={title} shots={shots} index={index} open={open} onIndex={setIndex} onClose={() => setOpen(false)} />
    </>
  );
}
