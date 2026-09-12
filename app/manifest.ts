import type { MetadataRoute } from "next";

import { profile } from "@/content/profile";

/**
 * Installed, this is a reader: four pages, no offline state, no app shell. So it
 * declares minimal-ui rather than standalone, keeps the paper token for both the
 * launch screen and the chrome, and points at the one icon the site already has.
 * app/icon.svg is served at /icon.svg and scales to any size it is asked for,
 * which is why a single entry with sizes "any" is the whole set.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name}, ${profile.role.toLowerCase()}`,
    short_name: profile.short,
    description:
      "Full stack applied AI engineer in Lahore. I build products with agents, and write about what breaks.",
    start_url: "/",
    scope: "/",
    display: "minimal-ui",
    orientation: "portrait-primary",
    background_color: "#F7F5F1",
    theme_color: "#F7F5F1",
    lang: "en",
    dir: "ltr",
    categories: ["portfolio", "productivity"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
