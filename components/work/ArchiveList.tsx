import Link from "next/link";

import type { Work } from "@/lib/content";

type ArchiveListProps = {
  items: readonly Work[];
  className?: string;
};

/**
 * The full index: name over its category, dates on the right, a dotted rule
 * between rows. Titles are plain text rather than headings, because this list
 * repeats what the objects above already announced.
 */
export function ArchiveList({ items, className }: ArchiveListProps) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item.slug} className="rule-dotted">
          <Link
            href={`/work/${item.slug}`}
            className="group flex min-h-16 items-center justify-between gap-4 py-4 sm:gap-8"
          >
            <span className="min-w-0">
              <span className="block font-display text-lead leading-tight text-ink transition-colors duration-200 group-hover:text-accent sm:text-title">
                {item.title}
              </span>
              <span className="mt-1 block font-mono text-meta uppercase tracking-[0.14em] text-ink-meta">
                {item.kind}
              </span>
            </span>
            <span className="text-right font-mono text-meta uppercase tracking-[0.1em] text-ink-meta sm:shrink-0">
              {item.period}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
