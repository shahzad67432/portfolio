import { Marginalia } from "@/components/objects/Marginalia";
import { cn } from "@/lib/utils";

type PostBodyProps = {
  /** Post slug. Picks the note written in the margin, if that post has one. */
  slug: string;
  /** One string per paragraph. */
  body: readonly string[];
  className?: string;
};

/**
 * The note in the margin of each post. One line per post and never more, so a
 * reader meets a single aside rather than a running commentary. Every line
 * restates something the post already says, written short the way you would
 * scribble it beside a paragraph, so nothing here is new information a reader
 * has to take on trust.
 */
const MARGIN_NOTE: Record<string, string | undefined> = {
  "thirteen-rules": "Thirteen rules. Every screen passed all of them.",
  "asymmetric-deploy": "Vercel goes out on a push. GCP waits for an ssh.",
  "dead-provider-account": "The fix, when it came, was nine lines.",
  "fake-bank-details": "Invented for a mockup. Never a real account.",
  "silent-model-switch": "Two days. The router was fine the whole time.",
};

/** Body copy: the 620px column, 16px on a 28px line. */
const BODY = "text-body leading-7 text-ink-body";

/**
 * A two line drop cap on the opening paragraph, set in the display serif.
 *
 * Measured against this column rather than guessed. Body text is 16px on a 28px
 * line and Instrument Serif carries its cap height at 0.72em, so a cap covering
 * two lines stands 28 + 11.52 = 39.5px tall and needs 54.4px of font size. Its
 * float box is the top margin plus the line height, held together at 53.8px:
 * inside the 56px of two lines, so the third line clears the indent, and low
 * enough that the letter sits on the second baseline instead of floating above
 * it. The classes are concatenated rather than merged, because tailwind-merge
 * treats `text-[3.4rem]` and `text-ink` as the same slot and drops one of them.
 */
const DROP_CAP =
  "first-letter:float-left first-letter:mr-2 first-letter:mt-[0.3rem] " +
  "first-letter:font-display first-letter:text-[3.4rem] " +
  "first-letter:leading-[0.9] first-letter:text-ink";

/**
 * The body of a post: a 620px column, generous leading, a drop cap on the first
 * paragraph, and the one handwritten note hanging in the right margin beside the
 * second. Below lg there is no margin to hang in, so the note folds under the
 * paragraph and reads in order.
 */
export function PostBody({ slug, body, className }: PostBodyProps) {
  const note = MARGIN_NOTE[slug];

  return (
    <div className={cn("mx-auto w-full max-w-prose lg:mx-0", className)}>
      {body.map((paragraph, i) => (
        <div key={`${slug}-p${i}`} className={cn("relative", i > 0 && "mt-7")}>
          <p className={i === 0 ? `${BODY} ${DROP_CAP}` : BODY}>{paragraph}</p>
          {note && i === 1 ? (
            <Marginalia id={slug} side="right">
              {note}
            </Marginalia>
          ) : null}
        </div>
      ))}
    </div>
  );
}
