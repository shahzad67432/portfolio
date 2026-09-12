import Link from "next/link";

import { DeskObject } from "@/components/objects/DeskObject";
import { Handwriting } from "@/components/objects/Handwriting";
import { Tape } from "@/components/objects/Tape";
import { seeded } from "@/lib/utils";

/**
 * A sheet torn off across the bottom. The edge is deterministic: 28 notches, each
 * one seeded from its index, so the server and the client tear the paper the same
 * way. `back` is the fibre core showing under the tear, so it runs a little lower.
 */
function tornEdge(seed: string, base: number, depth: number): string {
  const steps = 28;
  const points = ["0% 0%", "100% 0%"];
  for (let i = steps; i >= 0; i -= 1) {
    const x = (i / steps) * 100;
    const wave = Math.sin(i * 0.85) * 1.6;
    const y = base + wave + seeded(`${seed}-${i}`) * depth;
    points.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
  }
  return `polygon(${points.join(", ")})`;
}

const TEAR_FRONT = tornEdge("tear-front", 90, 3.4);
const TEAR_BACK = tornEdge("tear-back", 93, 3.4);

/** The contact shadow from globals.css, as a filter, because box-shadow is clipped away. */
const CONTACT =
  "drop-shadow(0 1px 1px rgba(17,17,16,0.08)) drop-shadow(0 14px 18px rgba(17,17,16,0.18))";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-desk px-5 sm:px-8">
      <section className="flex min-h-[70vh] flex-col items-center justify-center py-16 sm:py-24">
        <DeskObject
          id="not-found-sheet"
          tilt={1.8}
          className="relative w-full max-w-[30rem]"
        >
          <Tape
            id="not-found"
            length={128}
            className="absolute -top-3 left-10 z-20"
          />
          <div className="relative" style={{ filter: CONTACT }}>
            <span
              aria-hidden
              className="absolute inset-0 bg-paper-shade"
              style={{ clipPath: TEAR_BACK }}
            />
            <div
              className="relative bg-[#FBFAF6] px-7 pb-28 pt-12 sm:px-10"
              style={{ clipPath: TEAR_FRONT }}
            >
              <p className="font-mono text-meta uppercase tracking-[0.14em] text-ink-meta">
                404
              </p>
              <h1 className="mt-3 font-display text-section text-ink sm:text-display">
                This page is not on the desk
              </h1>
              <p className="mt-4 max-w-[34ch] text-small text-ink-body sm:text-body">
                The link points at something that moved, or was never here.
              </p>
              <Link
                href="/"
                className="mt-7 inline-flex min-h-11 items-center gap-2 text-small text-ink underline decoration-accent decoration-1 underline-offset-[6px] transition-colors duration-200 hover:text-accent"
              >
                Back to the desk
                <span aria-hidden>&rarr;</span>
              </Link>
            </div>
          </div>
        </DeskObject>

        <Handwriting
          id="not-found-caption"
          size="sm"
          className="mt-7 text-ink-meta"
        >
          the rest of the sheet is missing
        </Handwriting>
      </section>
    </div>
  );
}
