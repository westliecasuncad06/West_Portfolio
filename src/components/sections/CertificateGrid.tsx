"use client";

import Image from "next/image";
import { Download, ExternalLink, X } from "lucide-react";
import { useState } from "react";
import type { Certificate } from "@/content/certificates";
import { Modal } from "@/components/ui/Modal";
import { buttonClass } from "@/components/ui/Button";

export function CertificateGrid({ certificates }: { certificates: Certificate[] }) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const cert = certificates.find((c) => c.slug === openSlug);

  return (
    <>
      <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((c) => (
          <li key={c.slug}>
            <button type="button" onClick={() => setOpenSlug(c.slug)} className="group block w-full text-left">
              <span className="block overflow-hidden rounded-md border border-slate bg-paper p-2 transition-[border-color,transform] duration-300 group-hover:-translate-y-1 group-hover:border-leaf">
                <Image src={c.thumb} width={900} height={696} alt="" className="aspect-[4/3] w-full object-cover object-top" />
              </span>
              <span className="mt-4 block text-lg leading-snug font-semibold text-paper">{c.title}</span>
              <span className="mt-1 block text-sm text-dim">
                {c.issuer}, {c.date}
                {c.detail ? `, ${c.detail}` : ""}
              </span>
              <span className="mt-2 block text-sm font-semibold text-leaf">View certificate</span>
            </button>
          </li>
        ))}
      </ul>

      <Modal open={cert !== undefined} onClose={() => setOpenSlug(null)} label={cert ? `${cert.title} certificate` : "Certificate"} className="h-dvh w-dvw">
        {cert ? (
          <div className="flex h-full flex-col">
            <div className="shell flex items-center gap-3 py-3">
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-paper">{cert.title}</p>
                <p className="truncate text-sm text-dim">
                  {cert.issuer}, {cert.date}
                </p>
              </div>
              <a href={cert.pdf} download className={buttonClass("outline", "hidden h-11 sm:inline-flex")}>
                <Download aria-hidden className="size-4" />
                Download PDF
              </a>
              <button
                type="button"
                autoFocus
                onClick={() => setOpenSlug(null)}
                aria-label="Close"
                className="grid size-11 shrink-0 place-items-center rounded-md border border-rule text-paper hover:bg-graphite"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="shell min-h-0 flex-1 pb-6">
              {/* Phones rarely render PDFs inline, so they get the image and a link instead. */}
              <iframe src={`${cert.pdf}#view=FitH`} title={cert.title} className="hidden size-full rounded-md border border-slate bg-paper md:block" />
              <div className="flex h-full flex-col items-center justify-center gap-5 md:hidden">
                <Image src={cert.thumb} width={900} height={696} alt={`${cert.title} certificate`} className="w-full rounded-md border border-slate" />
                <a href={cert.pdf} target="_blank" rel="noopener noreferrer" className={buttonClass("primary")}>
                  Open the PDF
                  <ExternalLink aria-hidden className="size-4" />
                </a>
              </div>
            </div>
          </div>
        ) : null}
      </Modal>
    </>
  );
}
