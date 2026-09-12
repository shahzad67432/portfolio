import { formatDate } from "@/lib/content";
import { cn } from "@/lib/utils";

type PostMetaProps = {
  /** ISO date. Rendered long form, kept machine readable on the time element. */
  date: string;
  readingMinutes: number;
  /** Printed after the reading time, comma separated, when there are any. */
  tags?: readonly string[];
  className?: string;
};

/** The line under a post title: when it was written, how long it takes, what it is about. */
export function PostMeta({ date, readingMinutes, tags, className }: PostMetaProps) {
  return (
    <p
      className={cn(
        "flex flex-wrap items-center gap-x-3 gap-y-1 text-meta uppercase tracking-[0.08em] text-ink-meta",
        className,
      )}
    >
      <time dateTime={date}>{formatDate(date)}</time>
      <span aria-hidden>·</span>
      <span>{readingMinutes} min read</span>
      {tags && tags.length > 0 ? (
        <>
          <span aria-hidden>·</span>
          <span>{tags.join(", ")}</span>
        </>
      ) : null}
    </p>
  );
}
