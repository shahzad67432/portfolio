import { profile } from "@/content/profile";
import { getPosts } from "@/lib/content";

/** Matches `metadataBase` in app/layout.tsx. */
const SITE = "https://muhammadshahzadali.netlify.app";

const DESCRIPTION =
  "Things that broke while I was building, and what each one turned out to be. Every post here started as a real commit.";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** RSS wants RFC 822. Posts carry a date with no time, so they publish at 09:00 UTC. */
function rfc822(iso: string): string {
  return new Date(`${iso}T09:00:00Z`).toUTCString();
}

function itemFor(post: {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: readonly string[];
  body: readonly string[];
}): string {
  const url = `${SITE}/blog/${post.slug}`;
  const categories = post.tags
    .map((tag) => `      <category>${escapeXml(tag)}</category>`)
    .join("\n");
  const html = post.body
    .map((paragraph) => `<p>${escapeXml(paragraph)}</p>`)
    .join("");

  return [
    "    <item>",
    `      <title>${escapeXml(post.title)}</title>`,
    `      <link>${url}</link>`,
    `      <guid isPermaLink="true">${url}</guid>`,
    `      <pubDate>${rfc822(post.date)}</pubDate>`,
    categories,
    `      <description>${escapeXml(post.excerpt)}</description>`,
    `      <content:encoded><![CDATA[${html}]]></content:encoded>`,
    "    </item>",
  ]
    .filter((line) => line.length > 0)
    .join("\n");
}

export function GET(): Response {
  const posts = getPosts();
  const latest = posts[0];
  const built = latest ? rfc822(latest.date) : new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(profile.name)}</title>
    <link>${SITE}/blog</link>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(DESCRIPTION)}</description>
    <language>en</language>
    <copyright>${escapeXml(profile.name)}</copyright>
    <managingEditor>${profile.email} (${escapeXml(profile.name)})</managingEditor>
    <lastBuildDate>${built}</lastBuildDate>
${posts.map(itemFor).join("\n")}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
