import type { Metadata } from "next";
import Image from "next/image";
import { Fragment } from "react";

import { QaoaDepth } from "@/components/diagrams/QaoaDepth";
import { hasPublicAsset } from "@/components/home/publicAsset";
import {
  BoardingPass,
  DeskObject,
  Handwriting,
  Marginalia,
  PaperSheet,
  StampAccepted,
  Tape,
} from "@/components/objects";
import { profile } from "@/content/profile";
import { getResearch } from "@/lib/content";
import { coverFor, deskAssets } from "@/lib/objects";

const research = getResearch();

const SUMMARY = `${research.authorship} on the A-HQCA paper: noise-aware QAOA that picks circuit depth from live calibration, and federated learning that does not trust the clients training it. ${research.status} at ${research.venue}, ${research.location}.`;

export const metadata: Metadata = {
  title: "Research",
  description: SUMMARY,
  alternates: { canonical: "/research" },
  openGraph: {
    type: "article",
    title: `${research.venue} · ${profile.name}`,
    description: SUMMARY,
    url: "/research",
    images: [{ url: coverFor("a-hqca"), width: 1200, height: 750, alt: SUMMARY }],
  },
};

/** The printed page, stamped, with a strip of tape holding it to the desk. */
function PaperObject() {
  const page = deskAssets.paperPage;

  return (
    <div className="relative mx-auto w-full max-w-[26rem]">
      {hasPublicAsset(page.src) ? (
        <DeskObject id="research-hero" order={1} tilt={1.6}>
          <div className="shadow-rest relative overflow-hidden rounded-sm bg-paper">
            <Image
              src={page.src}
              alt={page.alt}
              width={page.width}
              height={page.height}
              sizes="(min-width: 640px) 416px, 90vw"
              priority
              className="w-full"
            />
            <StampAccepted
              id="research-hero"
              size={240}
              className="absolute bottom-10 left-6"
            />
          </div>
        </DeskObject>
      ) : (
        <PaperSheet id="research-hero" order={1} className="w-full">
          <div className="flex h-full flex-col">
            <p className="font-mono text-meta uppercase tracking-[0.14em] text-ink-meta">
              {research.venue}
            </p>
            <p className="mt-4 font-display text-title text-ink">
              {research.title}
            </p>
            <StampAccepted
              id="research-hero"
              size={200}
              className="absolute bottom-4 left-2"
            />
          </div>
        </PaperSheet>
      )}
      <Tape id="research-hero" length={120} className="absolute -top-3 left-14" />
    </div>
  );
}

/** Venue, status and what it runs on, in the same strip a project page uses. */
function ResearchMeta() {
  const rows: ReadonlyArray<readonly [string, string]> = [
    ["Venue", `${research.venue}, ${research.location}`],
    ["Dates", research.dates],
    ["Status", `${research.status}, ${research.authorship.toLowerCase()}`],
    [
      "Proceedings",
      `${research.proceedings}, indexed by ${research.indexing.join(" and ")}`,
    ],
  ];

  return (
    <dl className="mx-auto mt-12 grid max-w-index gap-x-10 gap-y-6 border-y border-rule py-6 sm:mt-14 sm:grid-cols-2">
      {rows.map(([term, value]) => (
        <div key={term}>
          <dt className="font-mono text-meta uppercase tracking-[0.14em] text-ink-meta">
            {term}
          </dt>
          <dd className="mt-1.5 text-small text-ink">{value}</dd>
        </div>
      ))}
      <div className="sm:col-span-2">
        <dt className="font-mono text-meta uppercase tracking-[0.14em] text-ink-meta">
          Built on
        </dt>
        <dd className="mt-2.5">
          <ul className="flex flex-wrap gap-2">
            {research.stack.map((tool) => (
              <li
                key={tool}
                className="rounded-full border border-rule px-3 py-1 font-mono text-meta uppercase tracking-[0.1em] text-ink-body"
              >
                {tool}
              </li>
            ))}
          </ul>
        </dd>
      </div>
    </dl>
  );
}

/** The diagram, and the paragraph it belongs after. */
const FIGURE = {
  after: 1,
  caption:
    "Solution quality against circuit depth. The peak moves with the day's calibration, which is why the depth is chosen per call rather than fixed once.",
};

export default function ResearchPage() {
  return (
    <div className="mx-auto w-full max-w-desk px-5 pb-24 pt-6 sm:px-8">
      <article>
        <header className="mx-auto max-w-index pt-4">
          <p className="font-mono text-meta uppercase tracking-[0.16em] text-accent">
            Research · {research.authorship}
          </p>
          <h1 className="mt-3 font-display text-section leading-[1.2] text-ink sm:text-display">
            {research.title}
          </h1>
          <p className="mt-5 max-w-prose text-lead text-ink-body">
            {research.status} at {research.venueLong}, held in{" "}
            {research.location} from {research.dates}.
          </p>
        </header>

        <div className="mt-10 sm:mt-12">
          <PaperObject />
        </div>

        <ResearchMeta />

        <section aria-labelledby="abstract-heading" className="mt-16 sm:mt-20">
          <div className="mx-auto max-w-prose">
            <h2
              id="abstract-heading"
              className="font-display text-section text-ink"
            >
              Abstract
            </h2>
            <div className="mt-6 space-y-6">
              {research.abstract.map((paragraph, i) => (
                <p
                  key={paragraph}
                  className={
                    i === 0 ? "text-lead text-ink" : "text-body text-ink-body"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="results-heading" className="mt-16 sm:mt-20">
          <div className="relative mx-auto max-w-prose">
            <h2
              id="results-heading"
              className="font-display text-section text-ink"
            >
              What it measures
            </h2>
            <Marginalia id="research-figures">
              every number here is from the accepted manuscript
            </Marginalia>
            <dl className="mt-6">
              {research.figures.map((figure) => (
                <div key={figure.id} className="border-t border-rule py-5">
                  <dt className="text-small text-ink">{figure.label}</dt>
                  <dd className="mt-2 font-mono text-title text-ink">
                    <span className="sr-only">from </span>
                    <span className="text-ink-meta">{figure.from}</span>
                    <span aria-hidden className="px-3 text-accent">
                      &rarr;
                    </span>
                    <span className="sr-only">to </span>
                    {figure.to}
                  </dd>
                  <dd className="mt-2 text-small text-ink-body">
                    {figure.note}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section aria-labelledby="paper-heading" className="mt-16 sm:mt-20">
          <div className="mx-auto max-w-prose">
            <h2
              id="paper-heading"
              className="font-display text-section text-ink"
            >
              What is in the paper
            </h2>
            <div className="mt-6 space-y-6">
              {research.body.map((paragraph, i) => (
                <Fragment key={paragraph}>
                  <p className="text-body text-ink-body">{paragraph}</p>
                  {FIGURE.after === i ? (
                    <figure className="!mt-10">
                      <QaoaDepth />
                      <figcaption className="mt-4 text-meta leading-relaxed text-ink-meta">
                        {FIGURE.caption}
                      </figcaption>
                    </figure>
                  ) : null}
                </Fragment>
              ))}
            </div>
          </div>
        </section>
      </article>

      <section
        aria-labelledby="presenting-heading"
        className="mx-auto mt-20 max-w-index sm:mt-24"
      >
        <h2 id="presenting-heading" className="font-display text-section text-ink">
          Where it gets presented
        </h2>
        <p className="mt-4 max-w-prose text-body text-ink-body">
          {research.venue} runs in {research.location} from {research.dates}.
          The paper is presented there, and appears afterwards in{" "}
          {research.proceedings}.
        </p>
        <div className="mt-10 flex flex-col items-start gap-3">
          <BoardingPass id="research-trip" order={1} />
          <Handwriting id="research-trip-note" className="ml-2 text-ink-meta">
            no flight number yet
          </Handwriting>
        </div>
      </section>
    </div>
  );
}
