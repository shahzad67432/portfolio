import Image from "next/image";
import type { ReactElement } from "react";

import { KairoPipeline } from "@/components/diagrams/KairoPipeline";
import { DeskObject } from "@/components/objects/DeskObject";
import { GraphCard } from "@/components/objects/GraphCard";
import { Handwriting } from "@/components/objects/Handwriting";
import { IndexCard } from "@/components/objects/IndexCard";
import { PaperSheet } from "@/components/objects/PaperSheet";
import { Tape } from "@/components/objects/Tape";
import { TerminalCard } from "@/components/objects/TerminalCard";
import type { Work } from "@/lib/content";
import { coverFor, deskAssets, type DeskAsset } from "@/lib/objects";
import { cn } from "@/lib/utils";

type WorkObjectProps = {
  item: Work;
  /** A thumbnail in the grid, or the one object a page is built around. */
  variant?: "thumb" | "hero";
  /** Entrance order inside its section. */
  order?: number;
  className?: string;
};

/**
 * The screenshots that exist, each with the line written under the print by
 * hand. Anything else falls back to its generated cover, uncaptioned.
 */
const SHOTS: Record<string, { asset: DeskAsset; note: string }> = {
  cetus: { asset: deskAssets.cetusDesktop, note: "the composer, live" },
};

/**
 * How wide an object is allowed to get when it is the hero. An A4 sheet at the
 * full width of a column is a metre tall, so each object caps where it still
 * reads as the thing it is.
 */
const HERO_WIDTH: Record<Work["object"], string> = {
  polaroid: "w-full",
  graph: "w-full",
  terminal: "w-full max-w-2xl",
  index: "w-full max-w-lg",
  paper: "w-full max-w-sm",
};

/** A print of the real thing, taped to the desk at one corner. */
function Print({
  item,
  order,
  hero,
  className,
}: {
  item: Work;
  order: number;
  hero: boolean;
  className?: string;
}) {
  const shot: DeskAsset = SHOTS[item.slug]?.asset ?? {
    id: item.slug,
    src: coverFor(item.slug),
    alt: "",
    width: 1200,
    height: 750,
  };
  const caption = SHOTS[item.slug]?.note;

  return (
    <DeskObject
      id={`print-${item.slug}`}
      order={order}
      tilt={1.4}
      className={cn("relative", className)}
    >
      <Tape
        id={item.slug}
        length={hero ? 132 : 92}
        className="absolute -top-4 left-8 z-20"
      />
      <figure className="shadow-rest rounded-sm bg-[#FBFAF6] p-3 sm:p-4">
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          sizes={
            hero
              ? "(min-width: 1024px) 640px, 92vw"
              : "(min-width: 1024px) 340px, 92vw"
          }
          priority={hero}
          className="h-auto w-full rounded-sm"
        />
        {caption ? (
          <figcaption className="mt-3 px-1">
            <Handwriting id={`print-${item.slug}`} className="text-ink">
              {caption}
            </Handwriting>
          </figcaption>
        ) : null}
      </figure>
    </DeskObject>
  );
}

/**
 * A project as a thing on the desk. Which object it gets is a property of the
 * project, so Kairo is always graph paper and CyberBrain is always a printout.
 * Every word on every object comes out of content/work.ts.
 */
export function WorkObject({
  item,
  variant = "thumb",
  order = 0,
  className,
}: WorkObjectProps): ReactElement {
  const hero = variant === "hero";
  const width = hero ? HERO_WIDTH[item.object] : "w-full";
  const box = cn(width, className);

  switch (item.object) {
    case "polaroid":
      return <Print item={item} order={order} hero={hero} className={box} />;

    case "graph":
      return (
        <GraphCard id={`graph-${item.slug}`} order={order} className={box}>
          {hero && item.slug === "kairo" ? (
            <KairoPipeline />
          ) : (
            <>
              <Handwriting id={`graph-${item.slug}`} className="text-ink">
                {item.blurb}
              </Handwriting>
              <p className="mt-5 border-t border-rule pt-3 font-mono text-meta uppercase tracking-[0.1em] text-ink-meta">
                {item.stack.join(" · ")}
              </p>
            </>
          )}
        </GraphCard>
      );

    case "terminal":
      return (
        <TerminalCard
          id={`term-${item.slug}`}
          order={order}
          title={item.title}
          lines={item.stack}
          className={box}
        />
      );

    case "index":
      return (
        <IndexCard
          id={`card-${item.slug}`}
          order={order}
          label={item.kind}
          className={box}
        >
          {item.blurb}
        </IndexCard>
      );

    case "paper":
      return (
        <PaperSheet id={`sheet-${item.slug}`} order={order} className={box}>
          <div className="flex h-full flex-col">
            <p className="font-mono text-meta uppercase tracking-[0.14em] text-ink-meta">
              {item.kind}
            </p>
            <p className="mt-4 font-display text-title leading-snug text-ink">
              {item.blurb}
            </p>
            <p className="mt-auto border-t border-rule pt-3 font-mono text-meta uppercase tracking-[0.1em] text-ink-meta">
              {item.stack.join(" · ")}
            </p>
          </div>
        </PaperSheet>
      );
  }
}
