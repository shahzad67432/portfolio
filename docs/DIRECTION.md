# Direction: the desk

One sentence: **Shahzad's desk, photographed from above, where every object on it
is something he actually built.**

The reference sells a designer-technologist through physical ephemera. Ours sells
a full-stack applied AI engineer through his artefacts: a printed conference
paper with an ACCEPTED stamp, a polaroid of a live product, an index card with
real terminal output, a sticky note carrying a CLAUDE.md, a boarding pass to
Dubai for the conference, a graph-paper card with a hand-drawn system diagram.

## Faces (all free, self-hosted through next/font)
| Role | Face | Why |
|---|---|---|
| Display | Instrument Serif | Same high-contrast editorial voice as PP Editorial New, free |
| UI + body | Instrument Sans | Neutral grotesk, pairs by design with the serif |
| Annotation | Caveat | The handwriting layer, same face the reference uses |
| Mono | JetBrains Mono | Terminal cards and code fragments, which the reference has no need for and we do |

## Tokens
```
--paper:        #F7F5F1   page ground
--paper-deep:   #EFEBE3   recessed areas, tape, shadows on paper
--ink:          #111110   display text
--ink-body:     #434343   body text
--ink-meta:     #939289   dates, labels, captions
--accent:       #ED682B   active nav, annotations, links on hover
--accent-soft:  #FBD9C6   highlighter swatch
--highlight:    #FCE19C   marker behind a word
--rule:         #DAD5CA   dotted separators and hairlines
```
Radii: 2px on paper edges, 8px on cards, 50% on dots. Shadows are contact
shadows, never the Material ramp: `0 1px 2px rgba(17,17,16,.06), 0 12px 28px
-16px rgba(17,17,16,.35)`.

Column: 620px for prose, 860px for indexes, 1200px for the desk surface.

## Motion rules
- Entrance: objects arrive with `cubic-bezier(0.34, 1.56, 0.64, 1)` over 320ms,
  translating up 12px and settling at their resting rotation. They overshoot by
  design, so they land like something set down on a table.
- Annotation: hand-drawn SVG circles and underlines draw with
  `stroke-dashoffset` over 1.2s `cubic-bezier(0.22, 1, 0.36, 1)` when scrolled
  into view, once.
- Hover on an object: lift 4px, rotate toward 0deg, shadow spreads. 180ms.
- `prefers-reduced-motion`: every entrance becomes a 1-frame opacity change, the
  annotation renders already drawn, hover keeps only the shadow change.

## Non-negotiables
Semantic HTML, keyboard reachable with a visible focus ring, 44px minimum touch
targets, real content only, one action name from link to page title, and the
site must be legible at 390px where the desk collapses to a single column.

## Content, from his actual record
- **Work**: Cetus (live), Kairo at Grow_in, the Mailtrail assessment platform,
  the freelance console marketplace, CyberBrain IDS.
- **Research**: the A-HQCA paper, accepted at ICATCICT 2026 Dubai.
- **Blog**: war stories he has already written in `~/Desktop/growth strategy`,
  each sourced from a real commit.
- **Links**: github.com/shahzad67432, x.com/shahzadexec, the LinkedIn profile.
