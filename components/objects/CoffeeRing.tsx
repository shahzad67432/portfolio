import { cn, restAngle } from "@/lib/utils";

type CoffeeRingProps = {
  /** Stable id. Rotates the stain so no two rings read the same. */
  id?: string;
  /** Width and height in px. */
  size?: number;
  className?: string;
};

/**
 * Where a mug stood. Drawn in currentColor so the tone comes from the class
 * that carries it, broken at two points the way a real ring dries unevenly.
 */
export function CoffeeRing({ id, size = 140, className }: CoffeeRingProps) {
  const deg = id ? restAngle(`ring-${id}`, 24) : 0;

  return (
    <svg
      aria-hidden
      viewBox="0 0 140 140"
      width={size}
      height={size}
      className={cn("pointer-events-none text-accent/30 mix-blend-multiply", className)}
      style={{ transform: `rotate(${deg}deg)` }}
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round">
        {/* the heavy edge, where the liquid pooled longest */}
        <circle
          cx="70"
          cy="70"
          r="54"
          strokeWidth="7"
          strokeDasharray="150 18 96 26"
          strokeDashoffset="12"
        />
        {/* a second, lighter pass just inside it */}
        <circle
          cx="70"
          cy="70"
          r="49"
          strokeWidth="2"
          opacity="0.55"
          strokeDasharray="80 40 120 20"
        />
        {/* the faint outer bloom */}
        <circle cx="70" cy="70" r="58" strokeWidth="1.5" opacity="0.35" />
      </g>
    </svg>
  );
}
