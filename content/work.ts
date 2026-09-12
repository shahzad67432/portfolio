/**
 * Every project that sits on the desk.
 *
 * `date` is an ISO sort key with month precision. It exists so indexes can order
 * themselves; `period` is the string a reader should see.
 */

/** Which desk primitive renders this project. */
export type WorkObject = "polaroid" | "terminal" | "paper" | "index" | "graph";

/** The small-caps category shown in archive rows. */
export type WorkKind =
  | "Product"
  | "Platform"
  | "Contract"
  | "Freelance"
  | "Project";

export type WorkLinks = {
  live?: string;
  repo?: string;
};

export type Work = {
  slug: string;
  title: string;
  kind: WorkKind;
  /** One sentence. Sits under the object and in the archive row. */
  blurb: string;
  role: string;
  /** Human span, e.g. "Mar 2026 to Jul 2026". Render this, not `date`. */
  period: string;
  stack: readonly string[];
  links: WorkLinks;
  object: WorkObject;
  featured: boolean;
  /** ISO sort key, month precision. */
  date: string;
  /** Detail copy, one string per paragraph. */
  body: readonly string[];
};

export const work: readonly Work[] = [
  {
    slug: "cetus",
    title: "Cetus",
    kind: "Product",
    blurb:
      "One internal API in front of Flow, Qwen and edge-tts, so image, video and voice all run from a single composer.",
    role: "Solo. Backend, frontend, infrastructure, design.",
    period: "2026 to now",
    stack: [
      "FastAPI",
      "SQLAlchemy 2.0",
      "Postgres / Supabase",
      "Alembic",
      "Next.js App Router",
      "TanStack Query",
      "Tailwind",
      "Server-Sent Events",
      "Vercel",
      "GCP",
    ],
    links: { live: "https://cetus-one.vercel.app" },
    object: "polaroid",
    featured: true,
    date: "2026-09-01",
    body: [
      "Cetus is a multi-provider AI media generation platform. Flow, Qwen and edge-tts sit behind one internal API, so image, video and voice generation all run from the same composer and the person using it never picks a provider.",
      "The backend is FastAPI with async SQLAlchemy 2.0 on Postgres through Supabase. Schema changes go through Alembic, jobs run in an in-process asyncio worker pool, and mypy strict is switched on for the provider layer, auth and credits, which are the three places where a wrong type costs money.",
      "The web app is Next.js App Router with Tailwind and TanStack Query. Every running job on the page reads from one Server-Sent Events stream. One connection carries all progress, so ten jobs in flight do not open ten sockets.",
      "It is a consumer product, not an internal tool. Supabase Auth with Google OAuth as the primary path, credit based billing, usage analytics, and an admin console behind a role check.",
      "Web on Vercel, API on a GCP box, Postgres on Supabase in ap-southeast-1. The frontend redeploys itself on a push to main. The backend does not, and that asymmetry has its own post.",
      "The whole thing was built end to end with Claude Code inside the repo: a CLAUDE.md at the root, custom skills, hooks, subagents for search and review, and MCP servers wired in.",
    ],
  },
  {
    slug: "kairo",
    title: "Kairo",
    kind: "Platform",
    blurb:
      "A desktop app that writes a ten scene script, narrates it, checks the pacing, and hands back an edit list.",
    role: "Full stack engineer at Grow_in",
    period: "Mar 2026 to Jul 2026",
    stack: [
      "React",
      "TypeScript",
      "Tauri",
      "FastAPI",
      "OmniRoute",
      "edge_tts",
      "Docker",
      "CI/CD",
    ],
    links: {},
    object: "graph",
    featured: true,
    date: "2026-07-01",
    body: [
      "Kairo is an AI video generation platform that ships as a desktop app. React and TypeScript inside Tauri, talking to a FastAPI backend.",
      "The pipeline runs in three stages. A Writer produces a ten scene script through OmniRoute LLM routing. A TTS module narrates it and keeps the word boundary timestamps edge_tts returns, so the narration is not just audio but audio with known positions in it. An Aligner then reads every scene against a 2.25 words per second baseline and flags the ones that will not sit in their slot.",
      "The last stage writes the edit. Scene definitions go in as JSON and an EDL comes out, so the cut is assembled from data rather than dragged together by hand. Manual production effort on a video dropped by 80%.",
      "In the same run I built Fable, a Shopify app with three custom components, and dockerised the stack behind CI/CD.",
    ],
  },
  {
    slug: "mailtrail",
    title: "Mailtrail",
    kind: "Contract",
    blurb:
      "An organization adds its people, an LLM writes the test, it goes out from the organization's own domain, and the answers come back graded.",
    role: "Contract full stack engineer",
    period: "Dec 2024 to Jan 2026",
    stack: ["React", "Redis", "AWS", "LLM grading"],
    links: {},
    object: "index",
    featured: false,
    date: "2026-01-01",
    body: [
      "Mailtrail is an AI assessment platform for organizations. An organization adds its employees and its students, an LLM writes the test, and the test goes out from that organization's own email domain rather than from a platform address nobody recognises.",
      "Answers come back in, get graded, and land in React dashboards the organization can read by person or by cohort.",
      "Dispatch and evaluation both run on Redis-backed queues, so neither sending a round of tests nor grading a round of answers happens inside a web request.",
      "It runs on AWS. The monthly bill came down about 30% after I rewrote the slowest database queries, which were the ones the dashboards hit on every load.",
    ],
  },
  {
    slug: "console-marketplace",
    title: "Console resale marketplace",
    kind: "Freelance",
    blurb:
      "A resale marketplace with no payment rail: the seller submits the device, the platform quotes, and on acceptance both sides carry on over email.",
    role: "Freelance, sole developer",
    period: "Feb 2023 to Mar 2025",
    stack: ["React", "Node.js", "MongoDB", "Redis", "Docker"],
    links: {},
    object: "paper",
    featured: false,
    date: "2025-03-01",
    body: [
      "A marketplace for reselling consoles with no checkout anywhere in it. The seller submits the device details, the platform quotes a price, and once the seller accepts, both sides continue over email. That was the brief, and the whole product is the quote flow.",
      "It came out of five plus web apps I built for clients in the USA and Europe on Fiverr between February 2023 and March 2025, at 100% completion and a 5 star rating across them.",
      "The rest of that run: a movers site, a React analytics dashboard, and an Amazon affiliate store.",
      "The work I learned most from in those two years was the maintenance. One legacy Node.js and MongoDB e-commerce backend answered in 3.2 seconds. Query rewrites, the indexes it had never been given, and a Redis cache in front took it to 400ms.",
      "Another client moved off managed cloud onto Docker on my recommendation, which cut the hosting bill by 55%.",
    ],
  },
  {
    slug: "cyberbrain-ids",
    title: "CyberBrain IDS",
    kind: "Project",
    blurb:
      "An ensemble reads live packets, a RAG pipeline writes the incident up against MITRE ATT&CK, and the analyst gets six follow up questions.",
    role: "Solo",
    period: "Personal project",
    stack: [
      "Random Forest",
      "XGBoost",
      "Chroma",
      "RAG",
      "React",
      "WebSockets",
    ],
    links: {},
    object: "terminal",
    featured: true,
    date: "2026-02-01",
    body: [
      "CyberBrain is an intrusion detection system that watches live network traffic. A Random Forest and an XGBoost model vote on what they see, reading 22 or more packet features over a five second rolling window.",
      "When something trips, a RAG pipeline takes over. An LLM with a Chroma index writes the incident up and maps it to MITRE ATT&CK, so the report names the technique rather than a port and a timestamp.",
      "The SOC dashboard is React with a WebSocket stream, so detections arrive as they happen. Each incident carries six turns of follow up, which means an analyst can ask the model what it saw and keep asking until the answer is useful.",
    ],
  },
];
