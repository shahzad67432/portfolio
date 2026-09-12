import type { Metadata } from "next";

import { AboutNotebook } from "@/components/about/AboutNotebook";
import { AboutProse } from "@/components/about/AboutProse";
import { AboutTimeline } from "@/components/about/AboutTimeline";
import { ContactLine } from "@/components/about/ContactLine";
import { PullQuote } from "@/components/about/PullQuote";
import { ResearchCallout } from "@/components/about/ResearchCallout";
import { formatDate, getPosts, getResearch, getTimeline } from "@/lib/content";

/** The day the page was last rewritten. Bump it when the copy changes. */
const UPDATED = "2026-09-12";

export const metadata: Metadata = {
  title: "About",
  description:
    "Final year BS Artificial Intelligence at UMT in Lahore. Freelance web work, Mailtrail, Kairo at Grow_in, Cetus in production, and one paper accepted at ICATCICT 2026.",
};

export default function AboutPage() {
  const entries = getTimeline();
  const research = getResearch();
  const postCount = getPosts().length;

  return (
    <div className="mx-auto w-full max-w-desk px-5 pb-16 sm:px-8 sm:pb-24">
      <header className="pt-4 sm:pt-8">
        <AboutNotebook />
        <div className="mx-auto mt-12 max-w-prose sm:mt-16">
          <h1 className="font-display text-display leading-[1.1] text-ink sm:text-hero">
            About
          </h1>
          <p className="mt-3 font-mono text-meta uppercase tracking-[0.14em] text-ink-meta">
            Updated {formatDate(UPDATED)}
          </p>
        </div>
      </header>

      <section className="mt-12 sm:mt-16">
        <PullQuote />
      </section>

      <section className="mt-12 sm:mt-16">
        <AboutProse postCount={postCount} />
      </section>

      <section aria-labelledby="timeline-heading" className="mt-16 sm:mt-24">
        <div className="mx-auto max-w-index">
          <h2
            id="timeline-heading"
            className="font-display text-section text-ink"
          >
            The order it happened in
          </h2>
          <AboutTimeline entries={entries} />
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-index sm:mt-24">
        <ResearchCallout research={research} />
      </section>

      <section className="mt-16 sm:mt-24">
        <ContactLine />
      </section>
    </div>
  );
}
