import Link from "next/link";

import { DeskObject } from "@/components/objects/DeskObject";
import { StampAccepted } from "@/components/objects/StampAccepted";
import type { Research } from "@/lib/content";

/**
 * The paper, as the printed thing it is: a sheet resting on the desk with the
 * acceptance stamped across the corner, three measured results, and a link to
 * the full write-up. Every figure comes from the manuscript.
 */
export function ResearchCallout({ research }: { research: Research }) {
  return (
    <DeskObject id="about-research" tilt={0.8} order={1}>
      <article className="shadow-rest relative rounded-sm border border-rule bg-paper px-6 py-8 sm:px-10 sm:py-10">
        <StampAccepted
          id="about-paper"
          date="25 NOV 2026"
          size={186}
          className="absolute -top-7 right-6 hidden lg:block"
        />

        <p className="font-mono text-meta uppercase tracking-[0.14em] text-ink-meta">
          Research · {research.authorship}
        </p>
        <h2 className="mt-3 max-w-[34ch] font-display text-title leading-[1.25] text-ink sm:text-section lg:max-w-[24ch]">
          {research.title}
        </h2>
        <p className="mt-4 max-w-prose text-small text-ink-body">
          {research.status} at {research.venue}, {research.location},{" "}
          {research.dates}. To appear in {research.proceedings}, indexed by{" "}
          {research.indexing.join(" and ")}.
        </p>

        <ul className="mt-8 max-w-prose">
          {research.figures.map((figure) => (
            <li
              key={figure.id}
              className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-dotted border-rule py-3 last:border-b-0"
            >
              <span className="text-small text-ink-body">{figure.label}</span>
              <span className="font-mono text-meta text-ink-meta">
                {figure.from}
                <span aria-hidden> → </span>
                <span className="sr-only"> to </span>
                <span className="text-ink">{figure.to}</span>
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-6 font-mono text-meta uppercase tracking-[0.1em] text-ink-meta">
          {research.stack.join(" · ")}
        </p>

        <Link
          href="/research"
          className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full border border-accent px-5 text-small text-accent transition-colors duration-200 hover:bg-accent hover:text-paper"
        >
          Read the paper
          <span aria-hidden>→</span>
        </Link>
      </article>
    </DeskObject>
  );
}
