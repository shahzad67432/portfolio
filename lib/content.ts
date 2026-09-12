import { posts, type Post } from "@/content/posts";
import { research, type Research } from "@/content/research";
import { timeline, type TimelineEntry } from "@/content/timeline";
import { work, type Work } from "@/content/work";

export type { Post, Research, TimelineEntry, Work };

/** Whatever sits either side of an entry in an index. */
export type Adjacent<T> = {
  prev: T | null;
  next: T | null;
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function byDateDesc(a: { date: string }, b: { date: string }): number {
  return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
}

function adjacentIn<T extends { slug: string }>(
  items: readonly T[],
  slug: string,
): Adjacent<T> {
  const i = items.findIndex((item) => item.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? items[i - 1] : null,
    next: i < items.length - 1 ? items[i + 1] : null,
  };
}

/** Every project, newest first. */
export function getWork(): readonly Work[] {
  return [...work].sort(byDateDesc);
}

export function getWorkBySlug(slug: string): Work | undefined {
  return work.find((item) => item.slug === slug);
}

/** The projects that earn a large object rather than an archive row. */
export function getFeaturedWork(): readonly Work[] {
  return getWork().filter((item) => item.featured);
}

/**
 * Prev and next project in the same order `getWork()` returns, so detail pages
 * can walk the index. `next` is the older project.
 */
export function getAdjacentWork(slug: string): Adjacent<Work> {
  return adjacentIn(getWork(), slug);
}

/** Every post, newest first. */
export function getPosts(): readonly Post[] {
  return [...posts].sort(byDateDesc);
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

/**
 * Prev and next post in the same order `getPosts()` returns. `prev` is the newer
 * post, `next` is the older one, and both are null at the ends.
 */
export function getAdjacent(slug: string): Adjacent<Post> {
  return adjacentIn(getPosts(), slug);
}

/** The one paper. */
export function getResearch(): Research {
  return research;
}

/** The about page timeline, oldest first. */
export function getTimeline(): readonly TimelineEntry[] {
  return [...timeline].sort((a, b) => (a.start < b.start ? -1 : 1));
}

/** Every tag in use, alphabetical. */
export function getTags(): readonly string[] {
  const seen = new Set<string>();
  for (const post of posts) {
    for (const tag of post.tags) seen.add(tag);
  }
  return Array.from(seen).sort();
}

/** "2026-09-12" becomes "12 September 2026". Unparseable input comes back as is. */
export function formatDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!match) return iso;
  const [, year, month, day] = match;
  const name = MONTHS[Number(month) - 1];
  if (!name) return iso;
  return `${Number(day)} ${name} ${year}`;
}
