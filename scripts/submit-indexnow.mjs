/**
 * Submit every sitemap URL to IndexNow (Bing, Yandex, Seznam, naver — and
 * downstream consumers like DuckDuckGo and ChatGPT search via Bing).
 *
 * Run after each production deploy:  pnpm indexnow
 *
 * The key file is served from public/<key>.txt; IndexNow verifies ownership
 * by fetching it, so no other setup is needed.
 */

const HOST = 'buriedgames.com';
const KEY = '6dccf9bd3ad7421c2298bcb2b3736472';
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

async function main() {
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch sitemap: ${res.status} ${res.statusText}`);
  }
  const xml = await res.text();

  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (urls.length === 0) {
    throw new Error('Sitemap contained no <loc> entries — refusing to submit.');
  }

  const submission = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList: urls,
    }),
  });

  // IndexNow returns 200 (ok) or 202 (accepted, key validation pending).
  if (submission.status === 200 || submission.status === 202) {
    console.log(`IndexNow: submitted ${urls.length} URLs (HTTP ${submission.status}).`);
  } else {
    const body = await submission.text();
    throw new Error(`IndexNow rejected the submission: HTTP ${submission.status} ${body}`);
  }
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
