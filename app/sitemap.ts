import type { MetadataRoute } from "next";

import { getPosts, getResearch, getWork } from "@/lib/content";

/**
 * The canonical origin. Matches `metadataBase` in app/layout.tsx, and an env var
 * overrides it so a preview deploy does not advertise production URLs.
 */
const SITE = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://muhammadshahzadali.netlify.app"
).replace(/\/+$/, "");

function url(path: string): string {
  return path === "/" ? `${SITE}/` : `${SITE}${path}`;
}

/** Content dates are ISO with month or day precision, so this is always parseable. */
function at(iso: string | undefined): Date | undefined {
  if (!iso) return undefined;
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function newest(dates: ReadonlyArray<string | undefined>): Date | undefined {
  const times = dates
    .map((iso) => at(iso))
    .filter((date): date is Date => date !== undefined)
    .map((date) => date.getTime());
  return times.length ? new Date(Math.max(...times)) : undefined;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const work = getWork();
  const posts = getPosts();

  // Both readers sort newest first, so the head of each list dates its index.
  const lastWork = at(work[0]?.date);
  const lastPost = at(posts[0]?.date);
  const lastAny = newest([work[0]?.date, posts[0]?.date]);

  return [
    {
      url: url("/"),
      lastModified: lastAny,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: url("/work"),
      lastModified: lastWork,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...work.map((item) => ({
      url: url(`/work/${item.slug}`),
      lastModified: at(item.date),
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
    {
      url: url("/blog"),
      lastModified: lastPost,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    ...posts.map((post) => ({
      url: url(`/blog/${post.slug}`),
      lastModified: at(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    {
      url: url("/research"),
      lastModified: at(getResearch().start),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: url("/about"),
      lastModified: lastAny,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
