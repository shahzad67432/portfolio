/**
 * War stories. Every one of these came out of a real commit in the Cetus repo,
 * so nothing here is a parable. Newest first is the job of `getPosts()`.
 */

export type Post = {
  slug: string;
  title: string;
  /** ISO. */
  date: string;
  excerpt: string;
  readingMinutes: number;
  tags: readonly string[];
  /** One string per paragraph. */
  body: readonly string[];
};

export const posts: readonly Post[] = [
  {
    slug: "thirteen-rules",
    title: "I wrote thirteen design rules and obeyed all of them",
    date: "2026-09-02",
    excerpt:
      "The document was rigorous, every rule held, and the product came out looking like a council website.",
    readingMinutes: 1,
    tags: ["design", "process"],
    body: [
      "I wrote a design constitution for Cetus. Thirteen hard rules, each one defensible on its own, with a long document behind them explaining why.",
      "Then I followed it. Every screen passed every rule. The result looked like a site where you renew a parking permit.",
      "Most of the thirteen were about restraint. What not to colour, what not to move, what not to add, where not to put a shadow. Obey thirteen of those in a row and you get a product with nothing in it.",
      "I deleted the document on 2 September 2026, along with the four files it had spawned. The rebuild started from a reference I actually measured, screenshot by screenshot, instead of from a set of rules I had argued myself into.",
    ],
  },
  {
    slug: "asymmetric-deploy",
    title: "Half my releases used to ship",
    date: "2026-08-12",
    excerpt:
      "The frontend redeploys itself on a push. The backend is a git clone on a box that pulls only when I ssh in.",
    readingMinutes: 1,
    tags: ["deploys", "infrastructure", "cetus"],
    body: [
      "Cetus deploys two different ways. The web app is on Vercel, where a push to main is the deploy. The API is a git clone on a GCP box, and it pulls when I ssh in and tell it to.",
      "For a while I treated the push as the release. The frontend would go out expecting a field the API had never heard of, staging and production would disagree about what the API accepted, and I would find out from a bug report rather than from a failed deploy.",
      "What made it hard to spot is that commit subjects lie. A commit called fix(composer) had changed a schema file under app/. Reading the subject line was never going to catch that.",
      "So the check is a diff now, not a judgement. Ask git which files changed between the deployed commit and main, and if anything under app/ or migrations/ comes back, the backend is part of this release. Then ssh in and pull. The rule is written into the deploy README, at the top, where I will see it before I push instead of after.",
    ],
  },
  {
    slug: "dead-provider-account",
    title: "The provider account that had quietly died",
    date: "2026-07-08",
    excerpt:
      "Uploads kept failing for a week. The retry code was fine the whole time.",
    readingMinutes: 1,
    tags: ["cetus", "providers", "debugging"],
    body: [
      "Uploads kept failing. Not all of them, never loudly, and nothing in the logs said why. A job would go in, sit there, and never come back out.",
      "I spent a week inside the retry code. Read the backoff twice. Added logging around the queue, took it out, put it somewhere else. Rewrote the handler. Every time, the retries were doing exactly what I had told them to do.",
      "One of the provider accounts had gone dead. Every job routed to it queued behind a worker that was never going to answer, and the queue waited, because waiting is the entire job of a queue.",
      "The provider layer rotates off an account now once it stops answering, and everything behind it moves to the next one. That change is nine lines. The week in front of it was not.",
    ],
  },
  {
    slug: "fake-bank-details",
    title: "A bank account that never existed shipped to production",
    date: "2026-06-24",
    excerpt:
      "The details were invented for a mockup and walked straight through. A user found them before I did.",
    readingMinutes: 1,
    tags: ["release", "payments", "cetus"],
    body: [
      "Early on I needed a payments page to look finished, so I typed bank details into it. A bank name, an account number, none of it real. It was a mockup and I knew it was a mockup.",
      "The mockup became the page. The page shipped. The details walked through every review that release got, mine included, because by then I had looked at them so many times they read as part of the layout rather than as content.",
      "A user told me. They were trying to pay.",
      "Deleted the same day. Before a release goes out now I grep for the whole family of placeholder strings: that account number, lorem, the test email address, localhost, TODO in anything user facing. It takes a second.",
    ],
  },
  {
    slug: "silent-model-switch",
    title: "Two days on a router that was never broken",
    date: "2026-05-20",
    excerpt:
      "A frame pair that was only half attached was quietly changing which model ran. Nothing threw, nothing logged.",
    readingMinutes: 1,
    tags: ["debugging", "models", "cetus"],
    body: [
      "Generations kept coming back in a style I had not asked for. I was certain the model router was broken, on the reasonable grounds that the router is the only thing that decides which model runs.",
      "Two days. I read the routing table line by line, printed the resolved model on every path, and every print said the model I expected.",
      "The request carried a frame pair with only the first frame attached. That half attached pair sent the request down a different branch, and the branch picked a different model. Nothing threw, because a missing second frame is legal input. Nothing logged, because as far as the code was concerned nothing had gone wrong.",
      "Two days spent reading the one component that was doing its job correctly.",
    ],
  },
];
