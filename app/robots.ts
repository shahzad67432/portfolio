import type { MetadataRoute } from "next";

/** Same origin as app/sitemap.ts and `metadataBase` in app/layout.tsx. */
const SITE = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://muhammadshahzadali.netlify.app"
).replace(/\/+$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /styleguide is a build surface that measures tokens at runtime. It is
        // useful to keep shipped and pointless to index.
        disallow: ["/styleguide"],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
