import Image from "next/image";
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
import { coverFor, deskAssets } from "@/lib/objects";
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

/**
 * The generated covers, printed faint on the desk under the objects: the same
 * flow fields that head each project page, seeded from the slug.
 */
const WASHES: ReadonlyArray<{ slug: string; className: string }> = [
  {
    slug: "cetus",
    className: "-left-24 top-20 h-72 w-72 -rotate-6 sm:h-96 sm:w-96",
  },
  {
    slug: "kairo",
    className: "-right-24 top-1/3 h-72 w-72 rotate-12 sm:h-[28rem] sm:w-[28rem]",
  },
  {
    slug: "cyberbrain-ids",
    className: "bottom-4 left-1/4 hidden h-80 w-80 -rotate-3 lg:block",
  },
];

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
        className="w-full max-w-[13rem]"
      />
    ) : (
      <Polaroid
        id={`work-${item.slug}`}
        order={order}
        caption="cetus-one.vercel.app"
        className="w-full max-w-[13rem]"
      />
    ),

  kairo: (item, order) => (
    <GraphCard id={`work-${item.slug}`} order={order} className="w-full">
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
      className="w-full"
    />
  ),

  mailtrail: (item, order) => (
    <IndexCard
      id={`work-${item.slug}`}
      order={order}
      label="How a test goes out"
      className="w-full"
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
      className="w-full max-w-[14rem]"
    >
      <div className="flex min-h-full flex-col">
        <p className="font-mono text-meta uppercase tracking-[0.14em] text-ink-meta">
          The brief
        </p>
        <p className="mt-3 font-display text-lead text-ink">No checkout</p>
        <p className="mt-2 text-small text-ink-body">
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
      className="w-full"
    >
      {item.blurb}
    </IndexCard>
  );
}

export function WorkCollage() {
  const projects = getWork();

  return (
    <section className="relative py-8 sm:py-12 lg:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        {WASHES.map((wash) => (
          <span
            key={wash.slug}
            className={cn(
              "absolute overflow-hidden rounded-full opacity-[0.3] mix-blend-multiply [mask-image:radial-gradient(closest-side,#000,transparent)]",
              wash.className,
            )}
          >
            <Image
              src={coverFor(wash.slug)}
              alt=""
              fill
              sizes="384px"
              className="object-cover"
            />
          </span>
        ))}
      </div>

      <h2 className="max-w-prose font-display text-section text-ink sm:text-display">
        Five things I have shipped. Each one has a page with what it runs on and{" "}
        <Annotation kind="underline" delay={0.2}>
          what broke
        </Annotation>
        .
      </h2>

      {/* One structure per item: the object, then the title, the meta line and
          one sentence, on a single spacing scale. The object sits in a slot of
          fixed height and rests on its floor, so every caption in a row starts
          on the same line. */}
      <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-8 sm:mt-12 sm:gap-y-12 lg:grid-cols-2 xl:grid-cols-3">
        {projects.map((item, i) => (
          <li key={item.slug}>
            <Link
              href={`/work/${item.slug}`}
              className="group flex h-full flex-col rounded-sm"
            >
              <div className="flex items-end lg:min-h-[20rem]">
                {objectFor(item, i + 1)}
              </div>
              <h3 className="mt-5">
                <Handwriting
                  id={`caption-${item.slug}`}
                  size="lg"
                  className="text-ink transition-colors duration-200 group-hover:text-accent"
                >
                  {item.title}
                </Handwriting>
              </h3>
              <p className="mt-1 font-mono text-meta uppercase tracking-[0.14em] text-ink-meta">
                {item.kind} &middot; {item.period}
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
