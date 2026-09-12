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
 * The note in the margin of each post. Every line restates something the post
 * already says, written short the way you would scribble it beside a paragraph,
 * so nothing here is new information a reader has to take on trust.
 */
const MARGIN_NOTE: Record<string, string | undefined> = {
  "thirteen-rules": "Thirteen rules. Every screen passed all of them.",
  "asymmetric-deploy": "Vercel goes out on a push. GCP waits for an ssh.",
  "dead-provider-account": "The fix, when it came, was nine lines.",
  "fake-bank-details": "Invented for a mockup. Never a real account.",
  "silent-model-switch": "Two days. The router was fine the whole time.",
};

/** The drop cap on the opening paragraph, set in the display serif. */
const DROP_CAP =
  "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-[4.25rem] first-letter:leading-[0.78] first-letter:text-ink";

/**
 * The body of a post: a 620px column, generous leading, a drop cap on the first
 * paragraph, and one handwritten note hanging in the right margin beside the
 * second. Below lg there is no margin to hang in, so the note folds under the
 * paragraph and reads in order.
 */
export function PostBody({ slug, body, className }: PostBodyProps) {
  const note = MARGIN_NOTE[slug];

  return (
    <div className={cn("mx-auto w-full max-w-prose lg:mx-0", className)}>
      {body.map((paragraph, i) => (
        <div key={`${slug}-p${i}`} className={cn("relative", i > 0 && "mt-7")}>
          <p
            className={cn("text-body leading-7 text-ink-body", i === 0 && DROP_CAP)}
          >
            {paragraph}
          </p>
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
