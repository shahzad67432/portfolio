import type { ReactNode } from "react";

import { Handwriting } from "@/components/objects/Handwriting";
import { cn } from "@/lib/utils";

type MarginaliaProps = {
  /** Stable id. Drives the angle the note was written at. */
  id: string;
  children: ReactNode;
  /** Which margin it sits in on a wide screen. */
  side?: "right" | "left";
  className?: string;
};

/**
 * A note written in the margin, joined to the block by a short rule. The parent
 * block needs `relative` for it to hang outside the column. Below lg there is no
 * margin to hang in, so it folds under the block and reads in order.
 */
export function Marginalia({
  id,
  children,
  side = "right",
  className,
}: MarginaliaProps) {
  const right = side === "right";

  return (
    <aside
      className={cn(
        "mt-4 flex max-w-xs items-start gap-2 lg:absolute lg:top-1 lg:mt-0 lg:w-44",
        right
          ? "lg:left-full lg:ml-10"
          : "flex-row-reverse lg:right-full lg:mr-10 lg:text-right",
        className,
      )}
    >
      <span
        aria-hidden
        className="mt-3 hidden h-px w-6 shrink-0 bg-accent/60 lg:block"
      />
      <Handwriting id={`marginalia-${id}`} size="sm" className="text-ink-body">
        {children}
      </Handwriting>
    </aside>
  );
}
