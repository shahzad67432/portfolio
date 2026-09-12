import { ImageResponse } from "next/og";

import { profile } from "@/content/profile";

export const alt = `${profile.name}, ${profile.role.toLowerCase()} in ${profile.location}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The card is the desk at card scale: warm paper ground, one white sheet resting
 * a degree off axis with a contact shadow, the dot mark, his name and the role.
 *
 * Fonts stay at the stack ImageResponse can resolve on its own. Nothing is
 * fetched at request time, so the card renders the same on every host.
 */
const SERIF = 'Georgia, "Times New Roman", Times, serif';
const SANS = 'Helvetica, "Helvetica Neue", Arial, sans-serif';

const PAPER = "#F7F5F1";
const SHEET = "#FBFAF6";
const INK = "#111110";
const INK_BODY = "#434343";
const INK_META = "#939289";
const ACCENT = "#ED682B";

/** The mark: one dot per thing currently being built. */
const DOTS: ReadonlyArray<readonly [number, number, number]> = [
  [16, 7, 5.4],
  [8.4, 13.4, 4.6],
  [23.6, 13.4, 4.6],
  [11.2, 22.4, 5],
  [20.8, 22.4, 5],
  [16, 15.6, 4.2],
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 40,
          backgroundColor: PAPER,
          backgroundImage: `radial-gradient(120% 80% at 50% -10%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 60%)`,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px",
            backgroundColor: SHEET,
            borderRadius: 4,
            transform: "rotate(-0.8deg)",
            boxShadow:
              "0 2px 4px rgba(17,17,16,0.07), 0 28px 56px -26px rgba(17,17,16,0.42)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <svg width="44" height="44" viewBox="0 0 32 32">
              {DOTS.map(([cx, cy, r]) => (
                <circle
                  key={`${cx}-${cy}`}
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill={ACCENT}
                  opacity={0.92}
                />
              ))}
            </svg>
            <div
              style={{
                fontFamily: SANS,
                fontSize: 20,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: INK_META,
              }}
            >
              {profile.location}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontFamily: SERIF,
                fontSize: 92,
                lineHeight: 1.05,
                letterSpacing: -2,
                color: INK,
              }}
            >
              {profile.name}
            </div>
            <div
              style={{
                width: 72,
                height: 4,
                marginTop: 34,
                marginBottom: 30,
                backgroundColor: ACCENT,
              }}
            />
            <div
              style={{
                fontFamily: SANS,
                fontSize: 36,
                color: INK_BODY,
              }}
            >
              {profile.role}
            </div>
            <div
              style={{
                fontFamily: SANS,
                fontSize: 24,
                marginTop: 14,
                color: INK_META,
              }}
            >
              {profile.study}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
