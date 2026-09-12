import { DeskObject } from "@/components/objects/DeskObject";
import { cn, seeded } from "@/lib/utils";

type BoardingPassProps = {
  /** Stable id. Drives the resting angle and the barcode pattern. */
  id?: string;
  order?: number;
  className?: string;
};

const FIELDS: ReadonlyArray<readonly [string, string]> = [
  ["Passenger", "Muhammad Shahzad Ali"],
  ["Depart", "25 Nov 2026"],
  ["Conference", "ICATCICT 2026, 25 to 27 Nov"],
  ["Paper", "A-HQCA, first author"],
];

/** Deterministic bar widths. The desk never calls Math.random. */
function bars(seed: string): number[] {
  return Array.from({ length: 32 }, (_, i) =>
    seeded(`${seed}-bar-${i}`) > 0.1 ? 3 : 1.5,
  );
}

/**
 * The trip to the conference, as the stub you keep. Lahore to Dubai on 25
 * November 2026 for ICATCICT 2026, where the paper is presented. Every field on
 * it is a fact from the acceptance, so nothing here is invented: no flight
 * number, no seat, because those are not known yet.
 */
export function BoardingPass({
  id = "boarding-pass",
  order = 0,
  className,
}: BoardingPassProps) {
  return (
    <DeskObject
      id={id}
      order={order}
      tilt={1.8}
      className={cn("w-[30rem] max-w-full", className)}
    >
      <article className="shadow-rest flex flex-col overflow-hidden rounded-sm bg-[#FBFAF6] sm:flex-row">
        <div className="flex-1 p-5">
          <header className="flex items-baseline justify-between gap-3 border-b border-rule pb-3">
            <p className="font-mono text-meta uppercase tracking-[0.18em] text-ink-meta">
              Boarding pass
            </p>
            <p className="font-mono text-meta uppercase tracking-[0.14em] text-accent">
              ICATCICT 2026
            </p>
          </header>

          <div className="mt-4 flex items-end gap-4">
            <p className="leading-none">
              <span className="block font-display text-section text-ink">LHE</span>
              <span className="mt-1 block text-meta uppercase tracking-[0.1em] text-ink-meta">
                Lahore
              </span>
            </p>
            <span className="sr-only">to</span>
            <svg
              aria-hidden
              viewBox="0 0 48 16"
              className="mb-5 h-4 w-12 text-ink-meta"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <path d="M0 8h40" strokeDasharray="3 3" />
              <path d="M36 3l7 5-7 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="leading-none">
              <span className="block font-display text-section text-ink">DXB</span>
              <span className="mt-1 block text-meta uppercase tracking-[0.1em] text-ink-meta">
                Dubai, UAE
              </span>
            </p>
          </div>

          <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3">
            {FIELDS.map(([term, value]) => (
              <div key={term}>
                <dt className="font-mono text-meta uppercase tracking-[0.12em] text-ink-meta">
                  {term}
                </dt>
                <dd className="mt-0.5 text-small text-ink">{value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-4 border-t border-rule pt-3 text-meta text-ink-meta">
            To appear in AIP Conference Proceedings, indexed by Scopus and Web of
            Science.
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-dashed border-rule bg-paper-deep/50 p-5 sm:w-32 sm:flex-col sm:items-stretch sm:border-l sm:border-t-0">
          <div>
            <p className="font-display text-title leading-none text-ink">DXB</p>
            <p className="mt-1 font-mono text-meta uppercase tracking-[0.1em] text-ink-meta">
              25 Nov 2026
            </p>
          </div>
          <div aria-hidden className="flex h-12 items-stretch gap-0.5 sm:mt-auto">
            {bars(id).map((width, i) => (
              <span
                key={i}
                className="block bg-ink/80"
                style={{ width }}
              />
            ))}
          </div>
        </div>
      </article>
    </DeskObject>
  );
}
