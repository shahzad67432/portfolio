import type { ReactNode } from "react";

import { cn, restAngle } from "@/lib/utils";

/** A caption written by hand next to an object. */
export function Handwriting({
  children,
  id,
  className,
  size = "base",
}: {
  children: ReactNode;
  id: string;
  className?: string;
  size?: "sm" | "base" | "lg";
}) {
  const angle = restAngle(`hand-${id}`, 2.4);
  return (
    <span
      className={cn(
        "inline-block font-hand text-ink-body",
        size === "sm" && "text-base",
        size === "base" && "text-lg",
        size === "lg" && "text-2xl",
        className,
      )}
      style={{ transform: `rotate(${angle}deg)` }}
    >
      {children}
    </span>
  );
}
