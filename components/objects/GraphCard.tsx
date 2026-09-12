import type { ReactNode } from "react";

import { DeskObject } from "@/components/objects/DeskObject";
import { cn } from "@/lib/utils";

type GraphCardProps = {
  /** Stable id. Drives the resting angle. */
  id: string;
  children: ReactNode;
  /** Minor square in px. Every fifth line is drawn darker. */
  square?: number;
  order?: number;
  className?: string;
};

/**
 * Graph paper, drawn with four gradients rather than an image: two thin lines
 * every square, two darker ones every fifth. Good ground for a hand-drawn
 * diagram or a written list.
 */
export function GraphCard({
  id,
  children,
  square = 16,
  order = 0,
  className,
}: GraphCardProps) {
  const major = square * 5;

  return (
    <DeskObject
      id={id}
      order={order}
      tilt={2}
      className={cn("w-[22rem] max-w-full", className)}
    >
      <div
        className="shadow-rest rounded-lg bg-[#FBFAF6] p-6"
        style={{
          backgroundImage: [
            "linear-gradient(to right, rgb(var(--rule) / 0.5) 1px, transparent 1px)",
            "linear-gradient(to bottom, rgb(var(--rule) / 0.5) 1px, transparent 1px)",
            "linear-gradient(to right, rgb(var(--rule) / 0.85) 1px, transparent 1px)",
            "linear-gradient(to bottom, rgb(var(--rule) / 0.85) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: `${square}px ${square}px, ${square}px ${square}px, ${major}px ${major}px, ${major}px ${major}px`,
        }}
      >
        {children}
      </div>
    </DeskObject>
  );
}
