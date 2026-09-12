import { cn, restAngle } from "@/lib/utils";

type TapeProps = {
  /** Stable id. Sets the angle when one is not given explicitly. */
  id?: string;
  /** Length of the strip in px. */
  length?: number;
  /** Degrees. Overrides the angle derived from the id. */
  angle?: number;
  className?: string;
};

/**
 * A torn strip of matte tape. Translucent, multiplied over whatever it crosses,
 * with ragged ends and a shine down the middle. Decorative: position it over
 * the corner of an object with absolute utilities in className.
 */
export function Tape({ id, length = 104, angle, className }: TapeProps) {
  const deg = angle ?? (id ? restAngle(`tape-${id}`, 7) : -4);

  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none block h-7 bg-paper-deep/80 mix-blend-multiply",
        className,
      )}
      style={{
        width: length,
        transform: `rotate(${deg}deg)`,
        clipPath:
          "polygon(0% 8%, 4% 0%, 7% 9%, 96% 4%, 100% 12%, 97% 96%, 93% 100%, 5% 96%, 1% 100%)",
        backgroundImage:
          "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.1) 42%, rgba(17,17,16,0.05) 100%)",
        boxShadow: "0 1px 1px rgba(17,17,16,0.06)",
      }}
    />
  );
}
