# muhammadshahzadali.com

A personal site built as a desk: warm paper ground, and every piece of content is
an object resting on it. Next.js 14 App Router, TypeScript, Tailwind, framer-motion.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
npm run lint
```

## Where things live

```
app/                    routes: /, /work, /work/[slug], /blog, /blog/[slug], /about, /styleguide
components/site/        nav, footer, mark, paper grain
components/objects/     the desk primitives: DeskObject, Polaroid, IndexCard, StickyNote, …
content/                every fact on the site, typed: profile, work, posts, research, timeline
lib/content.ts          typed readers and date formatting
lib/objects.ts          image assets with their alt text
docs/DIRECTION.md       the design system
docs/TEARDOWN.md        the measured reference it was modelled on
docs/TASKS.md           the build board
public/objects/         screenshots captured from the real products
```

## Add a project

Append an entry to `content/work.ts`. Every field is typed, `body` is an array of
paragraphs, and `object` names which desk primitive renders it. The index, the
detail route, the sitemap and the home collage all read from that one array.

## Add a post

Append an entry to `content/posts.ts` with `slug`, `title`, `date`, `excerpt` and
`body` as paragraphs. `/blog`, `/blog/[slug]` and `/rss.xml` pick it up.

## The rules the design holds to

Semantic HTML, keyboard reachable with a visible focus ring, 44px touch targets,
single column and legible at 390px, `prefers-reduced-motion` honoured everywhere,
and real content only. `/styleguide` renders every token from live CSS, so if a
document disagrees with that page, the page wins.
