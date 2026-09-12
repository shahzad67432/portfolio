import { profile } from "@/content/profile";
import { SocialRow } from "@/components/site/SocialRow";

export function Footer() {
  return (
    <footer className="relative z-10 mx-auto w-full max-w-desk px-5 pb-12 pt-20 sm:px-8">
      <div className="flex flex-col gap-6 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-meta uppercase tracking-[0.08em] text-ink-meta">
          © {new Date().getFullYear()} {profile.name}. {profile.location}.
        </p>
        <div className="flex items-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="text-small text-ink-body underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
          >
            {profile.email}
          </a>
          <SocialRow />
        </div>
      </div>
    </footer>
  );
}
