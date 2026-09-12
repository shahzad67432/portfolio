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

export function Hero() {
  const research = getResearch();
  const photographed = hasPublicAsset(CETUS_PHOTO);

  return (
    <section className="relative isolate pb-20 pt-6 lg:min-h-[46rem] lg:pb-10 lg:pt-8">
      <div className="relative z-10 mx-auto max-w-xl px-1 text-center lg:py-36">
        <h1 className="font-display text-display text-ink sm:text-hero">
          {profile.statement.before}
          <Highlighter>{profile.statement.marked}</Highlighter>
          {profile.statement.after}
        </h1>
        <p className="mx-auto mt-6 max-w-[34ch] text-small text-ink-meta sm:text-body">
          {profile.location}. {profile.study}.
        </p>
      </div>

      {/* The desk itself. A stack under the statement on a phone, scattered
          around it from lg up, where there are margins to scatter into. */}
      <div className="mt-12 flex flex-col items-center gap-12 lg:pointer-events-none lg:absolute lg:inset-0 lg:mt-0 lg:block">
        <TerminalCard
          id="hero-deploy"
          order={1}
          title="cetus / deploy"
          lines={DEPLOY_LINES}
          className="w-full max-w-sm lg:pointer-events-auto lg:absolute lg:-left-6 lg:top-0 lg:w-80"
        />

        <div className="relative w-full max-w-xs lg:pointer-events-auto lg:absolute lg:right-0 lg:top-2 lg:w-72">
          <PaperSheet
            id="hero-acceptance"
            order={2}
            crease="horizontal"
            className="w-full"
          >
            <div className="flex h-full flex-col">
              <p className="font-mono text-meta uppercase tracking-[0.14em] text-ink-meta">
                {research.venue}
              </p>
              <p className="mt-4 font-display text-title text-ink">
                A-HQCA, first author
              </p>
              <p className="mt-2 text-small text-ink-body">
                Byzantine-robust federated learning and noise-aware QAOA for
                healthcare.
              </p>
              <p className="mt-auto text-meta text-ink-meta">
                {research.proceedings}. {research.location}, {research.dates}.
              </p>
            </div>
            <StampAccepted
              id="hero"
              note="ICATCICT 2026"
              date="DUBAI, NOV 2026"
              size={186}
              className="absolute -bottom-1 -left-3"
            />
          </PaperSheet>
          <Paperclip
            id="hero-sheet"
            size={48}
            className="absolute -top-4 left-8 z-10"
          />
        </div>

        {photographed ? (
          <Polaroid
            id="hero-cetus"
            order={3}
            src={CETUS_PHOTO}
            alt={deskAssets.cetusPolaroid.alt}
            caption="cetus-one.vercel.app"
            className="w-52 lg:pointer-events-auto lg:absolute lg:bottom-2 lg:left-10"
          />
        ) : (
          <Polaroid
            id="hero-cetus"
            order={3}
            caption="cetus-one.vercel.app"
            className="w-52 lg:pointer-events-auto lg:absolute lg:bottom-2 lg:left-10"
          />
        )}

        <StickyNote
          id="hero-claude"
          order={4}
          className="w-52 lg:pointer-events-auto lg:absolute lg:bottom-6 lg:right-20"
        >
          <span className="mb-2 block font-mono text-meta uppercase tracking-[0.14em] text-ink/60">
            CLAUDE.md
          </span>
          Run typecheck and lint before telling me something is done.
        </StickyNote>

        <CoffeeRing
          id="hero"
          size={148}
          className="hidden lg:absolute lg:bottom-32 lg:right-80 lg:block"
        />
      </div>
    </section>
  );
}
