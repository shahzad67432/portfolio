import {
  CoffeeRing,
  Highlighter,
  Paperclip,
  PaperSheet,
  Polaroid,
  StampAccepted,
  StickyNote,
  TerminalCard,
} from "@/components/objects";
import { hasPublicAsset } from "@/components/home/publicAsset";
import { getResearch } from "@/lib/content";
import { profile } from "@/content/profile";
import { deskAssets } from "@/lib/objects";

/** The photograph of the live product, as it was asked for by the desk plan. */
const CETUS_PHOTO = "/objects/cetus.png";

/**
 * The check the Cetus deploy README makes you run before you call a push a
 * release: the web app redeploys itself, the API is a git clone on a GCP box
 * that only moves when you ssh in.
 */
const DEPLOY_LINES = [
  "$ git diff --name-only $SHA..origin/main",
  "app/schemas/catalog.py",
  "$ ssh studio-warm-a 'git pull'",
  "$ alembic upgrade head",
] as const;

/**
 * The statement owns a centred column and nothing is allowed into it. From xl
 * every object is pinned to a page edge and capped at the distance from that
 * edge to the column, so it cannot reach the words however wide the window
 * gets. Between lg and xl the margins are too narrow for five objects, so two
 * of them stand down. Below lg there are no margins and the desk stacks under
 * the text in source order.
 */
const EDGE = "xl:w-[min(17rem,calc(50vw_-_29rem))]";
const INSET = "xl:w-[min(13rem,calc(50vw_-_30rem))]";

export function Hero() {
  const research = getResearch();
  const photographed = hasPublicAsset(CETUS_PHOTO);

  return (
    <section className="relative isolate overflow-hidden px-5 py-8 sm:px-8 sm:py-12 lg:min-h-[40rem] lg:py-14">
      <div className="relative z-20 mx-auto max-w-xl text-center lg:max-w-[30rem] lg:py-20 xl:max-w-xl">
        <h1 className="font-display text-display text-ink sm:text-hero">
          {profile.statement.before}
          <Highlighter>{profile.statement.marked}</Highlighter>
          {profile.statement.after}
        </h1>
        <p className="mx-auto mt-5 max-w-[34ch] text-small text-ink-meta sm:text-body">
          {profile.location}. {profile.study}.
        </p>
      </div>

      {/* The desk itself. A stack under the statement on a phone, scattered
          into the margins from lg up, where there are margins to scatter into. */}
      <div className="mt-8 flex flex-col items-center gap-8 sm:mt-12 sm:gap-10 lg:pointer-events-none lg:absolute lg:inset-0 lg:mt-0 lg:block">
        <TerminalCard
          id="hero-deploy"
          order={1}
          title="cetus / deploy"
          lines={DEPLOY_LINES}
          className={`w-full max-w-sm lg:hidden xl:pointer-events-auto xl:absolute xl:left-6 xl:top-10 xl:block ${EDGE}`}
        />

        <div
          className={`relative w-full max-w-[15rem] lg:hidden xl:pointer-events-auto xl:absolute xl:right-6 xl:top-4 ${EDGE} [@media(min-width:1400px)]:block`}
        >
          <PaperSheet
            id="hero-acceptance"
            order={2}
            crease="horizontal"
            className="w-full"
          >
            <div className="flex min-h-full flex-col">
              <p className="font-mono text-meta uppercase tracking-[0.14em] text-ink-meta">
                {research.venue}
              </p>
              <p className="mt-3 font-display text-lead text-ink">
                A-HQCA, first author
              </p>
              <p className="mt-2 text-small text-ink-body">
                Byzantine-robust federated learning and noise-aware QAOA for
                healthcare.
              </p>
              <p className="mt-3 text-meta text-ink-meta">
                {research.proceedings}. {research.location}, {research.dates}.
              </p>
              {/* the stamp lands on the empty foot of the sheet, never on the
                  lines above it */}
              <div className="mt-auto flex justify-end pt-3">
                <StampAccepted
                  id="hero"
                  note="ICATCICT 2026"
                  date="DUBAI, NOV 2026"
                  size={124}
                  className="overflow-visible"
                />
              </div>
            </div>
          </PaperSheet>
          <Paperclip
            id="hero-sheet"
            size={44}
            className="absolute -top-4 left-6 z-10"
          />
        </div>

        {photographed ? (
          <Polaroid
            id="hero-cetus"
            order={3}
            src={CETUS_PHOTO}
            alt={deskAssets.cetusPolaroid.alt}
            caption="cetus-one.vercel.app"
            className={`hidden lg:pointer-events-auto lg:absolute lg:left-4 lg:top-24 lg:block lg:w-40 xl:bottom-10 xl:left-10 xl:top-auto ${INSET}`}
          />
        ) : (
          <Polaroid
            id="hero-cetus"
            order={3}
            caption="cetus-one.vercel.app"
            className={`hidden lg:pointer-events-auto lg:absolute lg:left-4 lg:top-24 lg:block lg:w-40 xl:bottom-10 xl:left-10 xl:top-auto ${INSET}`}
          />
        )}

        <div className="w-44 -rotate-[7deg] lg:pointer-events-auto lg:absolute lg:bottom-16 lg:right-4 lg:w-40 xl:bottom-8 xl:right-10 xl:w-[min(12.5rem,calc(50vw_-_30rem))]">
          <StickyNote id="hero-claude" order={4} className="w-full">
            <span className="mb-1.5 block font-mono text-meta uppercase tracking-[0.14em] text-ink/60">
              CLAUDE.md
            </span>
            <span className="block text-[0.95rem] leading-snug xl:text-lg">
              Run typecheck and lint before telling me something is done.
            </span>
          </StickyNote>
        </div>

        <CoffeeRing
          id="hero"
          size={104}
          className="hidden lg:absolute lg:bottom-24 lg:left-10 lg:block xl:bottom-auto xl:left-12 xl:top-[42%]"
        />
      </div>
    </section>
  );
}
