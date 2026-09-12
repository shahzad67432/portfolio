import type { ReactNode } from "react";

import { DeskObject } from "@/components/objects/DeskObject";
import { cn } from "@/lib/utils";

type StickyNoteProps = {
  /** Stable id. Drives the resting angle. */
  id: string;
  children: ReactNode;
  /** Which corner has lifted off the desk. */
  curl?: "bottom-right" | "bottom-left";
  order?: number;
  className?: string;
};

/**
 * A square yellow note in the highlighter tone, written on by hand, with one
 * corner peeled up: a wedge of the paper underneath, a hard shadow along the
 * fold, and the adhesive line still holding the top edge flat.
 */
export function StickyNote({
  id,
  children,
  curl = "bottom-right",
  order = 0,
  className,
}: StickyNoteProps) {
  const right = curl === "bottom-right";
  const angle = right ? "315deg" : "45deg";

  return (
    <DeskObject
      id={id}
      order={order}
      tilt={2.4}
      className={cn("w-56", className)}
    >
      <div className="shadow-rest relative aspect-square overflow-hidden bg-highlight p-5">
        {/* the adhesive strip: the top band sits flatter, so it reads darker */}
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-6"
          style={{
            background:
              "linear-gradient(180deg, rgba(17,17,16,0.06), rgba(17,17,16,0))",
          }}
        />
        <div className="relative font-hand text-xl leading-snug text-ink">
          {children}
        </div>
        <span
          aria-hidden
          className={cn("absolute bottom-0 h-12 w-12", right ? "right-0" : "left-0")}
          style={{
            backgroundImage: [
              `linear-gradient(${angle}, rgb(var(--paper)) 0 44%, rgba(17,17,16,0.22) 45%, rgba(17,17,16,0.05) 54%, rgba(17,17,16,0) 64%)`,
            ].join(", "),
          }}
        />
      </div>
    </DeskObject>
  );
}
