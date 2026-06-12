/**
 * Purge the Cloudflare edge cache for the whole zone. Run after every
 * production deploy: HTML is edge-cached (Next marks static pages cacheable
 * for a year), so without a purge the edge keeps serving the previous build.
 *
 *   pnpm after-deploy   (purges, then resubmits the sitemap to IndexNow)
 *
 * Reads the API token from TOKENS.md (gitignored) — never hardcode it here.
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ZONE_ID = 'd1c5abd26d6abdc3b7a94d4675112ac4'; // buriedgames.com

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const tokens = readFileSync(join(repoRoot, 'TOKENS.md'), 'utf8');
const token = tokens.match(/ClaudeFlare = "(cf[a-z]+_[A-Za-z0-9]+)"/)?.[1];
if (!token) {
  throw new Error('Cloudflare token not found in TOKENS.md');
}

const res = await fetch(
  `https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/purge_cache`,
  {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ purge_everything: true }),
  },
);
const data = await res.json();
if (!data.success) {
  throw new Error(`Purge failed: ${JSON.stringify(data.errors)}`);
}
console.log('Cloudflare cache purged for buriedgames.com.');
