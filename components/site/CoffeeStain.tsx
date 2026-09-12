import Image from "next/image";

import { textures } from "@/lib/objects";

/**
 * Where the mug stood, once, on the left edge of the desk.
 *
 * It is fixed rather than parked in a section because a stain belongs to the
 * desk, not to whatever is being read on it, and it must never cross a line of
 * type. It appears only from 1400px up, which is the first width where the
 * 1200px column leaves a gutter deep enough to hold it: the ring is 150px wide
 * and hangs 32px off the left edge of the viewport, so its right edge reaches
 * 118px while the text column starts at 132px at that width, and further away
 * at every width above it.
 *
 * The generated ring already tops out at 33% alpha, so it only needs a multiply
 * to sit in the paper rather than on it.
 */
export function CoffeeStain() {
  return (
    <div
      aria-hidden
      data-decoration
      className="pointer-events-none fixed bottom-28 -left-8 z-0 hidden opacity-80 mix-blend-multiply min-[1400px]:block"
    >
      <Image
        src={textures.coffeeRing}
        alt=""
        width={150}
        height={150}
        sizes="150px"
        className="h-[150px] w-[150px] -rotate-6"
      />
    </div>
  );
}
