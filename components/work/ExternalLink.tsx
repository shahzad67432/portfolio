import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ExternalLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

/**
 * A link that leaves the site. The arrow is the affordance, the screen reader
 * gets it in words, and the whole row stays 44px tall so it can be tapped.
 */
export function ExternalLink({ href, children, className }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "group inline-flex min-h-11 items-center gap-2 text-small text-ink transition-colors duration-200 hover:text-accent",
        className,
      )}
    >
      <span className="underline decoration-rule underline-offset-4 transition-colors duration-200 group-hover:decoration-accent">
        {children}
      </span>
      <svg
        aria-hidden
        viewBox="0 0 16 16"
        className="h-3.5 w-3.5 shrink-0 text-accent"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5.5 2.5H13.5V10.5" />
        <path d="M13.5 2.5L3 13" />
      </svg>
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

/** "https://cetus-one.vercel.app/" reads as "cetus-one.vercel.app". */
export function hostOf(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/+$/, "");
}
