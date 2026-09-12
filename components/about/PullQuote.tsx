import { Annotation } from "@/components/objects/Annotation";

/**
 * The line that sets the tone for the page, in italic display serif, with the
 * pen drawing a circle around the part that matters as it scrolls in.
 */
export function PullQuote() {
  return (
    <figure className="mx-auto max-w-[46rem] text-center">
      <blockquote className="font-display text-title italic leading-[1.35] text-ink sm:text-section">
        <p>
          I spent a week reading retry code. One provider account had gone dead
          and every job in the queue was waiting behind it. The fix was{" "}
          <Annotation delay={0.15}>nine lines</Annotation>. The week was not.
        </p>
      </blockquote>
      <figcaption className="mt-6 font-mono text-meta uppercase tracking-[0.14em] text-ink-meta">
        Cetus, uploads that never finished
      </figcaption>
    </figure>
  );
}
