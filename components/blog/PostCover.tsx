import Image from "next/image";

import { DeskObject } from "@/components/objects/DeskObject";
import { Tape } from "@/components/objects/Tape";
import { coverFor } from "@/lib/objects";
import { cn } from "@/lib/utils";

type PostCoverProps = {
  /** Post slug. Picks the generated cover and seeds the resting angle. */
  slug: string;
  /** Entrance order inside its section. */
  order?: number;
  /** Set on the one cover above the fold. */
  priority?: boolean;
  /** How wide the print renders, for the image srcset. */
  sizes?: string;
  className?: string;
};

/**
 * The post's cover as a mounted print: the drawing on a white card, a hairline
 * round the image, tape at two corners and its own shadow holding it off the
 * desk. The mount is what does the work, because the drawings are pale and a
 * pale drawing laid straight on warm paper has no edge to find. The image
 * carries no information a reader needs, so it is decorative and the title
 * beside it does the telling.
 */
export function PostCover({
  slug,
  order = 0,
  priority = false,
  sizes = "(min-width: 1024px) 480px, 100vw",
  className,
}: PostCoverProps) {
  return (
    <DeskObject
      id={`cover-${slug}`}
      order={order}
      tilt={1.8}
      className={cn("relative w-full", className)}
    >
      <div className="shadow-lift rounded-sm border border-rule bg-[#FBFAF6] p-3 sm:p-4">
        <div className="overflow-hidden rounded-[2px] bg-paper-deep ring-1 ring-inset ring-ink/10">
          <Image
            src={coverFor(slug)}
            alt=""
            width={1200}
            height={750}
            priority={priority}
            sizes={sizes}
            className="w-full"
          />
        </div>
      </div>
      <Tape id={slug} length={92} className="absolute -left-3 -top-4 sm:-left-5" />
      <Tape
        id={`${slug}-foot`}
        length={92}
        className="absolute -bottom-4 -right-3 sm:-right-5"
      />
    </DeskObject>
  );
}
