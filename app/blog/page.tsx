import type { Metadata } from "next";

import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { PostRows, type PostRow } from "@/components/blog/PostRows";
import { formatDate, getPosts } from "@/lib/content";
import { coverFor } from "@/lib/objects";

const LEAD =
  "Things that broke while I was building, and what each one turned out to be. Every post here started as a real commit, so the dates and the fixes are the ones that actually happened.";

export const metadata: Metadata = {
  title: "Blog",
  description: LEAD,
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": "/rss.xml" },
  },
  openGraph: {
    type: "website",
    title: "Blog",
    description: LEAD,
    url: "/blog",
  },
};

export default function BlogPage() {
  const posts = getPosts();
  const featured = posts[0];
  const rows: PostRow[] = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    category: post.tags[0],
    date: post.date,
    dateLabel: formatDate(post.date),
    cover: coverFor(post.slug),
  }));

  return (
    <div className="w-full px-5 pb-24 pt-10 sm:px-8 sm:pt-16">
      <div className="mx-auto w-full max-w-index">
        <header className="max-w-prose">
          <h1 className="font-display text-display text-ink md:text-hero">Blog</h1>
          <p className="mt-5 text-body text-ink-body">{LEAD}</p>
          {featured ? (
            <p className="mt-4 text-meta uppercase tracking-[0.08em] text-ink-meta">
              {posts.length} posts · latest {formatDate(featured.date)}
            </p>
          ) : null}
        </header>

        {featured ? (
          <section aria-label="Latest post" className="mt-16 sm:mt-20">
            <FeaturedPost post={featured} />
          </section>
        ) : null}

        <section aria-labelledby="all-posts" className="mt-20 sm:mt-24">
          <h2
            id="all-posts"
            className="font-display text-title text-ink sm:text-section"
          >
            All posts
          </h2>
          <PostRows rows={rows} className="mt-6" />
          <p className="mt-8">
            <a
              href="/rss.xml"
              className="inline-flex min-h-11 items-center text-small text-ink-body underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              Subscribe by RSS
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
