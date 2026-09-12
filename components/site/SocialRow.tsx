import { profile } from "@/content/profile";

const items = [
  {
    href: profile.links.twitter,
    label: "X",
    path: "M12.6 10.6 19.1 3h-1.5l-5.7 6.6L7.4 3H2.6l6.8 9.9L2.6 21h1.5l6-6.9 4.8 6.9h4.8l-7.1-10.4Zm-2.1 2.4-.7-1L4.7 4.2h2.4l4.5 6.4.7 1 5.8 8.3h-2.4l-4.9-7Z",
  },
  {
    href: profile.links.github,
    label: "GitHub",
    path: "M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7C6.7 19.7 6.2 18 6.2 18c-.4-1-1-1.3-1-1.3-.8-.6.1-.6.1-.6.9.1 1.4.9 1.4.9.8 1.4 2.2 1 2.7.8.1-.6.3-1 .6-1.3-2.2-.2-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.8-4.6 5 .3.3.7 1 .7 2v2.9c0 .3.2.6.7.5A10 10 0 0 0 12 2Z",
  },
  {
    href: profile.links.linkedin,
    label: "LinkedIn",
    path: "M6.9 8.4H3.6V21h3.3V8.4ZM5.2 3a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM20.4 21h-3.3v-6.1c0-1.5-.5-2.5-1.8-2.5-1 0-1.6.7-1.9 1.4-.1.2-.1.5-.1.9V21H10s.1-11.4 0-12.6h3.3v1.8c.4-.7 1.2-1.7 3-1.7 2.2 0 3.9 1.4 3.9 4.5V21Z",
  },
];

export function SocialRow() {
  return (
    <ul className="flex items-center gap-2">
      {items.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ink-body transition-colors duration-200 hover:bg-paper-deep hover:text-ink md:h-9 md:w-9"
          >
            <span className="sr-only">{item.label}</span>
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden>
              <path d={item.path} fill="currentColor" />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
