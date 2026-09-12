import type { Metadata } from "next";
import Link from "next/link";

import { CopyField } from "@/components/blog/CopyField";
import { formatDate, getPosts } from "@/lib/content";
import { profile } from "@/content/profile";

const FEED_URL = "https://muhammadshahzadali.netlify.app/rss.xml";

export const metadata: Metadata = {
  title: "Follow the blog",
  description:
    "The feed address for the blog, and what to do with it. New posts arrive in your reader without you checking back.",
};

/**
 * A page for people. The feed itself is XML and browsers stopped rendering it,
 * so clicking a raw .xml link lands a reader on a wall of markup. This page
 * explains the thing and hands over the address; the XML stays where readers
 * expect it.
 */
export default function FeedPage() {
  const posts = getPosts();

  return (
    <div className="mx-auto w-full max-w-prose px-5 pb-24 pt-10 sm:px-8 sm:pt-16">
      <p className="font-mono text-meta uppercase tracking-[0.14em] text-ink-meta">
        RSS
      </p>
      <h1 className="mt-3 font-display text-display leading-tight text-ink">
        Follow the blog
      </h1>
      <p className="mt-4 text-body text-ink-body">
        Paste this address into a feed reader. NetNewsWire, Feedly, Reeder and
        Thunderbird all take it. New posts turn up there on their own, with no
        account and no email from me.
      </p>

      <CopyField value={FEED_URL} className="mt-6" />

      <p className="mt-6 text-small text-ink-meta">
        Opening that address directly shows raw XML, which is correct and not
        very useful. The posts themselves live on{" "}
        <Link
          href="/blog"
          className="text-ink-body underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
        >
          the blog
        </Link>
        .
      </p>

      <section className="mt-14">
        <h2 className="font-display text-title text-ink">
          What is in the feed right now
        </h2>
        <ul className="mt-4">
          {posts.map((post) => (
            <li key={post.slug} className="rule-dotted py-3">
              <Link
                href={`/blog/${post.slug}`}
                className="flex min-h-11 flex-col gap-1 transition-colors hover:text-accent sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <span className="text-body text-ink">{post.title}</span>
                <span className="shrink-0 font-mono text-meta uppercase tracking-[0.1em] text-ink-meta">
                  {formatDate(post.date)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-12 text-small text-ink-meta">
        Prefer a person to a protocol?{" "}
        <a
          href={profile.links.twitter}
          target="_blank"
          rel="noreferrer"
          className="text-ink-body underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
        >
          I post these on X too
        </a>
        .
      </p>
    </div>
  );
}
