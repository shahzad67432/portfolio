import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Marker pulled across a word. The swatch is uneven at both ends, the way a real
 * highlighter leaves the page, and it sits behind the glyphs.
 */
export function Highlighter({
  children,
  tone = "highlight",
  className,
}: {
  children: ReactNode;
  tone?: "highlight" | "accent";
  className?: string;
}) {
  return (
    <span className={cn("relative inline-block", className)}>
      <span
        aria-hidden
        className={cn(
          "absolute inset-x-[-0.18em] bottom-[0.04em] top-[0.1em] -z-10 -rotate-[0.6deg]",
          tone === "highlight" ? "bg-highlight" : "bg-accent-soft",
        )}
        style={{
          borderRadius: "0.35em 0.6em 0.4em 0.5em",
          clipPath:
            "polygon(1% 6%, 99% 0%, 100% 92%, 97% 100%, 2% 97%, 0% 20%)",
        }}
      />
      <span className="relative">{children}</span>
    </span>
  );
}
