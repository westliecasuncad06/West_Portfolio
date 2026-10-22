"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
  className?: string;
};

/**
 * Native <dialog> shown as a modal: focus is trapped, Escape closes it, and the
 * page behind is inert. Page scrolling (including Lenis) pauses while it's open.
 */
export function Modal({ open, onClose, label, children, className }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      window.__lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    }
    if (!open && dialog.open) dialog.close();
    return () => {
      if (open) {
        window.__lenis?.start();
        document.documentElement.style.overflow = "";
      }
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      data-lenis-prevent
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className={cn("modal m-0 max-h-none max-w-none bg-transparent p-0 text-mist", className)}
    >
      {open ? children : null}
    </dialog>
  );
}
