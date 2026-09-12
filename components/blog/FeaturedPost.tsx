import Link from "next/link";

import { Handwriting } from "@/components/objects/Handwriting";
import { PillLink } from "@/components/blog/PillLink";
import { PostCover } from "@/components/blog/PostCover";
import { PostMeta } from "@/components/blog/PostMeta";
import type { Post } from "@/lib/content";

/**
 * The most recent post, given the space of an object on the desk: the print on
 * the left with its tape and its handwritten label, the words on the right.
 */
export function FeaturedPost({ post }: { post: Post }) {
  const href = `/blog/${post.slug}`;

  return (
    <article className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
      <div className="lg:-ml-10">
        <PostCover slug={post.slug} priority sizes="(min-width: 1024px) 440px, 100vw" />
        <Handwriting
          id="featured-latest"
          size="sm"
          className="mt-5 block pl-3 text-ink-meta"
        >
          the newest one
        </Handwriting>
      </div>

      <div>
        <PostMeta date={post.date} readingMinutes={post.readingMinutes} />
        <h2 className="mt-3 font-display text-section text-ink sm:text-display">
          <Link
            href={href}
            className="transition-colors duration-200 hover:text-accent"
          >
            {post.title}
          </Link>
        </h2>
        <p className="mt-4 text-body text-ink-body">{post.excerpt}</p>
        <PillLink href={href} className="mt-7">
          Continue reading
        </PillLink>
      </div>
    </article>
  );
}
