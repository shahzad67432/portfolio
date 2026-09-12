import { InkFilter } from "@/components/diagrams/Ink";
import { cn } from "@/lib/utils";

const STAGES = [
  { label: "Writer", sub: "10 scenes, OmniRoute" },
  { label: "TTS", sub: "edge_tts word timings" },
  { label: "Aligner", sub: "2.25 words / sec" },
  { label: "EDL", sub: "from JSON scenes" },
];

/** The four stages a Kairo film passes through before it is cuttable. */
export function KairoPipeline({ className }: { className?: string }) {
  return (
    <figure className={cn("w-full", className)}>
      <svg
        viewBox="0 0 620 130"
        role="img"
        aria-label="The Kairo pipeline: a Writer produces ten scenes through OmniRoute routing, a TTS module aligns narration with edge_tts word timings, an Aligner checks each scene against 2.25 words per second, and an EDL is generated from the JSON scene definitions."
        className="w-full text-ink"
      >
        <InkFilter id="ink-kairo" scale={1.8} />
        <g filter="url(#ink-kairo)" fill="none" stroke="currentColor" strokeWidth="1.4">
          {STAGES.map((_, i) => (
            <rect key={i} x={12 + i * 152} y={30} width={128} height={58} rx="6" />
          ))}
          {STAGES.slice(1).map((_, i) => (
            <path key={i} d={`M${140 + i * 152} 59 H${160 + i * 152}`} />
          ))}
        </g>
        {STAGES.map((s, i) => (
          <g key={s.label}>
            <text
              x={76 + i * 152}
              y={56}
              textAnchor="middle"
              className="fill-ink font-sans"
              style={{ fontSize: 13 }}
            >
              {s.label}
            </text>
            <text
              x={76 + i * 152}
              y={72}
              textAnchor="middle"
              className="fill-ink-meta font-sans"
              style={{ fontSize: 10.5 }}
            >
              {s.sub}
            </text>
          </g>
        ))}
        <text x="270" y="112" className="fill-ink-meta font-hand" style={{ fontSize: 16 }}>
          one click, raw footage in, film out
        </text>
      </svg>
    </figure>
  );
}
