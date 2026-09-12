import { InkFilter } from "@/components/diagrams/Ink";
import { cn } from "@/lib/utils";

const BOXES: Array<{ x: number; y: number; w: number; h: number; label: string; sub?: string }> = [
  { x: 24, y: 28, w: 150, h: 62, label: "Composer", sub: "Next.js App Router" },
  { x: 234, y: 28, w: 158, h: 62, label: "Internal API", sub: "FastAPI" },
  { x: 452, y: 8, w: 132, h: 46, label: "Flow" },
  { x: 452, y: 66, w: 132, h: 46, label: "Qwen" },
  { x: 452, y: 124, w: 132, h: 46, label: "edge-tts" },
  { x: 234, y: 140, w: 158, h: 58, label: "Worker pool", sub: "asyncio, in process" },
  { x: 24, y: 140, w: 150, h: 58, label: "SSE stream", sub: "one per session" },
];

/** How a prompt becomes media in Cetus, drawn rather than diagrammed. */
export function CetusArchitecture({ className }: { className?: string }) {
  return (
    <figure className={cn("w-full", className)}>
      <svg
        viewBox="0 0 620 220"
        role="img"
        aria-label="Cetus architecture: the composer calls one internal FastAPI, which fans out to Flow, Qwen and edge-tts, while a worker pool reports progress back over a single Server-Sent Events stream."
        className="w-full text-ink"
      >
        <InkFilter id="ink-cetus" />
        <g filter="url(#ink-cetus)" fill="none" stroke="currentColor" strokeWidth="1.4">
          {BOXES.map((b) => (
            <rect key={b.label} x={b.x} y={b.y} width={b.w} height={b.h} rx="6" />
          ))}
          <path d="M174 59 H232" />
          <path d="M392 52 H450" />
          <path d="M392 62 H450 M450 89 H392" strokeOpacity="0.9" />
          <path d="M392 70 C 420 70, 424 147, 450 147" />
          <path d="M313 90 V 138" />
          <path d="M232 169 H176" />
          <path d="M99 138 V 92" strokeDasharray="4 5" />
        </g>
        <g filter="url(#ink-cetus)" stroke="currentColor" strokeWidth="1.4" fill="none">
          <path d="M226 59 l6 -4 -6 -4" />
          <path d="M444 52 l6 -4 -6 -4" />
          <path d="M182 169 l-6 -4 6 -4" />
          <path d="M99 98 l-4 -6 8 0 z" fill="currentColor" />
        </g>
        {BOXES.map((b) => (
          <g key={`t-${b.label}`}>
            <text
              x={b.x + b.w / 2}
              y={b.sub ? b.y + b.h / 2 - 2 : b.y + b.h / 2 + 5}
              textAnchor="middle"
              className="fill-ink font-sans"
              style={{ fontSize: 13 }}
            >
              {b.label}
            </text>
            {b.sub ? (
              <text
                x={b.x + b.w / 2}
                y={b.y + b.h / 2 + 15}
                textAnchor="middle"
                className="fill-ink-meta font-sans"
                style={{ fontSize: 10.5 }}
              >
                {b.sub}
              </text>
            ) : null}
          </g>
        ))}
        <text x="196" y="52" className="fill-ink-meta font-hand" style={{ fontSize: 15 }}>
          prompt
        </text>
        <text x="120" y="128" className="fill-ink-meta font-hand" style={{ fontSize: 15 }}>
          progress
        </text>
      </svg>
    </figure>
  );
}
