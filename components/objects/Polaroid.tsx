import Image from "next/image";

import { DeskObject } from "@/components/objects/DeskObject";
import { Handwriting } from "@/components/objects/Handwriting";
import { cn } from "@/lib/utils";

type PolaroidProps = {
  /** Stable id. Drives the resting angle and the angle of the caption. */
  id: string;
  /** Written under the photo in Caveat, the way you label a print. */
  caption: string;
  order?: number;
  className?: string;
} & ({ src: string; alt: string } | { src?: undefined; alt?: undefined });

/**
 * A print: square photo, thick white border, heavier at the foot, caption
 * written across the bottom. Drop the src and it renders an empty photo well,
 * which is what sits there until the real shot is taken.
 */
export function Polaroid({
  id,
  caption,
  order = 0,
  className,
  src,
  alt,
}: PolaroidProps) {
  return (
    <DeskObject
      id={id}
      order={order}
      tilt={2.6}
      className={cn("w-60", className)}
    >
      <figure className="shadow-rest rounded-sm bg-[#FBFAF6] px-3 pb-1 pt-3">
        <div className="relative aspect-square overflow-hidden bg-paper-deep">
          {src ? (
            <Image
              src={src}
              alt={alt}
              fill
              sizes="240px"
              className="object-cover"
            />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center font-mono text-meta uppercase tracking-[0.12em] text-ink-meta">
              photo pending
            </span>
          )}
        </div>
        <figcaption className="flex min-h-14 items-center justify-center px-2 text-center">
          <Handwriting id={id} className="text-ink">
            {caption}
          </Handwriting>
        </figcaption>
      </figure>
    </DeskObject>
  );
}
