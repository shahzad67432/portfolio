import Image from "next/image";
import Link from "next/link";

import {
  DeskObject,
  PaperSheet,
  StampAccepted,
  Tape,
} from "@/components/objects";
import { hasPublicAsset } from "@/components/home/publicAsset";
import { getResearch } from "@/lib/content";
import { deskAssets } from "@/lib/objects";

export function ResearchObject() {
  const research = getResearch();
  const page = deskAssets.paperPage;
  const printed = hasPublicAsset(page.src);

  return (
    <section className="py-8 sm:py-12 lg:py-14">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-x-12">
        <div className="relative mx-auto w-full max-w-[15rem] sm:max-w-xs lg:col-span-5 lg:mx-0 lg:max-w-sm">
          {printed ? (
            <DeskObject id="research-page" order={1} tilt={1.8}>
              <div className="shadow-rest relative overflow-hidden rounded-sm bg-paper">
                <Image
                  src={page.src}
                  alt={page.alt}
                  width={page.width}
                  height={page.height}
                  sizes="(min-width: 1024px) 384px, 60vw"
                  className="w-full"
                />
                {/* pressed across the empty foot of the page, clear of
                    the printed venue line */}
                <StampAccepted
                  id="research"
                  size={150}
                  className="absolute -bottom-2 right-2"
                />
              </div>
            </DeskObject>
          ) : (
            <PaperSheet id="research-page" order={1} className="w-full">
              <div className="flex h-full flex-col">
                <p className="font-mono text-meta uppercase tracking-[0.14em] text-ink-meta">
                  {research.venue}
                </p>
                <p className="mt-4 font-display text-title text-ink">
                  {research.title}
                </p>
                <StampAccepted
                  id="research"
                  size={150}
                  className="absolute bottom-3 right-2"
                />
              </div>
            </PaperSheet>
          )}
          <Tape id="research" length={104} className="absolute -top-3 left-10" />
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <p className="font-mono text-meta uppercase tracking-[0.14em] text-ink-meta">
            {research.status} · {research.venue} · {research.location}
          </p>
          <h2 className="mt-4 max-w-prose font-display text-section text-ink">
            {research.title}
          </h2>
          <p className="mt-4 max-w-prose text-body text-ink-body">
            {research.authorship}. {research.dates}, to appear in{" "}
            {research.proceedings}, indexed by{" "}
            {research.indexing.join(" and ")}.
          </p>

          <dl className="mt-8">
            {research.figures.map((figure) => (
              <div key={figure.id} className="border-t border-rule py-4">
                <dt className="text-small text-ink">{figure.label}</dt>
                <dd className="mt-2 font-mono text-title text-ink">
                  <span className="sr-only">from </span>
                  <span className="text-ink-meta">{figure.from}</span>
                  <span aria-hidden className="px-3 text-accent">
                    &rarr;
                  </span>
                  <span className="sr-only">to </span>
                  {figure.to}
                </dd>
                <dd className="mt-2 max-w-prose text-small text-ink-body">
                  {figure.note}
                </dd>
              </div>
            ))}
          </dl>

          <Link
            href="/research"
            className="mt-7 inline-flex min-h-11 items-center rounded-full border border-accent px-5 text-small text-ink transition-colors duration-200 hover:bg-accent-soft"
          >
            Read the paper
            <span aria-hidden className="pl-2 text-accent">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
