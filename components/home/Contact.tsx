import { DeskObject, Tape } from "@/components/objects";
import { profile } from "@/content/profile";

const SOCIALS: ReadonlyArray<{ label: string; handle: string; href: string }> = [
  { label: "GitHub", handle: "shahzad67432", href: profile.links.github },
  { label: "X", handle: "@shahzadexec", href: profile.links.twitter },
  {
    label: "LinkedIn",
    handle: "muhammad-shahzad-ali",
    href: profile.links.linkedin,
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-8 sm:py-12 lg:py-14">
      <DeskObject
        id="contact-card"
        order={1}
        tilt={0.8}
        className="mx-auto w-full max-w-index"
      >
        <div className="shadow-rest relative rounded-lg border border-rule bg-paper p-7 sm:p-10">
          <Tape id="contact-left" length={110} className="absolute -top-3 left-10" />
          <Tape
            id="contact-right"
            length={110}
            className="absolute -top-3 right-10"
          />

          <h2 className="font-display text-section text-ink">Write to me</h2>
          <p className="mt-4 max-w-prose text-body text-ink-body">
            Applied AI work, a product that needs building end to end, or a bug
            that has eaten a week of your time. I am in Lahore, and I have
            worked with clients across the USA and Europe.
          </p>

          <a
            href={`mailto:${profile.email}`}
            className="mt-7 inline-flex min-h-11 items-center font-display text-title text-ink underline decoration-rule decoration-1 underline-offset-[6px] transition-colors duration-200 hover:text-accent hover:decoration-accent sm:text-display"
          >
            {profile.email}
          </a>

          <ul className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-2 border-t border-rule pt-6">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 flex-col justify-center transition-colors duration-200 hover:text-accent"
                >
                  <span className="font-mono text-meta uppercase tracking-[0.14em] text-ink-meta">
                    {social.label}
                  </span>
                  <span className="text-small text-ink-body">
                    {social.handle}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </DeskObject>
    </section>
  );
}
