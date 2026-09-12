import type { ReactNode } from "react";

import { DeskObject } from "@/components/objects/DeskObject";
import { Handwriting } from "@/components/objects/Handwriting";
import { Highlighter } from "@/components/objects/Highlighter";
import {
  Annotation,
  BoardingPass,
  CoffeeRing,
  GraphCard,
  IndexCard,
  Marginalia,
  Paperclip,
  PaperSheet,
  Pin,
  Polaroid,
  StampAccepted,
  StickyNote,
  Tape,
  TerminalCard,
} from "@/components/objects";
import { cn } from "@/lib/utils";

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

/** One primitive, rendered as it ships, with the props it takes printed under it. */
function Spec({
  name,
  props,
  children,
  wide = false,
}: {
  name: string;
  props: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-rule p-5",
        wide && "sm:col-span-2",
      )}
    >
      <div className="flex min-h-52 items-center justify-center overflow-hidden py-6">
        {children}
      </div>
      <p className="mt-4 border-t border-rule pt-3 font-mono text-meta text-ink">
        {"<"}
        {name}
        {" />"}
      </p>
      <p className="font-mono text-meta text-ink-meta">{props}</p>
    </div>
  );
}

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

      <section className="mt-16">
        <h2 className="font-display text-section text-ink">Objects</h2>
        <p className="mt-2 max-w-prose text-small text-ink-body">
          Everything here rests on the desk through <code>DeskObject</code>: a
          resting angle from <code>restAngle(id)</code>, a contact shadow, an
          overshoot on the way in, a lift on hover. Pass the same <code>id</code>{" "}
          twice and you get the same angle twice, on the server and on the
          client. <code>Annotation</code> is the one exception: it owns its draw.
        </p>

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <Spec name="Polaroid" props="id, src, alt, caption, order, className">
            <Polaroid
              id="sg-polaroid"
              caption="cetus-one.vercel.app, the composer"
            />
          </Spec>

          <Spec name="IndexCard" props="id, children, label, order, className">
            <IndexCard id="sg-index" label="Cetus, backend">
              FastAPI, async SQLAlchemy 2.0, Postgres on Supabase, Alembic
              migrations, an in-process asyncio worker pool. mypy strict on
              providers, auth and credits.
            </IndexCard>
          </Spec>

          <Spec name="GraphCard" props="id, children, square, order, className">
            <GraphCard id="sg-graph" square={16}>
              <p className="font-mono text-meta uppercase tracking-[0.14em] text-ink-meta">
                Cetus, what shipped
              </p>
              <ul className="mt-2 space-y-1 font-hand text-xl text-ink">
                <li>credit billing behind Supabase Auth</li>
                <li>admin console</li>
                <li>one SSE stream for every job</li>
              </ul>
            </GraphCard>
          </Spec>

          <Spec name="StickyNote" props="id, children, curl, order, className">
            <StickyNote id="sg-sticky" curl="bottom-right">
              alembic reads STUDIO_MIGRATION_DATABASE_URL, not
              STUDIO_DATABASE_URL
            </StickyNote>
          </Spec>

          <Spec name="TerminalCard" props="id, title, lines, order, className" wide>
            <TerminalCard
              id="sg-terminal"
              title="asymmetric deploy"
              lines={[
                "$ git diff --name-only <deployed>..origin/main | grep ^app/",
                "app/schemas/catalog.py",
                "app/providers/registry.py",
                "",
                "# the frontend deploys itself on push. the backend does not.",
              ]}
            />
          </Spec>

          <Spec name="BoardingPass" props="id, order, className" wide>
            <BoardingPass id="sg-pass" />
          </Spec>

          <Spec name="StampAccepted" props="id, label, note, date, size, className">
            <StampAccepted id="sg-stamp" size={240} />
          </Spec>

          <Spec name="Tape" props="id, length, angle, className">
            <div className="flex flex-col items-center gap-6">
              <Tape id="sg-tape" length={120} />
              <Tape length={90} angle={14} />
            </div>
          </Spec>

          <Spec name="CoffeeRing" props="id, size, className">
            <CoffeeRing id="sg-ring" size={130} />
          </Spec>

          <Spec name="Paperclip, Pin" props="id, size, className">
            <div className="flex items-center gap-10">
              <Paperclip id="sg-clip" size={56} />
              <Pin id="sg-pin" size={32} />
            </div>
          </Spec>

          <Spec name="Annotation" props="kind, children, delay, strokeWidth, className" wide>
            <div className="flex w-full flex-col gap-8 px-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-prose text-body text-ink">
                Noise-adaptive QAOA read the live IBM Eagle calibration and cut
                the operating-room scheduling gap to{" "}
                <Annotation kind="circle">0.9%</Annotation>, with runtime down
                from <Annotation kind="underline">186s to 142s</Annotation>.
              </p>
              <Annotation kind="arrow" className="h-20 w-24 shrink-0" />
            </div>
          </Spec>

          <Spec
            name="Marginalia"
            props="id, children, side, className (parent needs relative)"
            wide
          >
            <div className="relative mx-auto max-w-prose px-2">
              <p className="text-body text-ink-body">
                Uploads kept failing. A week of reading retry code, and one
                provider account had gone dead, so every job queued behind it
                forever. It rotates off dead accounts now.
              </p>
              <Marginalia id="sg-marg" side="right">
                the fix was nine lines
              </Marginalia>
            </div>
          </Spec>

          <Spec
            name="PaperSheet"
            props="id, children, crease, order, className"
            wide
          >
            <div className="relative">
              <PaperSheet id="sg-sheet" crease="vertical" className="w-[22rem]">
                <p className="font-display text-title leading-tight text-ink">
                  Adaptive Hybrid Quantum-Classical Framework with
                  Byzantine-Robust Federated Learning and Noise-Aware QAOA
                </p>
                <p className="mt-3 text-small text-ink-body">
                  Muhammad Shahzad Ali, first author
                </p>
                <p className="mt-1 text-meta uppercase tracking-[0.1em] text-ink-meta">
                  ICATCICT 2026, Dubai
                </p>
                <p className="mt-6 border-t border-rule pt-3 text-small text-ink-body">
                  Poisoning 3.8% to 0.6% at 2.1 ms overhead, 8 clients, 2
                  Byzantine, on NIH ChestX-ray14 non-IID.
                </p>
              </PaperSheet>
              <Tape
                id="sg-sheet-tape"
                length={96}
                className="absolute -top-3 left-8 z-20"
              />
              <StampAccepted
                id="sg-sheet-stamp"
                size={200}
                className="absolute bottom-10 right-[-1rem] z-20"
              />
              <Paperclip
                id="sg-sheet-clip"
                size={52}
                className="absolute -top-4 right-10 z-20"
              />
            </div>
          </Spec>
        </div>
      </section>
    </div>
  );
}
