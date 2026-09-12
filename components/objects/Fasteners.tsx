import { cn, restAngle } from "@/lib/utils";

type FastenerProps = {
  /** Stable id. Sets the angle it was pushed in at. */
  id?: string;
  /** Height in px. Width follows the drawing. */
  size?: number;
  className?: string;
};

/**
 * A gem clip, seen from above, holding one sheet to another. Decorative:
 * position it over an object's edge with absolute utilities in className.
 */
export function Paperclip({ id, size = 44, className }: FastenerProps) {
  const deg = id ? restAngle(`clip-${id}`, 10) : 0;

  return (
    <svg
      aria-hidden
      viewBox="0 0 36 64"
      height={size}
      width={(size * 36) / 64}
      className={cn("pointer-events-none text-ink-meta", className)}
      style={{ transform: `rotate(${deg}deg)` }}
    >
      <path
        d="M12 47V17a7 7 0 0 1 14 0v31a11 11 0 0 1-22 0V21"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M12 47V17a7 7 0 0 1 14 0v31"
        fill="none"
        stroke="rgb(255 255 255 / 0.5)"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * A push pin, head on, with the shadow it throws to one side. Same decorative
 * contract as the clip.
 */
export function Pin({ id, size = 28, className }: FastenerProps) {
  const deg = id ? restAngle(`pin-${id}`, 18) : 0;

  return (
    <svg
      aria-hidden
      viewBox="0 0 32 32"
      height={size}
      width={size}
      className={cn("pointer-events-none text-accent", className)}
      style={{ transform: `rotate(${deg}deg)` }}
    >
      <ellipse cx="18" cy="20.5" rx="11" ry="9" fill="rgb(17 17 16 / 0.16)" />
      <circle cx="16" cy="16" r="10.5" fill="currentColor" />
      <circle cx="16" cy="16" r="10.5" fill="rgb(17 17 16 / 0.18)" />
      <circle cx="16" cy="16" r="9" fill="currentColor" />
      <circle cx="12.6" cy="12.4" r="3" fill="rgb(255 255 255 / 0.55)" />
      <circle cx="16" cy="16" r="2.2" fill="rgb(17 17 16 / 0.35)" />
    </svg>
  );
}
