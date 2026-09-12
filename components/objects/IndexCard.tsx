import type { ReactNode } from "react";

import { DeskObject } from "@/components/objects/DeskObject";
import { cn } from "@/lib/utils";

type IndexCardProps = {
  /** Stable id. Drives the resting angle. */
  id: string;
  children: ReactNode;
  /** Small caps line printed above the first rule. */
  label?: string;
  order?: number;
  className?: string;
};

/** 24px between rules, so body text set at leading-6 sits on them. */
const RULES =
  "repeating-linear-gradient(to bottom, transparent 0px, transparent 23px, rgb(var(--rule) / 0.8) 23px, rgb(var(--rule) / 0.8) 24px)";

/**
 * A 5x3 index card: ruled in grey, one red margin line down the left, the card
 * itself a shade whiter than the desk it rests on.
 */
export function IndexCard({
  id,
  children,
  label,
  order = 0,
  className,
}: IndexCardProps) {
  return (
    <DeskObject
      id={id}
      order={order}
      tilt={2.2}
      className={cn("w-80 max-w-full", className)}
    >
      <div className="shadow-rest relative aspect-[5/3] overflow-hidden rounded-sm bg-[#FBFAF6]">
        <span
          aria-hidden
          className="absolute inset-0"
          style={{ backgroundImage: RULES, backgroundPosition: "0 2.25rem" }}
        />
        <span
          aria-hidden
          className="absolute inset-y-0 left-9 w-px bg-accent/40"
        />
        <div className="relative flex h-full flex-col py-4 pl-12 pr-5">
          {label ? (
            <p className="mb-1 font-mono text-meta uppercase tracking-[0.14em] text-ink-meta">
              {label}
            </p>
          ) : null}
          <div className="text-small leading-6 text-ink-body">{children}</div>
        </div>
      </div>
    </DeskObject>
  );
}
