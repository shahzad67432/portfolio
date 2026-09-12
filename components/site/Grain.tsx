/**
 * Paper fibre. An inline SVG turbulence tile, multiplied over the whole page at
 * low opacity so the ground reads as a sheet rather than a flat fill.
 */
const TILE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">
      <filter id="g">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/>
        <feColorMatrix type="saturate" values="0"/>
      </filter>
      <rect width="180" height="180" filter="url(#g)" opacity="0.5"/>
    </svg>`,
  );

export function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.35] mix-blend-multiply"
      style={{ backgroundImage: `url("${TILE}")`, backgroundSize: "180px 180px" }}
    />
  );
}
