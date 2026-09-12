import type { ReactNode } from "react";

import { DeskObject } from "@/components/objects/DeskObject";
import { cn } from "@/lib/utils";

type PaperSheetProps = {
  /** Stable id. Drives the resting angle. */
  id: string;
  children: ReactNode;
  /** Where the sheet was folded before it was flattened out again. */
  crease?: "vertical" | "horizontal" | "none";
  order?: number;
  className?: string;
};

const CREASE: Record<"vertical" | "horizontal", string> = {
  vertical:
    "linear-gradient(90deg, rgba(17,17,16,0) 49.2%, rgba(17,17,16,0.06) 49.8%, rgba(255,255,255,0.9) 50.3%, rgba(17,17,16,0) 51%)",
  horizontal:
    "linear-gradient(180deg, rgba(17,17,16,0) 49.2%, rgba(17,17,16,0.06) 49.8%, rgba(255,255,255,0.9) 50.3%, rgba(17,17,16,0) 51%)",
};

/**
 * An A4 sheet. Whiter than the desk, squared corners, and one faint crease
 * where it was folded to fit an envelope. Pass `aspect-auto` in className when
 * the content should set the height instead.
 */
export function PaperSheet({
  id,
  children,
  crease = "vertical",
  order = 0,
  className,
}: PaperSheetProps) {
  return (
    <DeskObject
      id={id}
      order={order}
      tilt={1.6}
      className={cn("w-[26rem] max-w-full", className)}
    >
      <div className="shadow-rest relative aspect-[210/297] rounded-sm bg-[#FBFAF6] p-8">
        {crease === "none" ? null : (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ backgroundImage: CREASE[crease] }}
          />
        )}
        <div className="relative h-full">{children}</div>
      </div>
    </DeskObject>
  );
}
