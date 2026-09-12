import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PostBody } from "@/components/blog/PostBody";
import { PostCover } from "@/components/blog/PostCover";
import { PostMeta } from "@/components/blog/PostMeta";
import { getAdjacent, getPostBySlug, getPosts } from "@/lib/content";
import { coverFor } from "@/lib/objects";

type PostPageProps = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams(): Array<{ slug: string }> {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: PostPageProps): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Post not found" };

  const url = `/blog/${post.slug}`;
  const cover = coverFor(post.slug);

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      publishedTime: post.date,
      tags: [...post.tags],
      images: [{ url: cover, width: 1200, height: 750 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [cover],
    },
  };
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const { prev, next } = getAdjacent(post.slug);

  return (
    <article className="w-full px-5 pb-24 pt-8 sm:px-8 sm:pt-12">
      {/* The 860px block is the desk. Text sits in the 620px column at its left
          edge from lg up, which leaves the right margin free for a written note. */}
      <div className="mx-auto w-full max-w-index">
        <div className="mx-auto w-full max-w-prose lg:mx-0">
          <Link
            href="/blog"
            className="inline-flex min-h-11 items-center gap-2 text-small text-ink-meta transition-colors duration-200 hover:text-accent"
          >
            <span aria-hidden>&larr;</span>
            All posts
          </Link>

          <PostMeta
            date={post.date}
            readingMinutes={post.readingMinutes}
            tags={post.tags}
            className="mt-7"
          />
          <h1 className="mt-3 font-display text-section text-ink sm:text-display">
            {post.title}
          </h1>
          <p className="mt-5 text-lead text-ink-body">{post.excerpt}</p>
        </div>

        <PostCover
          slug={post.slug}
          priority
          sizes="(min-width: 1024px) 860px, 100vw"
          className="mt-10 sm:mt-12"
        />

        <PostBody slug={post.slug} body={post.body} className="mt-12 sm:mt-14" />

        {prev || next ? (
          <nav
            aria-label="More posts"
            className="mx-auto mt-16 w-full max-w-prose border-t border-rule pt-6 lg:mx-0"
          >
            <ul className="flex flex-col gap-8 sm:flex-row sm:justify-between sm:gap-12">
              {prev ? (
                <li className="sm:max-w-xs">
                  <Link href={`/blog/${prev.slug}`} className="group block">
                    <span className="text-meta uppercase tracking-[0.08em] text-ink-meta">
                      Newer
                    </span>
                    <span className="mt-1 block font-display text-lead text-ink transition-colors duration-200 group-hover:text-accent">
                      {prev.title}
                    </span>
                  </Link>
                </li>
              ) : null}
              {next ? (
                <li className="sm:ml-auto sm:max-w-xs sm:text-right">
                  <Link href={`/blog/${next.slug}`} className="group block">
                    <span className="text-meta uppercase tracking-[0.08em] text-ink-meta">
                      Older
                    </span>
                    <span className="mt-1 block font-display text-lead text-ink transition-colors duration-200 group-hover:text-accent">
                      {next.title}
                    </span>
                  </Link>
                </li>
              ) : null}
            </ul>
          </nav>
        ) : null}
      </div>
    </article>
  );
}
