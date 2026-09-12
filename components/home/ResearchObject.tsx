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
    <section className="pb-24 lg:pb-32">
      <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-x-16">
        <div className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:mx-0">
          {printed ? (
            <DeskObject id="research-page" order={1} tilt={1.8}>
              <div className="shadow-rest relative overflow-hidden rounded-sm bg-paper">
                <Image
                  src={page.src}
                  alt={page.alt}
                  width={page.width}
                  height={page.height}
                  sizes="(min-width: 1024px) 420px, 90vw"
                  className="w-full"
                />
                <StampAccepted
                  id="research"
                  size={230}
                  className="absolute bottom-10 left-6"
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
                  size={200}
                  className="absolute bottom-4 left-2"
                />
              </div>
            </PaperSheet>
          )}
          <Tape id="research" length={116} className="absolute -top-3 left-12" />
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

          <dl className="mt-10">
            {research.figures.map((figure) => (
              <div key={figure.id} className="border-t border-rule py-5">
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
            className="mt-8 inline-flex min-h-11 items-center rounded-full border border-accent px-5 text-small text-ink transition-colors duration-200 hover:bg-accent-soft"
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
