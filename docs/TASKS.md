# Task board

Chunks ship in order. Each chunk is one commit (or a few), pushed as it lands, so
the branch is always viewable. `[x]` means done and pushed.

## Chunk 1 — foundation (tokens, shell)
- [ ] 1 Strip the template: delete aceternity components, globe, confetti, old data
- [ ] 2 Remove unused deps (three, drei, lottie, tabler, next-themes) from package.json
- [ ] 3 Fonts: Instrument Serif, Instrument Sans, Caveat, JetBrains Mono via next/font
- [ ] 4 `app/globals.css`: reset, tokens, paper ground, texture, selection colour
- [ ] 5 Tailwind config: map tokens to theme, add type scale and shadows
- [ ] 6 `lib/cn.ts` retained, add `lib/rotate.ts` deterministic per-index rotation
- [ ] 7 Root layout: metadata, fonts, skip link, paper background, focus-visible ring
- [ ] 8 `<Nav>`: centred links, active in accent, socials right, mobile sheet
- [ ] 9 `<Footer>`: copyright, email, three social links
- [ ] 10 `<Paper>`: the textured surface primitive with optional vignette
- [ ] 11 `/styleguide` route rendering every token and primitive from live CSS

## Chunk 2 — object primitives
- [ ] 12 `<DeskObject>`: rotation, contact shadow, entrance, hover lift, reduced-motion
- [ ] 13 `<Polaroid>`: image, white border, handwritten caption
- [ ] 14 `<IndexCard>`: lined paper, 3:5 ratio
- [ ] 15 `<GraphCard>`: graph-paper background via CSS gradients
- [ ] 16 `<StickyNote>`: yellow, curled corner shadow
- [ ] 17 `<PaperSheet>`: A4 proportion, subtle fold crease
- [ ] 18 `<Tape>`: translucent strip, rotated, used to attach objects
- [ ] 19 `<CoffeeRing>`: SVG ring, low opacity
- [ ] 20 `<Paperclip>`, `<Pin>`: small SVG fasteners
- [ ] 21 `<TerminalCard>`: mono text on near-black, subtle scanline
- [ ] 22 `<BoardingPass>`: LHE→DXB, ICATCICT 2026 dates
- [ ] 23 `<StampAccepted>`: rotated rubber-stamp SVG for the paper object
- [ ] 24 `<Handwriting>`: Caveat text at an angle, used for captions
- [ ] 25 `<Annotation>`: hand-drawn circle / underline / arrow, draws on scroll
- [ ] 26 `<Highlighter>`: marker swatch behind an inline word
- [ ] 27 `<Marginalia>`: small handwritten note anchored beside a block
- [ ] 28 Add every primitive to `/styleguide` with its props visible

## Chunk 3 — content layer
- [ ] 29 `content/profile.ts`: name, role, location, links, one-line bio
- [ ] 30 `content/work.ts`: Cetus, Kairo, Mailtrail, console marketplace, CyberBrain
- [ ] 31 `content/research.ts`: the A-HQCA paper with its real figures
- [ ] 32 `content/posts/*.mdx`: seed posts from the written war stories
- [ ] 33 `content/now.ts`: what he is building this month
- [ ] 34 `lib/content.ts`: typed readers, date sort, slug helpers
- [ ] 35 MDX pipeline: `@next/mdx`, frontmatter, code highlighting
- [ ] 36 Reading-time and word-count helpers for post meta

## Chunk 4 — assets
- [ ] 37 Screenshot cetus-one.vercel.app at 1440 and 390, save to `public/objects`
- [ ] 38 Render page 1 of the A-HQCA paper to an image for the paper object
- [ ] 39 Build the Kairo pipeline diagram as hand-drawn SVG
- [ ] 40 Build the Cetus architecture diagram as hand-drawn SVG
- [ ] 41 Paper texture PNG, tiled, under 40KB
- [ ] 42 Favicon and OG image in the desk style
- [ ] 43 Optimise every object image to webp, set explicit width and height
- [ ] 44 `public/objects/manifest.ts` mapping object id to asset and alt text

## Chunk 5 — home
- [ ] 45 Hero statement with highlighter on one word
- [ ] 46 Scattered object field behind the hero, responsive positions
- [ ] 47 Location and study line with inline emoji
- [ ] 48 Graph-paper note: what he is working on, handwritten list
- [ ] 49 Serif lead-in to the work collage
- [ ] 50 Work collage: five objects with handwritten captions, links to detail
- [ ] 51 Research object: the stamped paper, links to the paper page
- [ ] 52 Contact block: schedule a call, email, socials
- [ ] 53 Home responsive pass at 390 / 768 / 1440
- [ ] 54 Home motion pass: stagger, overshoot, reduced-motion

## Chunk 6 — work
- [ ] 55 `/work`: "Featured Work" heading, hero object
- [ ] 56 3-column object grid with name and date
- [ ] 57 Archive rows: title, category in small caps, right date, dotted rule
- [ ] 58 `/work/[slug]`: detail layout, hero object, role, stack, dates
- [ ] 59 Detail body in MDX with figures and captions
- [ ] 60 Prev / next project navigation
- [ ] 61 Live and repo links with an external-link affordance
- [ ] 62 Work responsive and motion pass

## Chunk 7 — blog
- [ ] 63 `/blog`: featured post with illustration, excerpt, accent pill link
- [ ] 64 All-posts index rows with dotted rules
- [ ] 65 `/blog/[slug]`: prose layout at 620px, drop cap, marginalia
- [ ] 66 Code blocks in JetBrains Mono with a paper-tinted background
- [ ] 67 Post meta: date, reading time, tags
- [ ] 68 RSS feed at `/rss.xml`
- [ ] 69 Blog responsive and motion pass

## Chunk 8 — about
- [ ] 70 `/about`: hero object (open notebook), heading with updated date
- [ ] 71 Pull quote in italic serif with a drawn annotation
- [ ] 72 Prose with drop cap, bold inline emphasis
- [ ] 73 Timeline: UMT 2027, Grow_in, Mailtrail, freelance
- [ ] 74 Research callout linking to the paper
- [ ] 75 Contact and availability
- [ ] 76 About responsive and motion pass

## Chunk 9 — system polish
- [ ] 77 404 page in the desk language
- [ ] 78 Loading and error states
- [ ] 79 View transitions between routes
- [ ] 80 Cursor affordance on draggable objects
- [ ] 81 Optional: drag objects on the desk, positions persisted per session
- [ ] 82 Keyboard focus order audit across every page
- [ ] 83 Contrast audit against WCAG AA on paper
- [ ] 84 `prefers-reduced-motion` audit
- [ ] 85 Print stylesheet

## Chunk 10 — ship
- [ ] 86 Metadata per route, canonical URLs
- [ ] 87 OG and Twitter cards per route
- [ ] 88 `sitemap.xml`, `robots.txt`
- [ ] 89 JSON-LD: Person, and ScholarlyArticle for the paper
- [ ] 90 Analytics hook, privacy-respecting
- [ ] 91 Lighthouse pass: LCP under 2s on 4G, CLS under 0.05
- [ ] 92 Bundle audit, drop anything unused
- [ ] 93 `next build` clean, no type errors, no lint errors
- [ ] 94 Screenshot every page at 390 / 768 / 1440 and self-critique
- [ ] 95 Fix everything the critique finds
- [ ] 96 README with how to run, how to add a post, how to add a project
- [ ] 97 Push branch, open PR
- [ ] 98 Vercel preview deploy
- [ ] 99 Domain and redirect from the old netlify site
- [ ] 100 Merge to main once he has seen it
