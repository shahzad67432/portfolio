/**
 * Shared ink filter. Every diagram on the site is drawn through it, so straight
 * SVG lines pick up the wobble of a pen that was held by a person.
 */
export function InkFilter({ id = "ink", scale = 2.2 }: { id?: string; scale?: number }) {
  return (
    <defs>
      <filter id={id} x="-8%" y="-8%" width="116%" height="116%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.014 0.02"
          numOctaves={3}
          seed={7}
          result="noise"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="noise"
          scale={scale}
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </defs>
  );
}
