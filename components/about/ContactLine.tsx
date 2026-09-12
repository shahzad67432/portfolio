import { profile } from "@/content/profile";

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
        . The code sits on{" "}
        <a
          href={profile.links.github}
          target="_blank"
          rel="noreferrer"
          className={LINK}
        >
          GitHub
        </a>
        , the short version of most of this goes on{" "}
        <a
          href={profile.links.twitter}
          target="_blank"
          rel="noreferrer"
          className={LINK}
        >
          X
        </a>
        , and the formal one is on{" "}
        <a
          href={profile.links.linkedin}
          target="_blank"
          rel="noreferrer"
          className={LINK}
        >
          LinkedIn
        </a>
        .
      </p>
      <p className="mt-4 text-small text-ink-meta">
        {profile.location}, UTC+5. {profile.study}, so the degree runs to 2027
        alongside whatever is being built.
      </p>
    </div>
  );
}
