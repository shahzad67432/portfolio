import Link from "next/link";
import type { ReactNode } from "react";

import {
  Annotation,
  GraphCard,
  Handwriting,
  IndexCard,
  PaperSheet,
  Polaroid,
  TerminalCard,
} from "@/components/objects";
import { hasPublicAsset } from "@/components/home/publicAsset";
import { getWork, type Work } from "@/lib/content";
import { deskAssets } from "@/lib/objects";
import { cn } from "@/lib/utils";

const CETUS_PHOTO = "/objects/cetus.png";

/** The three stages a Kairo film passes through, and what it comes out as. */
const KAIRO_STAGES: ReadonlyArray<readonly [string, string]> = [
  ["Writer", "10 scenes, routed through OmniRoute"],
  ["TTS", "edge_tts word boundary timestamps"],
  ["Aligner", "every scene against 2.25 words per second"],
  ["EDL", "written from the JSON scene definitions"],
];

/** A printout of what CyberBrain reads, and what it writes. */
const CYBERBRAIN_LINES = [
  "window      5 seconds, rolling",
  "features    22+ per packet",
  "ensemble    random forest + xgboost",
  "report      rag over chroma, mapped to mitre att&ck",
  "follow up   6 turns per incident",
] as const;

const MAILTRAIL_LINES = [
  "An organization adds its people.",
  "An LLM writes the test.",
  "It goes out from their own domain.",
  "Answers come back graded.",
] as const;

/** Where each project sits on the desk. A 12 column grid, deliberately ragged. */
const PLACE: Record<string, string> = {
  cetus: "lg:col-span-5 lg:col-start-1",
  kairo: "lg:col-span-5 lg:col-start-8 lg:mt-20",
  "cyberbrain-ids": "lg:col-span-6 lg:col-start-2",
  mailtrail: "lg:col-span-5 lg:col-start-8 lg:mt-14",
  "console-marketplace": "lg:col-span-4 lg:col-start-3 lg:mt-8",
};

type Renderer = (item: Work, order: number) => ReactNode;

const OBJECTS: Record<string, Renderer> = {
  cetus: (item, order) =>
    hasPublicAsset(CETUS_PHOTO) ? (
      <Polaroid
        id={`work-${item.slug}`}
        order={order}
        src={CETUS_PHOTO}
        alt={deskAssets.cetusPolaroid.alt}
        caption="cetus-one.vercel.app"
        className="w-full max-w-xs"
      />
    ) : (
      <Polaroid
        id={`work-${item.slug}`}
        order={order}
        caption="cetus-one.vercel.app"
        className="w-full max-w-xs"
      />
    ),

  kairo: (item, order) => (
    <GraphCard
      id={`work-${item.slug}`}
      order={order}
      className="w-full max-w-md lg:max-w-none"
    >
      <p className="font-mono text-meta uppercase tracking-[0.14em] text-ink-meta">
        The pipeline
      </p>
      <ol className="mt-4 space-y-3">
        {KAIRO_STAGES.map(([stage, detail]) => (
          <li key={stage} className="flex flex-wrap items-baseline gap-x-3">
            <Handwriting
              id={`kairo-${stage}`}
              className="w-20 shrink-0 text-ink"
            >
              {stage}
            </Handwriting>
            <span className="text-small text-ink-body">{detail}</span>
          </li>
        ))}
      </ol>
    </GraphCard>
  ),

  "cyberbrain-ids": (item, order) => (
    <TerminalCard
      id={`work-${item.slug}`}
      order={order}
      title="cyberbrain / live traffic"
      lines={CYBERBRAIN_LINES}
      className="w-full max-w-md lg:max-w-none"
    />
  ),

  mailtrail: (item, order) => (
    <IndexCard
      id={`work-${item.slug}`}
      order={order}
      label="How a test goes out"
      className="w-full max-w-md lg:max-w-none"
    >
      {MAILTRAIL_LINES.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </IndexCard>
  ),

  "console-marketplace": (item, order) => (
    <PaperSheet
      id={`work-${item.slug}`}
      order={order}
      crease="horizontal"
      className="w-full max-w-sm lg:max-w-none"
    >
      <div className="flex h-full flex-col">
        <p className="font-mono text-meta uppercase tracking-[0.14em] text-ink-meta">
          The brief
        </p>
        <p className="mt-4 font-display text-title text-ink">No checkout</p>
        <p className="mt-3 text-small text-ink-body">
          The seller submits the device. The platform quotes a price. On
          acceptance, both sides carry on over email.
        </p>
        <p className="mt-auto text-meta text-ink-meta">
          One of five plus apps for clients in the USA and Europe. 100%
          completion, 5 star rating.
        </p>
      </div>
    </PaperSheet>
  ),
};

function objectFor(item: Work, order: number): ReactNode {
  const render = OBJECTS[item.slug];
  if (render) return render(item, order);
  return (
    <IndexCard
      id={`work-${item.slug}`}
      order={order}
      label={item.kind}
      className="w-full max-w-md lg:max-w-none"
    >
      {item.blurb}
    </IndexCard>
  );
}

export function WorkCollage() {
  const projects = getWork();

  return (
    <section className="pb-24 lg:pb-32">
      <h2 className="max-w-prose font-display text-section text-ink sm:text-display">
        Five things I have shipped. Each one has a page with what it runs on and{" "}
        <Annotation kind="underline" delay={0.2}>
          what broke
        </Annotation>
        .
      </h2>

      <ul className="mt-16 grid grid-cols-1 items-start gap-x-8 gap-y-20 lg:mt-24 lg:grid-cols-12">
        {projects.map((item, i) => (
          <li key={item.slug} className={cn(PLACE[item.slug])}>
            <Link
              href={`/work/${item.slug}`}
              className="group block rounded-sm"
            >
              {objectFor(item, i + 1)}
              <h3 className="mt-6">
                <Handwriting
                  id={`caption-${item.slug}`}
                  size="lg"
                  className="text-ink transition-colors duration-200 group-hover:text-accent"
                >
                  {item.title}
                </Handwriting>
              </h3>
              <p className="mt-1 font-mono text-meta uppercase tracking-[0.14em] text-ink-meta">
                {item.kind} · {item.period}
              </p>
              <p className="mt-3 max-w-prose text-small text-ink-body">
                {item.blurb}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
