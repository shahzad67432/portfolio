"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * One row of the index. The date arrives already formatted so this file, which
 * ships to the browser, never has to pull the content layer in behind it.
 */
export type PostRow = {
  slug: string;
  title: string;
  /** Small caps line under the title. The post's first tag, when it has one. */
  category?: string;
  /** ISO, for the time element. */
  date: string;
  /** Long form, for the reader. */
  dateLabel: string;
};

type PostRowsProps = {
  rows: readonly PostRow[];
  className?: string;
};

/**
 * The index: title left, date right, a dotted rule under every row. Rows land
 * one after another as the list scrolls in, and collapse to a single opacity
 * step when the reader has asked for less motion.
 */
export function PostRows({ rows, className }: PostRowsProps) {
  const reduced = useReducedMotion();

  return (
    <ul className={cn("border-t border-dotted border-rule", className)}>
      {rows.map((row, i) => (
        <motion.li
          key={row.slug}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
          whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
          transition={
            reduced
              ? { duration: 0.001 }
              : { duration: 0.34, delay: i * 0.05, ease: [0.34, 1.56, 0.64, 1] }
          }
          className="border-b border-dotted border-rule"
        >
          <Link
            href={`/blog/${row.slug}`}
            className="group flex min-h-14 flex-col justify-center gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
          >
            <span className="flex flex-col gap-1">
              <span className="font-display text-lead text-ink transition-colors duration-200 group-hover:text-accent">
                {row.title}
              </span>
              {row.category ? (
                <span className="text-meta uppercase tracking-[0.08em] text-ink-meta">
                  {row.category}
                </span>
              ) : null}
            </span>
            <time
              dateTime={row.date}
              className="shrink-0 text-small text-ink-meta sm:text-right"
            >
              {row.dateLabel}
            </time>
          </Link>
        </motion.li>
      ))}
    </ul>
  );
}
