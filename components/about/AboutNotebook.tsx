import { GraphCard } from "@/components/objects/GraphCard";
import { Handwriting } from "@/components/objects/Handwriting";
import { Tape } from "@/components/objects/Tape";

type NotebookLine = {
  id: string;
  when: string;
  what: string;
};

/** The right page: three dated lines, all of them from the record. */
const LINES: readonly NotebookLine[] = [
  { id: "aug", when: "Aug 2026", what: "Cetus went live" },
  { id: "sep", when: "Sep 2026", what: "deleted the 13 design rules" },
  { id: "nov", when: "Nov 2026", what: "Dubai, for the paper" },
];

/**
 * The object at the top of the page: a notebook lying open on the desk, taped
 * down at two corners. Graph paper on both pages, a crease down the middle, and
 * everything on it written by hand. Below 640px the spread folds to one page.
 */
export function AboutNotebook() {
  return (
    <GraphCard
      id="about-notebook"
      order={0}
      square={18}
      className="mx-auto w-full max-w-index"
    >
      <div className="relative">
        <Tape id="notebook-top" length={128} className="absolute -top-9 left-10" />
        <Tape
          id="notebook-foot"
          length={104}
          angle={5}
          className="absolute -bottom-9 right-12"
        />

        {/* the crease, and the shadow that gathers in it */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-8 -translate-x-1/2 bg-gradient-to-r from-transparent via-ink/5 to-transparent sm:block"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-rule sm:block"
        />

        <div className="relative grid gap-10 sm:grid-cols-2 sm:gap-12">
          <div className="sm:pr-6">
            <p className="font-mono text-meta uppercase tracking-[0.14em] text-ink-meta">
              Lahore, Pakistan
            </p>
            <p className="mt-4">
              <Handwriting id="nb-who" size="lg" className="text-ink">
                Final year, BS Artificial Intelligence at UMT.
              </Handwriting>
            </p>
            <p className="mt-3">
              <Handwriting id="nb-what" className="leading-snug">
                I take a build from an empty repo to a live URL, then write down
                whatever broke on the way.
              </Handwriting>
            </p>
          </div>

          <div className="sm:pl-6">
            <p className="font-mono text-meta uppercase tracking-[0.14em] text-ink-meta">
              This year
            </p>
            <ul className="mt-4 space-y-3">
              {LINES.map((line) => (
                <li key={line.id} className="flex items-baseline gap-4">
                  <span className="w-20 shrink-0 font-mono text-meta uppercase tracking-[0.1em] text-ink-meta">
                    {line.when}
                  </span>
                  <Handwriting id={`nb-${line.id}`} className="text-ink">
                    {line.what}
                  </Handwriting>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </GraphCard>
  );
}
