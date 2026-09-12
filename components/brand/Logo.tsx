import { cn } from "@/lib/utils";

/**
 * The mark: a sheet of paper with its corner turned, and an S inked across it.
 * It is the desk metaphor compressed to 16px. The fold is a darker orange so the
 * corner still reads when the whole thing is the size of a favicon.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("h-8 w-8", className)} aria-hidden>
      <path
        d="M5 4h15l7 7v17a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"
        fill="rgb(var(--accent))"
      />
      <path d="M20 4l7 7h-6a1 1 0 0 1-1-1z" fill="#C4541D" />
      <path
        d="M20.5 11.5c-1.6-2.2-6.4-2.6-7.7-.3-1.3 2.3 2.2 3.4 3.6 4.4 1.5 1 3.3 2.4 2.3 4.4-1.2 2.4-6.2 2.2-8.1-.4"
        stroke="rgb(var(--paper))"
        strokeWidth="2.1"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/** Mark plus name, for the footer, the OG card and anywhere the site is introduced. */
export function LogoLockup({
  className,
  name = "Shahzad Ali",
}: {
  className?: string;
  name?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark className="h-7 w-7" />
      <span className="font-display text-title leading-none text-ink">
        {name}
        <span className="text-accent">.</span>
      </span>
    </span>
  );
}
