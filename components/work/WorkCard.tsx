import Link from "next/link";

import { WorkObject } from "@/components/work/WorkObject";
import type { Work } from "@/lib/content";
import { cn } from "@/lib/utils";

type WorkCardProps = {
  item: Work;
  /** Entrance order, so a row of objects lands one after another. */
  order?: number;
  className?: string;
};

/**
 * One object in the grid, with its name and dates printed underneath it.
 *
 * Every cell gets the same box and the object sits centred in it, the way a
 * contact sheet gives each frame the same window whatever is inside it. That is
 * what keeps the names underneath on one line across the row.
 */
export function WorkCard({ item, order = 0, className }: WorkCardProps) {
  return (
    <Link
      href={`/work/${item.slug}`}
      className={cn("group block rounded-sm", className)}
    >
      <div className="flex aspect-[7/5] w-full items-center justify-center">
        <WorkObject item={item} order={order} />
      </div>
      <h3 className="mt-6 font-display text-title leading-tight text-ink transition-colors duration-200 group-hover:text-accent">
        {item.title}
      </h3>
      <p className="mt-1 font-mono text-meta uppercase tracking-[0.12em] text-ink-meta">
        {item.period}
      </p>
    </Link>
  );
}
