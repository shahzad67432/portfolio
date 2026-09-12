import Link from "next/link";

import type { Work } from "@/lib/content";

type ArchiveListProps = {
  items: readonly Work[];
  className?: string;
};

/**
 * The full index, set like a table of contents: the name over its category on
 * the left, the dates on the right, and a dotted leader running the whole way
 * between them so the eye can cross the gap. Titles are plain text rather than
 * headings, because this list repeats what the objects above already announced.
 *
 * The leader is an empty flex item in a baseline-aligned row, so its underside
 * lands on the baseline of the title however many lines the title wraps to.
 */
export function ArchiveList({ items, className }: ArchiveListProps) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item.slug}>
          <Link
            href={`/work/${item.slug}`}
            className="group flex min-h-16 items-baseline gap-3 py-4 sm:gap-5"
          >
            <span className="min-w-0">
              <span className="block font-display text-lead leading-tight text-ink transition-colors duration-200 group-hover:text-accent sm:text-title">
                {item.title}
              </span>
              <span className="mt-1 block font-mono text-meta uppercase tracking-[0.14em] text-ink-meta">
                {item.kind}
              </span>
            </span>
            <span
              aria-hidden
              className="-mb-0.5 h-0 min-w-6 flex-1 border-b border-dotted border-rule transition-colors duration-200 group-hover:border-accent/60"
            />
            <span className="shrink-0 text-right font-mono text-meta uppercase tracking-[0.1em] text-ink-meta">
              {item.period}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
