"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import { cn, restAngle, seeded } from "@/lib/utils";

/**
 * One row of the index. The date and the cover arrive already resolved so this
 * file, which ships to the browser, never has to pull the content layer in
 * behind it.
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
  /** The post's generated cover, shown as a 64px print at the head of the row. */
  cover: string;
};

type PostRowsProps = {
  rows: readonly PostRow[];
  className?: string;
};

/**
 * The index as a stack of papers: a 64px print at the head of each row, the
 * title and its category beside it, the date at the far edge, a dotted rule
 * under every row. Each print rests at its own small angle and straightens
 * under the pointer, so the list reads as things set down rather than a table.
 * Rows land one after another as the list scrolls in, and collapse to a single
 * opacity step when the reader has asked for less motion.
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
            className="group flex min-h-[5.5rem] items-center gap-4 py-4 sm:gap-6"
          >
            <span
              aria-hidden
              style={
                {
                  "--tilt": `${restAngle(`row-${row.slug}`, 2.4)}deg`,
                  "--ox": `${50 + seeded(`ox-${row.slug}`) * 18}%`,
                  "--oy": `${50 + seeded(`oy-${row.slug}`) * 15}%`,
                } as CSSProperties
              }
              className="shadow-rest block h-16 w-16 shrink-0 rounded-[2px] border border-rule bg-[#FBFAF6] p-[3px] transition-transform duration-200 [transform:rotate(var(--tilt))] group-hover:[transform:rotate(0deg)]"
            >
              {/* A window onto the cover rather than the whole of it. Reduced to
                  64px the drawing's hairlines vanish, so the print is rendered
                  at 320px and the square shows one part of it, at the scale the
                  featured print reads at. The part is seeded from the slug, so
                  every row shows a different piece of its own drawing and the
                  list does not repeat one mark five times. */}
              <span className="relative block h-full w-full overflow-hidden bg-paper-deep ring-1 ring-inset ring-ink/10">
                <Image
                  src={row.cover}
                  alt=""
                  width={320}
                  height={200}
                  sizes="320px"
                  className="absolute left-[var(--ox)] top-[var(--oy)] max-w-none -translate-x-1/2 -translate-y-1/2"
                />
              </span>
            </span>

            <span className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
              <span className="flex min-w-0 flex-col gap-1">
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
            </span>
          </Link>
        </motion.li>
      ))}
    </ul>
  );
}
