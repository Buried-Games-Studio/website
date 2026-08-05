#!/usr/bin/env node
/**
 * Publish one asset to the CDN under a content-hashed, immutable URL.
 *
 *   node scripts/publish-asset.mjs <file> <dest-dir> [--publish]
 *   node scripts/publish-asset.mjs ~/Desktop/cover.jpg images/design-works/my-slug
 *
 * The filename gets a hash of its bytes — cover.a3f91c2e.jpg — and lands under
 * the /site/ prefix, which a Cloudflare cache rule pins for a year. Changing an
 * image therefore changes its URL: the new one is live immediately and the old
 * one keeps working for anything still pointing at it. Nothing to purge, and no
 * window where the CDN serves the previous bytes — which is also why publishing
 * over a hashed URL never needs `pnpm after-deploy`.
 *
 * That is why entries paste in full URLs rather than building them from a base
 * constant: the hash is per file, so there is nothing to concatenate.
 *
 * Uses wrangler rather than the S3 SDK — it is the tool this repo already
 * documents for R2, and it keeps a 20 MB AWS dependency out of a marketing
 * site's package.json.
 *
 * Never publish anything client-confidential here: this bucket is public and
 * CDN-fronted. Client deliverables belong in the private `documents` bucket,
 * which deliberately has no hostname at all.
 */

import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { basename, extname, resolve } from 'node:path';

const HOST = 'https://assets.buriedgames.com';
const BUCKET = 'assets';
/** wrangler sees two accounts on this Mac — pin the one holding the bucket. */
const ACCOUNT_ID = '15e65a55496c453852c91a0806965603';

const CONTENT_TYPES = {
  '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4', '.webm': 'video/webm', '.woff2': 'font/woff2',
};

const [file, destDir] = process.argv.slice(2);
const publish = process.argv.includes('--publish');
if (!file || !destDir) {
  console.error('usage: publish-asset.mjs <file> <dest-dir> [--publish]');
  console.error('   eg: publish-asset.mjs cover.jpg images/design-works/my-slug');
  process.exit(1);
}

const path = resolve(file);
const bytes = await readFile(path);
const ext = extname(path).toLowerCase();
const hash = createHash('sha256').update(bytes).digest('hex').slice(0, 8);
const key = `site/${destDir.replace(/^\/+|\/+$/g, '')}/${basename(path, ext)}.${hash}${ext}`;
const url = `${HOST}/${key}`;

if (!publish) {
  console.log(`would publish -> ${url}`);
  console.log(`(${(bytes.length / 1024).toFixed(0)} KB — re-run with --publish)`);
  process.exit(0);
}

execFileSync(
  'npx',
  [
    '-y', 'wrangler', 'r2', 'object', 'put', `${BUCKET}/${key}`,
    '--file', path,
    '--content-type', CONTENT_TYPES[ext] ?? 'application/octet-stream',
    // Belt and braces with the Cloudflare rule: the object declares its own
    // immutability too, so removing the rule cannot silently un-cache it.
    '--cache-control', 'public, max-age=31536000, immutable',
    '--remote',
  ],
  { stdio: 'inherit', env: { ...process.env, CLOUDFLARE_ACCOUNT_ID: ACCOUNT_ID } },
);

console.log(`\npublished:\n${url}`);
