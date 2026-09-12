/**
 * Paper fibre.
 *
 * Two candidates were compared at 1440px: this inline turbulence tile and the
 * generated /generated/paper-fibre.png. The PNG loses on both counts the brief
 * cares about. It is exactly neutral (its mean pixel is 236.6 / 236.6 / 236.6,
 * red minus blue = 0.00), so multiplying it over the ground only removes
 * luminance and leaves the desk greyer than it started, and at 1200x750 and
 * 468 KB it is neither a tile nor cheap: it would have to be scaled to a tile
 * size it was not drawn for, and the seam would show.
 *
 * The tile below is ~700 bytes inline, costs no request, and stitches
 * seamlessly (stitchTiles at 0.9 over 180px lands on the lattice). The fix for
 * the greyness is in the colour matrix: instead of desaturating the noise, the
 * matrix throws away the noise colour and keeps only its alpha, then paints
 * that alpha in a warm sepia. Multiplied into the paper it darkens blue hardest
 * and red least, so the ground warms as it grains instead of going flat.
 *
 * colour-interpolation-filters is pinned to sRGB: the linearRGB default would
 * push the same numbers far darker in Chrome and Safari.
 */
const TILE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">
      <filter id="g" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.36 0 0 0 0 0.29 0 0 0 0 0.17 0.55 0.35 0.2 0 -0.42"/>
      </filter>
      <rect width="180" height="180" filter="url(#g)"/>
    </svg>`,
  );

export function Grain() {
  return (
    <div
      aria-hidden
      data-decoration
      className="pointer-events-none fixed inset-0 z-0 opacity-40 mix-blend-multiply"
      style={{
        backgroundImage: `url("${TILE}")`,
        backgroundSize: "180px 180px",
        backgroundRepeat: "repeat",
      }}
    />
  );
}
