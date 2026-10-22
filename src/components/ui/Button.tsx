import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "quiet";

const styles: Record<Variant, string> = {
  primary: "bg-leaf text-ink hover:brightness-110 active:brightness-95",
  outline: "border border-rule text-paper hover:border-mist hover:bg-graphite",
  quiet: "text-mist underline decoration-rule underline-offset-[6px] hover:text-paper hover:decoration-leaf",
};

export const buttonClass = (variant: Variant = "primary", className?: string) =>
  cn(
    "inline-flex items-center justify-center gap-2 font-semibold transition-[filter,background-color,border-color,color] duration-200",
    variant !== "quiet" && "h-12 rounded-md px-5 text-[0.98rem]",
    styles[variant],
    className,
  );

type Props = { variant?: Variant; icon?: ReactNode; children: ReactNode; className?: string };

/** A link styled as a button. External links open in a new tab. */
export function ButtonLink({
  href,
  variant,
  icon,
  children,
  className,
  ...rest
}: Props & Omit<ComponentProps<"a">, "className" | "children">) {
  const external = /^https?:/.test(href ?? "");
  const cls = buttonClass(variant, className);
  if (external || rest.download !== undefined || href?.startsWith("#")) {
    return (
      <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {children}
        {icon}
      </a>
    );
  }
  return (
    <Link href={href ?? "#"} className={cls}>
      {children}
      {icon}
    </Link>
  );
}
