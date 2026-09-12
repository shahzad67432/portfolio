import { cn, restAngle } from "@/lib/utils";

type StampAcceptedProps = {
  /** Stable id. Sets the angle it was pressed at, and names its ink filter. */
  id?: string;
  /** The word in the box. */
  label?: string;
  /** The line under it: who accepted it, and where. */
  note?: string;
  /** The date line inside the box. */
  date?: string;
  /** Width in px. */
  size?: number;
  className?: string;
};

/**
 * A rubber stamp in accent ink, pressed off axis, multiplied into the paper.
 * Turbulence breaks the edges so it reads as ink that did not take evenly,
 * which is how a real stamp lands on a printed page.
 */
export function StampAccepted({
  id = "accepted",
  label = "ACCEPTED",
  note = "ICATCICT 2026 / DUBAI",
  date = "25 NOV 2026",
  size = 260,
  className,
}: StampAcceptedProps) {
  const deg = restAngle(`stamp-${id}`, 4) - 11;
  const filterId = `stamp-ink-${id}`;

  return (
    <svg
      role="img"
      aria-label={`${label}. ${note}. ${date}.`}
      viewBox="0 0 260 118"
      width={size}
      height={(size * 118) / 260}
      className={cn("pointer-events-none text-accent mix-blend-multiply", className)}
      style={{ transform: `rotate(${deg}deg)` }}
    >
      <defs>
        <filter id={filterId} x="-12%" y="-12%" width="124%" height="124%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.62"
            numOctaves="3"
            seed="7"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="3.4"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>

      <g filter={`url(#${filterId})`} opacity="0.88">
        <rect
          x="5"
          y="5"
          width="250"
          height="108"
          rx="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="4.5"
        />
        <rect
          x="12"
          y="12"
          width="236"
          height="94"
          rx="3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          opacity="0.7"
        />
        <text
          x="130"
          y="62"
          textAnchor="middle"
          className="font-sans"
          fill="currentColor"
          fontSize="42"
          fontWeight="700"
          letterSpacing="6"
        >
          {label}
        </text>
        <text
          x="130"
          y="82"
          textAnchor="middle"
          className="font-mono"
          fill="currentColor"
          fontSize="11"
          letterSpacing="2.6"
          opacity="0.9"
        >
          {note}
        </text>
        <text
          x="130"
          y="98"
          textAnchor="middle"
          className="font-mono"
          fill="currentColor"
          fontSize="11"
          letterSpacing="2.6"
          opacity="0.9"
        >
          {date}
        </text>
      </g>
    </svg>
  );
}
