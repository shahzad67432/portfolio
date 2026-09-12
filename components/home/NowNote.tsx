import { GraphCard, Handwriting, Pin } from "@/components/objects";

/**
 * What is actually open on the desk in September 2026. Every line is something
 * that exists: the product is live, the paper is accepted, the site is this one,
 * and the posts are already written from commits in the Cetus repo.
 */
const NOW: ReadonlyArray<{ id: string; line: string }> = [
  {
    id: "cetus",
    line: "Cetus in production. Flow, Qwen and edge-tts behind one API.",
  },
  {
    id: "paper",
    line: "The A-HQCA paper, ready for Dubai on 25 November.",
  },
  {
    id: "site",
    line: "This site, rebuilt from an empty repo.",
  },
  {
    id: "posts",
    line: "Five war stories written up, one per commit that cost me a week.",
  },
];

export function NowNote() {
  return (
    <section className="py-8 sm:py-12 lg:py-14">
      <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-5 lg:col-start-1 lg:pt-8">
          <h2 className="font-display text-section text-ink">
            On the desk this month
          </h2>
          <p className="mt-4 max-w-prose text-body text-ink-body">
            Four things have my attention. The product pays for itself in
            lessons, the paper has a date on it, and the rest is writing.
          </p>
        </div>

        <div className="relative lg:col-span-6 lg:col-start-7">
          <GraphCard
            id="now-note"
            order={1}
            className="w-full max-w-md lg:ml-auto"
          >
            <p className="font-mono text-meta uppercase tracking-[0.14em] text-ink-meta">
              September 2026
            </p>
            <ul className="mt-4 space-y-4">
              {NOW.map((item) => (
                <li key={item.id} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-2.5 block h-2 w-2 shrink-0 border border-ink-meta"
                  />
                  <Handwriting
                    id={`now-${item.id}`}
                    size="lg"
                    className="text-ink"
                  >
                    {item.line}
                  </Handwriting>
                </li>
              ))}
            </ul>
          </GraphCard>
          <Pin id="now-note" size={26} className="absolute -top-2 right-6 z-10 lg:right-10" />
        </div>
      </div>
    </section>
  );
}
