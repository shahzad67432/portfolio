/**
 * The about page timeline, oldest first. `start` and `end` are ISO sort keys with
 * month precision; `period` is the string a reader should see. `end: null` means
 * it is still running.
 */

export type TimelineKind = "study" | "work" | "build" | "research";

export type TimelineEntry = {
  id: string;
  /** What it is. */
  label: string;
  /** Where. */
  org: string;
  /** Human span. Render this. */
  period: string;
  /** ISO sort keys, month precision. */
  start: string;
  end: string | null;
  kind: TimelineKind;
  /** One line of detail. */
  note: string;
  /** Internal route, where the entry has a page of its own. */
  href?: string;
};

export const timeline: readonly TimelineEntry[] = [
  {
    id: "umt",
    label: "BS Artificial Intelligence",
    org: "University of Management and Technology, Lahore",
    period: "2023 to 2027",
    start: "2023-01-01",
    end: "2027-01-01",
    kind: "study",
    note: "Final year. Expected 2027.",
  },
  {
    id: "fiverr",
    label: "Freelance web development",
    org: "Fiverr, clients in the USA and Europe",
    period: "Feb 2023 to Mar 2025",
    start: "2023-02-01",
    end: "2025-03-01",
    kind: "work",
    note: "Five plus web apps, 100% completion, 5 star rating.",
    href: "/work/console-marketplace",
  },
  {
    id: "mailtrail",
    label: "Mailtrail, AI assessment platform",
    org: "Contract",
    period: "Dec 2024 to Jan 2026",
    start: "2024-12-01",
    end: "2026-01-01",
    kind: "work",
    note: "Tests written by an LLM, sent from the organization's own domain, graded back into React dashboards.",
    href: "/work/mailtrail",
  },
  {
    id: "growin",
    label: "Kairo, AI video generation platform",
    org: "Grow_in",
    period: "Mar 2026 to Jul 2026",
    start: "2026-03-01",
    end: "2026-07-01",
    kind: "work",
    note: "Three stage pipeline and automated EDL generation. Cut manual production effort by 80%.",
    href: "/work/kairo",
  },
  {
    id: "cetus",
    label: "Cetus, multi-provider AI media generation",
    org: "Solo, live at cetus-one.vercel.app",
    period: "2026 to now",
    start: "2026-08-01",
    end: null,
    kind: "build",
    note: "Flow, Qwen and edge-tts behind one API, with credits, auth and an admin console on top.",
    href: "/work/cetus",
  },
  {
    id: "icatcict",
    label: "A-HQCA paper, first author",
    org: "ICATCICT 2026, Dubai, UAE",
    period: "25 to 27 November 2026",
    start: "2026-11-25",
    end: "2026-11-27",
    kind: "research",
    note: "Accepted, to appear in AIP Conference Proceedings.",
    href: "/research",
  },
];
