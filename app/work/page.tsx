import type { Metadata } from "next";

import { Annotation } from "@/components/objects/Annotation";
import { CoffeeRing } from "@/components/objects/CoffeeRing";
import { Handwriting } from "@/components/objects/Handwriting";
import { ArchiveList } from "@/components/work/ArchiveList";
import { WorkCard } from "@/components/work/WorkCard";
import { WorkHero } from "@/components/work/WorkHero";
import { getFeaturedWork, getWork } from "@/lib/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Cetus, Kairo, Mailtrail, a console resale marketplace and CyberBrain IDS. What each one is, what it runs on, and what it was for.",
};

export default function WorkIndexPage() {
  const [hero, ...objects] = getFeaturedWork();
  const archive = getWork().filter((item) => !item.featured);

  return (
    <div className="mx-auto w-full max-w-desk px-5 pb-24 pt-6 sm:px-8">
      <header className="max-w-prose">
        <h1 className="font-display text-display leading-tight text-ink sm:text-hero">
          Work
        </h1>
        <p className="mt-4 text-lead text-ink-body">
          Products, platforms and contract work, newest first. Every page names
          the stack it runs on and what the thing actually does.
        </p>
      </header>

      <section aria-labelledby="featured-heading" className="mt-16 sm:mt-20">
        <h2 id="featured-heading" className="font-display text-section text-ink">
          Featured work
        </h2>

        <WorkHero item={hero} className="mt-8 sm:mt-10" />

        <ul className="mt-20 grid items-start gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {objects.map((item, i) => (
            <li key={item.slug} className={cn(i === 1 && "lg:mt-12")}>
              <WorkCard item={item} order={i} />
            </li>
          ))}

          {archive.length > 0 ? (
            <li
              aria-hidden
              className="hidden flex-col items-start gap-1 pt-8 sm:flex lg:pt-16"
            >
              <Handwriting id="archive-pointer" size="lg" className="text-ink">
                {archive.length} more in the archive
              </Handwriting>
              <Annotation kind="arrow" className="ml-8" />
            </li>
          ) : null}
        </ul>
      </section>

      {archive.length > 0 ? (
        <section
          aria-labelledby="archive-heading"
          className="relative mt-20 max-w-index sm:mt-24"
        >
          <CoffeeRing
            id="work-archive"
            size={150}
            className="absolute -top-14 right-0 hidden lg:block"
          />
          <h2
            id="archive-heading"
            className="relative font-display text-section text-ink"
          >
            Archive
          </h2>
          <p className="relative mt-2 font-mono text-meta uppercase tracking-[0.14em] text-ink-meta">
            Everything else, newest first
          </p>

          <ArchiveList items={archive} className="relative mt-8" />
        </section>
      ) : null}
    </div>
  );
}
