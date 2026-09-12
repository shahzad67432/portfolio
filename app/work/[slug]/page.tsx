import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";

import { CetusArchitecture } from "@/components/diagrams/CetusArchitecture";
import { KairoPipeline } from "@/components/diagrams/KairoPipeline";
import { Handwriting } from "@/components/objects/Handwriting";
import { ExternalLink, hostOf } from "@/components/work/ExternalLink";
import { MetaStrip } from "@/components/work/MetaStrip";
import { WorkObject } from "@/components/work/WorkObject";
import { WorkPager } from "@/components/work/WorkPager";
import { getAdjacentWork, getWork, getWorkBySlug } from "@/lib/content";
import { profile } from "@/content/profile";

type WorkPageProps = {
  params: { slug: string };
};

/** One page per project, all of them built at compile time. */
export function generateStaticParams(): Array<{ slug: string }> {
  return getWork().map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: WorkPageProps): Metadata {
  const item = getWorkBySlug(params.slug);
  if (!item) return { title: "Project not found" };

  return {
    title: item.title,
    description: item.blurb,
    openGraph: {
      type: "article",
      title: `${item.title} · ${profile.name}`,
      description: item.blurb,
    },
  };
}

/**
 * The drawn figures that belong to a project, and the paragraph they sit after.
 * Each one goes in directly under the prose that describes it, so the reader
 * meets the drawing while the words are still in view.
 */
const FIGURES: Record<
  string,
  { after: number; caption: string; render: () => JSX.Element }
> = {
  cetus: {
    after: 2,
    caption:
      "One internal API in front of Flow, Qwen and edge-tts. The worker pool reports every job back on a single stream.",
    render: () => <CetusArchitecture />,
  },
  kairo: {
    after: 1,
    caption:
      "Writer, TTS, Aligner, EDL. The word timings edge_tts hands back are what let the Aligner check a scene against 2.25 words per second before anything is cut.",
    render: () => <KairoPipeline />,
  },
};

export default function WorkDetailPage({ params }: WorkPageProps) {
  const item = getWorkBySlug(params.slug);
  if (!item) notFound();

  const { prev, next } = getAdjacentWork(item.slug);
  const figure = FIGURES[item.slug];
  const { live, repo } = item.links;

  return (
    <div className="mx-auto w-full max-w-desk px-5 pb-24 pt-6 sm:px-8">
      <Link
        href="/work"
        className="group inline-flex min-h-11 items-center gap-2 text-small text-ink-body transition-colors duration-200 hover:text-ink"
      >
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
          <path d="M13.5 8h-11" />
          <path d="M7 3.5 2.5 8 7 12.5" />
        </svg>
        Back to work
      </Link>

      <article>
        <header className="mx-auto mt-8 max-w-index">
          <p className="font-mono text-meta uppercase tracking-[0.16em] text-accent">
            {item.kind}
          </p>
          <h1 className="mt-3 font-display text-display leading-tight text-ink sm:text-hero">
            {item.title}
          </h1>
        </header>

        <div className="mx-auto mt-10 flex max-w-index justify-center sm:mt-12">
          <WorkObject item={item} variant="hero" order={0} />
        </div>

        <MetaStrip item={item} className="mx-auto mt-12 max-w-index sm:mt-14" />

        <div className="mx-auto mt-12 max-w-prose space-y-6">
          {item.body.map((paragraph, i) => (
            <Fragment key={paragraph}>
              <p
                className={
                  i === 0 ? "text-lead text-ink" : "text-body text-ink-body"
                }
              >
                {paragraph}
              </p>
              {figure && figure.after === i ? (
                <figure className="!mt-12 sm:-mx-10 lg:-mx-24">
                  {/* The diagram is wider than a phone. It pans instead of
                      shrinking to illegibility, and the fade plus the note say so. */}
                  <div className="relative">
                    <div
                      role="group"
                      tabIndex={0}
                      aria-label={`${item.title} diagram`}
                      className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:overflow-visible sm:px-0"
                    >
                      <div className="min-w-[34rem] sm:min-w-0">
                        {figure.render()}
                      </div>
                    </div>
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-paper to-transparent sm:hidden"
                    />
                  </div>
                  <p className="mt-2 font-mono text-meta uppercase tracking-[0.12em] text-ink-meta sm:hidden">
                    Drag the diagram sideways to see the rest
                  </p>
                  <figcaption className="mt-5 max-w-[60ch] sm:mx-10 lg:mx-24">
                    <Handwriting
                      id={`figure-${item.slug}`}
                      className="text-ink-body"
                    >
                      {figure.caption}
                    </Handwriting>
                  </figcaption>
                </figure>
              ) : null}
            </Fragment>
          ))}
        </div>

        {live || repo ? (
          <div className="mx-auto mt-10 flex max-w-prose flex-wrap items-center gap-x-8 border-t border-rule pt-4">
            {live ? <ExternalLink href={live}>{hostOf(live)}</ExternalLink> : null}
            {repo ? <ExternalLink href={repo}>Repository</ExternalLink> : null}
          </div>
        ) : null}
      </article>

      <WorkPager
        prev={prev}
        next={next}
        className="mx-auto mt-20 max-w-index sm:mt-24"
      />
    </div>
  );
}
