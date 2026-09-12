import { profile } from "@/content/profile";

/**
 * The three places the rest of him is, each with the reason you would go there.
 * Rows rather than words inside a sentence, because a one letter link in the
 * middle of a paragraph is not something you can hit with a thumb.
 */
const PROFILES = [
  { id: "github", note: "the code", label: "GitHub", href: profile.links.github },
  {
    id: "x",
    note: "the short version",
    label: "X",
    href: profile.links.twitter,
  },
  {
    id: "linkedin",
    note: "the formal one",
    label: "LinkedIn",
    href: profile.links.linkedin,
  },
] as const;

const LINK =
  "text-ink underline decoration-rule underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent";

/** How to reach him, and where he is while you do it. */
export function ContactLine() {
  return (
    <div className="mx-auto max-w-prose">
      <h2 className="font-display text-section text-ink">Contact</h2>
      <p className="mt-4 text-body text-ink-body">
        Email is the fastest way in:{" "}
        <a href={`mailto:${profile.email}`} className={LINK}>
          {profile.email}
        </a>
        .
      </p>

      <ul className="mt-6 grid border-t border-dotted border-rule sm:grid-cols-3">
        {PROFILES.map((item) => (
          <li
            key={item.id}
            className="border-b border-dotted border-rule sm:border-b-0"
          >
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="group flex min-h-11 flex-col justify-center gap-0.5 py-2"
            >
              <span className="font-mono text-meta uppercase tracking-[0.14em] text-ink-meta">
                {item.note}
              </span>
              <span className="text-small text-ink underline decoration-rule underline-offset-4 transition-colors duration-200 group-hover:text-accent group-hover:decoration-accent">
                {item.label}
              </span>
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-small text-ink-meta">
        {profile.location}, UTC+5. {profile.study}, so the degree runs to 2027
        alongside whatever is being built.
      </p>
    </div>
  );
}
