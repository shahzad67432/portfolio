import Link from "next/link";

import { ExternalLink, hostOf } from "@/components/work/ExternalLink";
import { WorkObject } from "@/components/work/WorkObject";
import type { Work } from "@/lib/content";
import { cn } from "@/lib/utils";

type WorkHeroProps = {
  item: Work;
  className?: string;
};

/**
 * The featured project, given the whole width of the desk: the object on the
 * left, bleeding toward the edge, and the reading on the right in a column that
 * never does.
 */
export function WorkHero({ item, className }: WorkHeroProps) {
  const live = item.links.live;

  return (
    <article
      className={cn(
        "grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14",
        className,
      )}
    >
      <WorkObject
        item={item}
        variant="hero"
        order={0}
        className="lg:-ml-6 xl:-ml-10"
      />

      <div className="max-w-prose">
        <p className="font-mono text-meta uppercase tracking-[0.16em] text-accent">
          {item.kind}
          {live ? " · live" : null}
        </p>
        <h3 className="mt-3 font-display text-display leading-tight text-ink">
          {item.title}
        </h3>
        <p className="mt-4 text-lead text-ink-body">{item.blurb}</p>
        <p className="mt-4 text-small text-ink-meta">
          {item.role} {item.period}.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-8">
          <Link
            href={`/work/${item.slug}`}
            className="group inline-flex min-h-11 items-center gap-2 text-small text-ink transition-colors duration-200 hover:text-accent"
          >
            <span className="underline decoration-rule underline-offset-4 transition-colors duration-200 group-hover:decoration-accent">
              Read about {item.title}
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
              <path d="M2.5 8h11" />
              <path d="M9 3.5 13.5 8 9 12.5" />
            </svg>
          </Link>
          {live ? <ExternalLink href={live}>{hostOf(live)}</ExternalLink> : null}
        </div>
      </div>
    </article>
  );
}
