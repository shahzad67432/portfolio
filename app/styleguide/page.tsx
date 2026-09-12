import { DeskObject } from "@/components/objects/DeskObject";
import { Handwriting } from "@/components/objects/Handwriting";
import { Highlighter } from "@/components/objects/Highlighter";

export const metadata = { title: "Styleguide" };

const TOKENS = [
  ["--paper", "page ground"],
  ["--paper-deep", "recessed paper"],
  ["--ink", "display text"],
  ["--ink-body", "body text"],
  ["--ink-meta", "dates and labels"],
  ["--accent", "active state, annotation"],
  ["--accent-soft", "soft marker"],
  ["--highlight", "highlighter"],
  ["--rule", "hairlines"],
];

export default function StyleguidePage() {
  return (
    <div className="mx-auto w-full max-w-index px-5 pb-24 pt-8 sm:px-8">
      <h1 className="font-display text-display text-ink">Styleguide</h1>
      <p className="mt-2 max-w-prose text-small text-ink-meta">
        Every token read from live CSS, every primitive rendered as it ships. If
        a value here disagrees with a doc, this page wins.
      </p>

      <section className="mt-12">
        <h2 className="font-display text-section text-ink">Colour</h2>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {TOKENS.map(([name, use]) => (
            <li key={name} className="rounded-sm border border-rule p-3">
              <span
                className="block h-12 w-full rounded-sm border border-rule"
                style={{ background: `rgb(var(${name}))` }}
              />
              <code className="mt-2 block font-mono text-meta text-ink">
                {name}
              </code>
              <span className="text-meta text-ink-meta">{use}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-section text-ink">Type</h2>
        <div className="mt-4 space-y-4">
          <p className="font-display text-hero text-ink">Display, 54px</p>
          <p className="font-display text-display text-ink">Display, 40px</p>
          <p className="font-display text-section text-ink">Section, 32px</p>
          <p className="text-lead text-ink-body">Lead, 20px, Instrument Sans</p>
          <p className="text-body text-ink-body">
            Body, 16px. The line length is capped at 620px so prose never runs
            wider than the eye wants to track.
          </p>
          <p className="text-small text-ink-meta">Small, 14px, meta ink</p>
          <p className="font-mono text-small text-ink">
            Mono, JetBrains Mono, used for terminal objects
          </p>
          <p>
            <Handwriting id="sg">Handwriting, Caveat, for captions</Handwriting>
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-section text-ink">Primitives</h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <DeskObject id="sg-card">
            <div className="shadow-rest rounded-sm bg-[#FBFAF6] p-5">
              <p className="text-small text-ink-body">
                DeskObject: lands with an overshoot, rests off axis, lifts on
                hover.
              </p>
            </div>
          </DeskObject>
          <div className="rounded-sm border border-rule p-5">
            <p className="text-body text-ink">
              Highlighter draws over{" "}
              <Highlighter>one word</Highlighter> at a time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
