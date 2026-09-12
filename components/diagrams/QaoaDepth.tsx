import { InkFilter } from "@/components/diagrams/Ink";
import { cn } from "@/lib/utils";

/**
 * Why adaptive depth wins: solution quality climbs with circuit depth until gate
 * error overtakes it, and the peak moves with the day's calibration. Plotted from
 * the shape reported in the paper, not from raw data points.
 */
export function QaoaDepth({ className }: { className?: string }) {
  return (
    <figure className={cn("w-full", className)}>
      <svg
        viewBox="0 0 620 260"
        role="img"
        aria-label="Solution quality against circuit depth. On a clean calibration the curve peaks at a deeper circuit; on a noisy one it peaks earlier and falls faster. A fixed depth of three sits away from both peaks."
        className="w-full text-ink"
      >
        <InkFilter id="ink-qaoa" scale={1.6} />
        <g filter="url(#ink-qaoa)" fill="none" stroke="currentColor" strokeWidth="1.3">
          <path d="M60 220 H580" />
          <path d="M60 220 V28" />
          <path
            d="M60 196 C 140 150, 190 96, 250 84 C 320 70, 400 108, 500 168 C 530 186, 556 198, 578 206"
            strokeWidth="1.7"
          />
          <path
            d="M60 206 C 120 176, 152 140, 196 136 C 250 132, 320 178, 420 208 C 470 222, 530 230, 578 234"
            strokeDasharray="6 5"
            strokeOpacity="0.75"
          />
          <path d="M196 136 v84" strokeDasharray="3 5" strokeOpacity="0.5" />
          <path d="M250 84 v136" strokeDasharray="3 5" strokeOpacity="0.5" />
        </g>
        <g className="fill-ink-meta font-sans" style={{ fontSize: 11 }}>
          <text x="300" y="246" textAnchor="middle">
            circuit depth p
          </text>
          <text x="22" y="120" transform="rotate(-90 22 120)" textAnchor="middle">
            solution quality
          </text>
        </g>
        <g className="font-hand fill-ink-body" style={{ fontSize: 16 }}>
          <text x="266" y="66">clean calibration, p* deeper</text>
          <text x="120" y="124">noisy day, p* shallower</text>
        </g>
        <g stroke="rgb(var(--accent))" fill="none" strokeWidth="1.6" filter="url(#ink-qaoa)">
          <path d="M340 200 C 348 176, 336 150, 316 146" />
          <path d="M316 146 l10 -1 -6 8" />
        </g>
        <text
          x="344"
          y="214"
          className="font-hand"
          style={{ fontSize: 16, fill: "rgb(var(--accent))" }}
        >
          fixed p = 3 lands here
        </text>
      </svg>
    </figure>
  );
}
