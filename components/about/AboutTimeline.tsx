import Link from "next/link";

import type { TimelineEntry, TimelineKind } from "@/content/timeline";

const KIND_LABEL: Record<TimelineKind, string> = {
  study: "Study",
  work: "Work",
  build: "Build",
  research: "Research",
};

/**
 * The record as rows: what it was on the left, when it ran on the right, a
 * dotted rule under each. Entries that have a page of their own link to it, and
 * the one still running carries an accent dot. At phone width the row stacks.
 */
export function AboutTimeline({ entries }: { entries: readonly TimelineEntry[] }) {
  return (
    <ol className="mt-8">
      {entries.map((entry) => (
        <li
          key={entry.id}
          className="border-b border-dotted border-rule py-5 last:border-b-0"
        >
          <div className="flex flex-col gap-x-8 sm:flex-row sm:items-baseline sm:justify-between">
            <p className="font-display text-lead leading-[1.25] text-ink sm:text-title">
              {entry.href ? (
                <Link
                  href={entry.href}
                  className="inline-flex min-h-11 items-center transition-colors duration-200 hover:text-accent"
                >
                  {entry.label}
                </Link>
              ) : (
                <span className="inline-flex min-h-11 items-center">
                  {entry.label}
                </span>
              )}
            </p>
            <p className="flex shrink-0 items-center gap-2 font-mono text-meta uppercase tracking-[0.1em] text-ink-meta">
              {entry.end === null ? (
                <span
                  aria-hidden
                  className="inline-block h-2 w-2 rounded-full bg-accent"
                />
              ) : null}
              {entry.period}
              {entry.end === null ? (
                <span className="sr-only">, still running</span>
              ) : null}
            </p>
          </div>

          <p className="mt-1 text-small text-ink-meta">
            <span className="font-mono text-meta uppercase tracking-[0.14em]">
              {KIND_LABEL[entry.kind]}
            </span>
            <span aria-hidden> · </span>
            {entry.org}
          </p>
          <p className="mt-2 max-w-prose text-small text-ink-body">
            {entry.note}
          </p>
        </li>
      ))}
    </ol>
  );
}
