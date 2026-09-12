import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Whether a file under `public/` is actually on disk, read at render on the
 * server. The desk is assembled from real artefacts, so a screenshot that has
 * not been taken yet has to degrade to an empty photo well rather than to a
 * broken image.
 */
export function hasPublicAsset(src: string): boolean {
  return existsSync(join(process.cwd(), "public", src.replace(/^\//, "")));
}
