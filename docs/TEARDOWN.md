# Reference teardown: surya.website

Measured 2026-09-12 from live pages (`/`, `/work`, `/blog`, `/about`) with a
headless browser: full-page screenshots plus computed styles off every element.
Raw data in `../reference/data/*.json`, screenshots in `../reference/shots`.

## The idea
The page is a desk photographed from above. Off-white paper fills the viewport,
and the content sits on it as physical objects: a newspaper, a name badge, a
graph-paper card, a pencil with its shavings, polaroids, a cutting mat. Nothing
is a "card component". Every object is rotated a degree or two and casts a soft
contact shadow, so the page reads as a surface rather than a layout.

## Type
| Role | Face | Sizes seen |
|---|---|---|
| Display / statements | PP Editorial New (high-contrast serif) | 54px, 40px, 32px |
| UI, body, meta | PP Neue Montreal Book / Medium | 12px, 14px, 16px, 20px, 24px |
| Annotation, captions | Caveat (handwriting) | 16px, 20px |

Weights are almost entirely 400. One 700 on the whole home page. Letter-spacing
stays `normal` except one 0.54px label. Line-height runs 1.3 on display, 1.5 on
body, 1.25 on tight meta rows.

## Colour
- Paper: warm near-white, roughly `#F7F5F1`, with a faint fibre texture and
  uneven lightness across the sheet.
- Ink: `#000` for display, `#434343` for body, `#939289` for meta.
- Accent: `#ED682B` (orange). It appears on the active nav link, a hand-drawn
  circle, an underline, and the "Continue reading" pill border.
- Highlighter: `#FCE19C` swatch sitting behind one word of the hero line.
- Object surfaces carry their own colour, always photographic.

## Space
Content column is 600px, the wide column 800px, inside a 1440px viewport. Page
heights: home 5400px, work 3113px, about 2656px, blog 2036px. Objects break out
of the column and bleed toward the edges; text never does.

## Motion
Transitions are short and physical. The two custom curves on the page are
`cubic-bezier(0.34, 1.56, 0.64, 1)` for a 0.3s opacity/transform entrance (an
overshoot, so objects land rather than fade) and `cubic-bezier(0.22, 1, 0.36, 1)`
for a 1.2s `stroke-dashoffset` on the hand-drawn SVG circle, which draws itself
as it enters the viewport. No WebGL: 0 `<canvas>` elements on any page, 15 inline
SVGs, 27 images on home.

## Page shapes
- **Home**: hero statement over scattered desk objects, a graph-paper note with a
  handwritten list, a serif lead-in ("Here are some interesting things I've been
  working on lately…"), then a loose collage of project objects with handwritten
  captions, then contact.
- **Work**: `Featured Work` serif heading, one large hero object, a 3-column grid
  of object thumbnails with name and date underneath, then `Archive`: rows of
  title over a small caps category, right-aligned date, dotted separator.
- **Blog**: one featured post with illustration, serif title, date, excerpt, an
  orange outlined "Continue reading →" pill, then `All Blogs`: title left, date
  right, dotted separator, ~14 rows.
- **About**: one large photographic object (an open notebook on a cutting mat),
  serif heading with "Updated <date>", a pull-quote in italic serif with a
  hand-drawn orange circle around one word, then body prose with a drop cap.

## What we take, and what we do not
Take: the desk metaphor, the three-face type system, the paper ground, the
handwritten annotation layer, the archive row pattern, the overshoot entrance.
Do not take: their photographs, their copy, their logo, or the Pangram Pangram
faces, which are licensed. Our objects are made from Shahzad's own artefacts and
the faces are free equivalents.
