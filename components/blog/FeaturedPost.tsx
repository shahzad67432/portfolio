import Link from "next/link";

import { PillLink } from "@/components/blog/PillLink";
import { PostCover } from "@/components/blog/PostCover";
import { PostMeta } from "@/components/blog/PostMeta";
import { Handwriting } from "@/components/objects/Handwriting";
import type { Post } from "@/lib/content";

/**
 * The most recent post, given the space of an object on the desk: the mounted
 * print on the left, pushed past the column edge and taking the wider half of
 * the grid so it carries the weight of the page, then its handwritten label,
 * then the words on the right.
 */
export function FeaturedPost({ post }: { post: Post }) {
  const href = `/blog/${post.slug}`;

  return (
    <article className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center lg:gap-14">
      <div className="lg:-ml-12">
        <PostCover
          slug={post.slug}
          priority
          sizes="(min-width: 1024px) 500px, 100vw"
        />
        <Handwriting
          id="featured-latest"
          size="sm"
          className="mt-6 block pl-3 text-ink-meta"
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
