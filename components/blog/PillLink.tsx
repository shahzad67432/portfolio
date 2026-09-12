import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PillLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

/**
 * The outlined pill that carries a reader into a post. The outline is the accent,
 * the label stays in ink so it clears AA on paper, and the arrow travels on hover.
 */
export function PillLink({ href, children, className }: PillLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex min-h-11 items-center gap-2.5 rounded-full border border-accent px-5 text-small text-ink transition-colors duration-200 hover:bg-accent-soft",
        className,
      )}
    >
      <span>{children}</span>
      <svg
        aria-hidden
        width="16"
        height="10"
        viewBox="0 0 16 10"
        fill="none"
        className="shrink-0 text-accent transition-transform duration-200 group-hover:translate-x-1"
      >
        <path
          d="M1 5h13M10.5 1 14.5 5l-4 4"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
