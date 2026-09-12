import Link from "next/link";

import type { Work } from "@/lib/content";
import { cn } from "@/lib/utils";

type WorkPagerProps = {
  /** The newer project, or null at the top of the index. */
  prev: Work | null;
  /** The older project, or null at the bottom. */
  next: Work | null;
  className?: string;
};

function Arrow({ back = false }: { back?: boolean }) {
  return (
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
      <path d="M2.5 8h11" />
      <path d={back ? "M7 3.5 2.5 8 7 12.5" : "M9 3.5 13.5 8 9 12.5"} />
    </svg>
  );
}

/**
 * Walk the index from inside a project. Each side names the project it goes to,
 * and says what it is, so the link reads as a destination rather than as a
 * direction.
 */
export function WorkPager({ prev, next, className }: WorkPagerProps) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Other projects"
      className={cn(
        "grid gap-6 border-t border-rule pt-6 sm:grid-cols-2 sm:gap-8",
        className,
      )}
    >
      {prev ? (
        <Link
          href={`/work/${prev.slug}`}
          className="group flex min-h-16 flex-col justify-center gap-1 py-2"
        >
          <span className="flex items-center gap-2 font-mono text-meta uppercase tracking-[0.14em] text-ink-meta">
            <Arrow back />
            Newer project
          </span>
          <span className="font-display text-title leading-tight text-ink transition-colors duration-200 group-hover:text-accent">
            {prev.title}
          </span>
          <span className="text-small text-ink-body">
            {prev.kind}, {prev.period}
          </span>
        </Link>
      ) : (
        <span aria-hidden />
      )}

      {next ? (
        <Link
          href={`/work/${next.slug}`}
          className="group flex min-h-16 flex-col justify-center gap-1 py-2 sm:items-end sm:text-right"
        >
          <span className="flex items-center gap-2 font-mono text-meta uppercase tracking-[0.14em] text-ink-meta">
            Older project
            <Arrow />
          </span>
          <span className="font-display text-title leading-tight text-ink transition-colors duration-200 group-hover:text-accent">
            {next.title}
          </span>
          <span className="text-small text-ink-body">
            {next.kind}, {next.period}
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
