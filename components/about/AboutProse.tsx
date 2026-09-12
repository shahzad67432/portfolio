import Link from "next/link";

import { Marginalia } from "@/components/objects/Marginalia";
import { cn } from "@/lib/utils";

const P = "text-body text-ink-body";
const EM = "font-medium text-ink";
const LINK =
  "text-ink underline decoration-rule underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent";
const NOTE = "lg:ml-4 lg:w-36 xl:ml-8 xl:w-40";

/** Three lines of the opening paragraph, set in the display serif. */
const DROP_CAP =
  "first-letter:float-left first-letter:mr-3 first-letter:pt-2 first-letter:font-display first-letter:text-hero first-letter:leading-[0.72] first-letter:text-ink";

/**
 * The long form, at 620px. One drop cap on the opening paragraph, two notes
 * hanging in the margin where a wide screen leaves room for them, and nothing
 * in it that is not on the record.
 */
export function AboutProse({ postCount }: { postCount: number }) {
  return (
    <div className="mx-auto max-w-prose space-y-6">
      <p className={cn(P, DROP_CAP)}>
        Lahore is home. I am in the final year of a BS in Artificial
        Intelligence at the University of Management and Technology, expected
        2027, and most of what I know arrived through shipping rather than
        coursework. Freelance work on Fiverr started in February 2023 and ran to
        March 2025: five plus web apps for clients in the USA and Europe, 100%
        completion, a 5 star rating. One of them was a console resale
        marketplace with <strong className={EM}>no payment rail at all</strong>.
        A seller submits the device details, the platform quotes, and once the
        quote is accepted both sides carry on over email.
      </p>

      <p className={P}>
        Mailtrail was a contract, December 2024 to January 2026. An organization
        adds its employees and students, an LLM writes the test, the test goes
        out from that organization&rsquo;s own email domain, and graded answers
        come back into React dashboards. Redis backed queues carry dispatch and
        evaluation. It runs on AWS, where rewriting the slowest database queries
        took about 30% off the monthly bill. In the same stretch of freelance
        work I took a legacy Node.js and MongoDB e-commerce backend from 3.2s to
        400ms with indexing, query work and Redis caching, and moved another
        client off managed cloud onto Docker for 55% less hosting.
      </p>

      <p className={P}>
        Kairo was built at Grow_in between March and July 2026. React and
        TypeScript in a Tauri desktop app, FastAPI underneath, and a pipeline in
        three stages: a Writer producing 10 scene scripts through OmniRoute LLM
        routing, a TTS module aligning narration with edge_tts word boundary
        timestamps, and an Aligner checking each scene against a 2.25 words per
        second baseline. EDLs generate from the JSON scene definitions, so
        nobody assembles a timeline by hand.{" "}
        <strong className={EM}>Manual production effort fell by 80%.</strong> I
        also built Fable, a Shopify app with three custom components, and put
        the stack in Docker with CI/CD.
      </p>

      <div className="relative">
        <p className={P}>
          Cetus is mine. Flow, Qwen and edge-tts sit behind one internal API, so
          image, video and voice generation all run from a single composer.
          FastAPI and async SQLAlchemy 2.0 on Postgres through Supabase, Alembic
          migrations, an in-process asyncio worker pool, mypy strict over the
          provider, auth and credit code. The frontend is Next.js App Router
          with TanStack Query, and one Server-Sent Events stream carries the
          progress of every job. Auth is Supabase with Google OAuth, billing
          runs on credits, and an admin console and usage analytics sit behind
          it. Web on Vercel, API on GCP, Postgres in ap-southeast-1. It is live
          at{" "}
          <a
            href="https://cetus-one.vercel.app"
            target="_blank"
            rel="noreferrer"
            className={LINK}
          >
            cetus-one.vercel.app
          </a>
          .
        </p>
        <Marginalia id="claude-code" side="right" className={NOTE}>
          Built with Claude Code in the repo: a CLAUDE.md, custom skills, hooks,
          subagents for search and review, MCP servers.
        </Marginalia>
      </div>

      <p className={P}>
        CyberBrain IDS is the one that never had users, only traffic. A Random
        Forest and XGBoost ensemble reads live network traffic over a 5 second
        rolling window across 22 plus packet features. A RAG pipeline on an LLM
        and Chroma writes the threat report and maps it to MITRE ATT&amp;CK, and
        a React SOC dashboard streams incidents over WebSocket with six turns of
        follow-up questions available per incident.
      </p>

      <div className="relative">
        <p className={P}>
          The research is one paper, first author, accepted at ICATCICT 2026 in
          Dubai. It is set out further down this page. The blog is the other
          half of the record: {postCount} war stories so far, each one taken
          from a real commit, including the week lost to a dead provider account
          and the payments page that shipped bank details for an account that
          never existed.
        </p>
        <Marginalia id="war-stories" side="right" className={NOTE}>
          All {postCount} are on the{" "}
          <Link
            href="/blog"
            className="underline decoration-accent/50 underline-offset-4 hover:text-accent"
          >
            blog
          </Link>
          .
        </Marginalia>
      </div>
    </div>
  );
}
