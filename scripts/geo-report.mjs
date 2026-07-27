#!/usr/bin/env node
/**
 * Weekly GEO/SEO report — what the studio's search + AI presence actually did
 * this week, and how that compares with last week.
 *
 * Sources: Google Search Console (search analytics + URL Inspection index
 * coverage), GA4 (sessions, channels, conversions, AI-assistant acquisition,
 * paid waste), Cloudflare (AI crawler hits), Bing Webmaster. One markdown file
 * per run under reports/geo-weekly/ (gitignored), optionally emailed.
 *
 * No dependencies. Secrets are read at runtime from TOKENS.md and
 * ga4-service-account.json at the repo root (both gitignored). Every source is
 * wrapped so one dead API degrades its own section instead of killing the run.
 *
 * Usage:
 *   node scripts/geo-report.mjs           full run — the index-coverage sweep
 *                                         inspects every sitemap URL one by
 *                                         one and takes ~10 minutes
 *   node scripts/geo-report.mjs --fast    skip the coverage sweep (seconds)
 *   node scripts/geo-report.mjs --email   also deliver it through Brevo
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createSign } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ZONE = 'd1c5abd26d6abdc3b7a94d4675112ac4';
const GA4_PROPERTY = 'properties/506151257';
const SITE = 'https://buriedgames.com';
/** GA4 custom channel group "Acquisition with AI Assistants" (AI rule first). */
const AI_CHANNEL_GROUP = '15253704936';
/** Search Analytics data is incomplete for ~2 days; both windows shift by it. */
const GSC_LAG_DAYS = 2;
/** URL Inspection quota is 600/min per property — 250ms keeps us well under. */
const INSPECT_THROTTLE_MS = 250;

const ARGV = process.argv.slice(2);
const flag = (...names) => names.some((n) => ARGV.includes(n));
if (flag('--help', '-h')) {
  console.log(
    'geo-report — weekly GEO/SEO report\n\n' +
      '  --fast, --no-coverage   skip the ~96-URL Google index-coverage sweep\n' +
      '  --email                 send the report through Brevo (cron uses this)\n',
  );
  process.exit(0);
}
const SKIP_COVERAGE = flag('--fast', '--no-coverage');

const tokens = readFileSync(join(ROOT, 'TOKENS.md'), 'utf8');
const CF_TOKEN = tokens.match(/ClaudeFlare\s*=\s*"([^"]+)"/i)[1];
const BING_KEY = tokens.match(/BingWebmasterAPI\s*=\s*"([^"]+)"/i)[1];
const GA_KEY = JSON.parse(readFileSync(join(ROOT, 'ga4-service-account.json'), 'utf8'));

const AI_BOTS = [
  'GPTBot', 'ChatGPT-User', 'OAI-SearchBot',
  'ClaudeBot', 'Claude-User', 'Claude-SearchBot',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'meta-external', 'Amazonbot', 'Bytespider', 'Applebot',
];
const AI_SOURCE_REGEX =
  'chatgpt|openai|perplexity|claude|gemini|bard|copilot|deepseek|grok|meta\\.ai|you\\.com|mistral';
/** Both real conversion paths. WhatsApp is the dominant one — never drop it. */
const CONVERSIONS = { contact_form_submitted: 'contact form', whatsapp_click: 'WhatsApp' };
/** Pages that must rank for the business to work — flagged when not indexed. */
const HIGH_VALUE = /^\/(?:ar\/)?(?:services|game-development-|case-studies)/;

// ── small helpers ──

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const dstr = (d) => d.toISOString().slice(0, 10);
const daysAgo = (n) => dstr(new Date(Date.now() - n * 86400e3));
const num = (n) => Number(n).toLocaleString('en-US');
const pct = (v) => `${(Number(v) * 100).toFixed(0)}%`;
const plural = (n, word) => `${n} ${word}${Number(n) === 1 ? '' : 's'}`;
const today = daysAgo(0);

/** GSC windows: 7 complete days, and the 7 before them. */
const GSC_CUR = { start: daysAgo(GSC_LAG_DAYS + 6), end: daysAgo(GSC_LAG_DAYS) };
const GSC_PREV = { start: daysAgo(GSC_LAG_DAYS + 13), end: daysAgo(GSC_LAG_DAYS + 7) };

// ── Cloudflare: AI crawler hits, one 1-day query per day (free-plan limit;
// the same plan only retains 8 days, so week-over-week comes from history) ──

async function cfDay(dayStart, dayEnd) {
  const query = `query { viewer { zones(filter: {zoneTag: "${ZONE}"}) {
    httpRequestsAdaptiveGroups(filter: {
      datetime_geq: "${dayStart}", datetime_lt: "${dayEnd}",
      OR: [${AI_BOTS.map((b) => `{userAgent_like: "%${b}%"}`).join(', ')}]
    }, limit: 100) { count dimensions { userAgent } }
  } } }`;
  const res = await fetch('https://api.cloudflare.com/client/v4/graphql', {
    method: 'POST',
    headers: { Authorization: `Bearer ${CF_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  const json = await res.json();
  return json.data?.viewer?.zones?.[0]?.httpRequestsAdaptiveGroups ?? [];
}

async function cloudflareCrawlers() {
  const perBot = Object.fromEntries(AI_BOTS.map((b) => [b, 0]));
  const now = new Date();
  for (let i = 7; i >= 1; i--) {
    const start = new Date(now.getTime() - i * 86400e3).toISOString();
    const end = new Date(now.getTime() - (i - 1) * 86400e3).toISOString();
    for (const g of await cfDay(start, end)) {
      const bot = AI_BOTS.find((b) => g.dimensions.userAgent.includes(b));
      if (bot) perBot[bot] += g.count;
    }
  }
  return { perBot, total: Object.values(perBot).reduce((s, c) => s + c, 0) };
}

// ── Google auth (service-account JWT, no deps), one token per scope ──

const ANALYTICS_SCOPE = 'https://www.googleapis.com/auth/analytics.readonly';
const WEBMASTERS_SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';
const tokenCache = new Map();

const b64url = (buf) =>
  Buffer.from(buf).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

function gaToken(scope = ANALYTICS_SCOPE) {
  if (!tokenCache.has(scope)) tokenCache.set(scope, mintToken(scope));
  return tokenCache.get(scope);
}

async function mintToken(scope) {
  const now = Math.floor(Date.now() / 1000);
  const unsigned =
    b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' })) +
    '.' +
    b64url(
      JSON.stringify({
        iss: GA_KEY.client_email,
        scope,
        aud: 'https://oauth2.googleapis.com/token',
        iat: now,
        exp: now + 3600,
      }),
    );
  const sign = createSign('RSA-SHA256');
  sign.update(unsigned);
  const jwt = `${unsigned}.${b64url(sign.sign(GA_KEY.private_key))}`;
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });
  const json = await res.json();
  if (!json.access_token) throw new Error(`auth failed: ${json.error_description ?? json.error}`);
  return json.access_token;
}

// ── GA4 Data API ──

/** Each query fails on its own so a missing dimension can't blank the section. */
async function gaQuery(body) {
  try {
    const token = await gaToken();
    const res = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/${GA4_PROPERTY}:runReport`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      },
    );
    const json = await res.json();
    if (json.error) throw new Error(json.error.message);
    return {
      rows: (json.rows ?? []).map((row) => ({
        dims: (row.dimensionValues ?? []).map((d) => d.value),
        metrics: (row.metricValues ?? []).map((m) => m.value),
      })),
    };
  } catch (e) {
    return { error: e.message, rows: [] };
  }
}

const CUR = { startDate: '7daysAgo', endDate: 'today', name: 'cur' };
const PREV = { startDate: '14daysAgo', endDate: '8daysAgo', name: 'prev' };
const D28 = { startDate: '28daysAgo', endDate: 'today', name: 'd28' };
const D90 = { startDate: '90daysAgo', endDate: 'today', name: 'd90' };
const inList = (fieldName, values) => ({ filter: { fieldName, inListFilter: { values } } });
const byMetric = (metricName) => [{ metric: { metricName }, desc: true }];
/** With >1 date range GA4 appends a `dateRange` dimension holding the range name. */
const inRange = (rows, name) => rows.filter((r) => r.dims[r.dims.length - 1] === name);

async function ga4Stats() {
  const totals = await gaQuery({
    dateRanges: [CUR, PREV],
    metrics: [{ name: 'sessions' }, { name: 'totalUsers' }, { name: 'engagementRate' }],
  });

  // Channel mix through the custom "Acquisition with AI Assistants" group
  // (AI rule first, default channels cloned after), falling back to the GA4
  // default group if that group is ever deleted.
  let channelLabel = 'custom group "Acquisition with AI Assistants"';
  const channelQuery = (dim) =>
    gaQuery({
      dateRanges: [CUR, PREV],
      dimensions: [{ name: dim }],
      metrics: [
        { name: 'sessions' },
        { name: 'engagementRate' },
        { name: 'keyEvents:whatsapp_click' },
        { name: 'keyEvents:contact_form_submitted' },
      ],
      orderBys: byMetric('sessions'),
      limit: 25,
    });
  let channels = await channelQuery(`sessionCustomChannelGroup:${AI_CHANNEL_GROUP}`);
  if (channels.error) {
    channelLabel = 'GA4 default channel group';
    channels = await channelQuery('sessionDefaultChannelGroup');
  }

  const [aiSessions, conversions, aiVisitors, paid, firstTouch, consentCoverage] =
    await Promise.all([
      // AI-assistant acquisition from sessionSource — works without consent,
      // unlike the first_touch event below.
      gaQuery({
        dateRanges: [CUR, PREV, D28],
        dimensions: [{ name: 'sessionSource' }],
        metrics: [{ name: 'sessions' }, { name: 'totalUsers' }, { name: 'engagementRate' }],
        dimensionFilter: {
          filter: {
            fieldName: 'sessionSource',
            stringFilter: {
              matchType: 'PARTIAL_REGEXP',
              value: AI_SOURCE_REGEX,
              caseSensitive: false,
            },
          },
        },
        orderBys: byMetric('sessions'),
        limit: 30,
      }),
      // Every conversion, by type — the contact form AND WhatsApp.
      gaQuery({
        dateRanges: [CUR, PREV, D28],
        dimensions: [
          { name: 'eventName' },
          { name: 'sessionSource' },
          { name: 'sessionDefaultChannelGroup' },
        ],
        metrics: [{ name: 'eventCount' }, { name: 'totalUsers' }],
        dimensionFilter: inList('eventName', Object.keys(CONVERSIONS)),
        orderBys: byMetric('eventCount'),
        limit: 60,
      }),
      // "Visited but didn't contact": AI sessions × country × landing page.
      // 28-day window — weekly AI volumes are too sparse to read on their own.
      gaQuery({
        dateRanges: [D28],
        dimensions: [{ name: 'sessionSource' }, { name: 'country' }, { name: 'landingPage' }],
        metrics: [
          { name: 'sessions' },
          { name: 'keyEvents:contact_form_submitted' },
          { name: 'keyEvents:whatsapp_click' },
        ],
        dimensionFilter: {
          filter: {
            fieldName: 'sessionSource',
            stringFilter: {
              matchType: 'PARTIAL_REGEXP',
              value: AI_SOURCE_REGEX,
              caseSensitive: false,
            },
          },
        },
        orderBys: byMetric('sessions'),
        limit: 40,
      }),
      // Paid campaigns over 90d — ads run in bursts, so a 7d view hides spend.
      gaQuery({
        dateRanges: [D90],
        dimensions: [
          { name: 'sessionDefaultChannelGroup' },
          { name: 'sessionSource' },
          { name: 'sessionMedium' },
          { name: 'sessionCampaignName' },
        ],
        metrics: [
          { name: 'sessions' },
          { name: 'engagementRate' },
          { name: 'averageSessionDuration' },
          { name: 'keyEvents:whatsapp_click' },
          { name: 'keyEvents:contact_form_submitted' },
        ],
        dimensionFilter: inList('sessionDefaultChannelGroup', [
          'Paid Search', 'Paid Social', 'Paid Video', 'Paid Shopping', 'Paid Other',
          'Display', 'Cross-network',
        ]),
        orderBys: byMetric('sessions'),
        limit: 20,
      }),
      // Consent-gated first-touch attribution (kept for the lead emails' sake).
      gaQuery({
        dateRanges: [D90],
        dimensions: [
          { name: 'customEvent:first_touch_channel' },
          { name: 'customEvent:first_touch_source' },
        ],
        metrics: [{ name: 'eventCount' }],
        dimensionFilter: inList('eventName', ['first_touch']),
        orderBys: byMetric('eventCount'),
        limit: 20,
      }),
      // How badly consent gates it: first_touch events vs actual first visits.
      gaQuery({
        dateRanges: [D90],
        dimensions: [{ name: 'eventName' }],
        metrics: [{ name: 'eventCount' }],
        dimensionFilter: inList('eventName', ['first_touch', 'first_visit']),
      }),
    ]);

  return {
    totals, channels, channelLabel, aiSessions, conversions, aiVisitors, paid,
    firstTouch, consentCoverage,
  };
}

// ── Google Search Console (same service account; it must be a user on the
// property in GSC Settings → Users — reported as unavailable until then) ──

let gscPropertyPromise;
function gscProperty() {
  gscPropertyPromise ??= (async () => {
    const token = await gaToken(WEBMASTERS_SCOPE);
    const res = await fetch('https://www.googleapis.com/webmasters/v3/sites', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await res.json();
    const entry = (json.siteEntry ?? []).find((s) => s.siteUrl.includes('buriedgames.com'));
    if (!entry) throw new Error('service account has no access to the GSC property yet');
    return entry.siteUrl;
  })();
  return gscPropertyPromise;
}

async function searchAnalytics(body) {
  const [siteUrl, token] = await Promise.all([gscProperty(), gaToken(WEBMASTERS_SCOPE)]);
  const res = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    },
  );
  const json = await res.json();
  if (json.error) throw new Error(json.error.message);
  return json.rows ?? [];
}

/**
 * Search Analytics has no orderBys: it sorts (and truncates to rowLimit) by
 * clicks desc, then dimension asc — which is why a rowLimit of 10 used to show
 * one clicked query plus nine alphabetically-early zero-click ones. Pull a deep
 * page and rank by impressions here instead.
 */
const byImpressions = (rows, take) =>
  [...rows].sort((a, b) => b.impressions - a.impressions).slice(0, take);

async function gscStats() {
  const win = (w) => ({ startDate: w.start, endDate: w.end });
  const [curTotals, prevTotals, queries, pages] = await Promise.all([
    searchAnalytics({ ...win(GSC_CUR), dimensions: [] }),
    searchAnalytics({ ...win(GSC_PREV), dimensions: [] }),
    searchAnalytics({ ...win(GSC_CUR), dimensions: ['query'], rowLimit: 1000 }),
    searchAnalytics({ ...win(GSC_CUR), dimensions: ['page'], rowLimit: 1000 }),
  ]);
  return {
    cur: curTotals[0] ?? null,
    prev: prevTotals[0] ?? null,
    queries: byImpressions(queries, 25),
    queryCount: queries.length,
    pages: byImpressions(pages, 15),
    pageCount: pages.length,
  };
}

// ── Google index coverage (URL Inspection API over every sitemap URL) ──

async function sitemapUrls() {
  const read = async (url) => (await fetch(url, { headers: { 'User-Agent': 'geo-report' } })).text();
  const locs = (xml) => [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
  const xml = await read(`${SITE}/sitemap.xml`);
  if (!xml.includes('<sitemapindex')) return locs(xml);
  const children = await Promise.all(locs(xml).map(read));
  return children.flatMap(locs);
}

async function inspectUrl(url, siteUrl, token) {
  for (let attempt = 0; attempt < 2; attempt++) {
    const res = await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ inspectionUrl: url, siteUrl }),
    });
    const json = await res.json();
    if (!json.error) return json.inspectionResult?.indexStatusResult ?? {};
    if (attempt || (res.status !== 429 && res.status < 500)) throw new Error(json.error.message);
    await sleep(2000);
  }
  throw new Error('rate limited');
}

/**
 * ~96 sequential calls. The Inspection API answers in ~6s, so budget ~10
 * minutes; it is throttled, retries transient failures once, and records a
 * dead URL instead of aborting the sweep.
 */
async function indexCoverage() {
  const [siteUrl, token, urls] = await Promise.all([
    gscProperty(),
    gaToken(WEBMASTERS_SCOPE),
    sitemapUrls(),
  ]);
  if (!urls.length) throw new Error('sitemap.xml returned no URLs');

  const buckets = {};
  const notIndexed = [];
  const failures = [];
  let indexed = 0;
  for (const [i, url] of urls.entries()) {
    try {
      const status = await inspectUrl(url, siteUrl, token);
      const state = status.coverageState ?? 'unknown';
      buckets[state] = (buckets[state] ?? 0) + 1;
      if (/indexed/i.test(state) && !/not indexed/i.test(state)) indexed++;
      else notIndexed.push({ path: url.replace(SITE, '') || '/', state });
    } catch (e) {
      failures.push({ url, message: e.message });
      buckets['API error'] = (buckets['API error'] ?? 0) + 1;
    }
    // Live progress on a terminal; a handful of lines in the cron log.
    const done = i + 1;
    if (process.stderr.isTTY) process.stderr.write(`  coverage sweep: ${done}/${urls.length}\r`);
    else if (done % 25 === 0 || done === urls.length)
      console.error(`  coverage sweep: ${done}/${urls.length}`);
    await sleep(INSPECT_THROTTLE_MS);
  }
  if (process.stderr.isTTY) process.stderr.write('\n');
  return { total: urls.length, indexed, buckets, notIndexed, failures };
}

// ── Bing Webmaster ──

async function bingStats() {
  const get = async (method) => {
    const res = await fetch(
      `https://ssl.bing.com/webmaster/api.svc/json/${method}?apikey=${BING_KEY}&siteUrl=${encodeURIComponent(SITE)}`,
    );
    return (await res.json()).d;
  };
  const [crawl, traffic] = await Promise.all([get('GetCrawlStats'), get('GetRankAndTrafficStats')]);
  const latest = crawl[crawl.length - 1] ?? {};
  const sum = (days, key) => days.reduce((s, d) => s + (d[key] ?? 0), 0);
  const week = traffic.slice(-7);
  const prevWeek = traffic.slice(-14, -7);
  return {
    inIndex: latest.InIndex,
    crawledPerDay: latest.CrawledPages,
    crawlErrors: latest.CrawlErrors,
    impressions: sum(week, 'Impressions'),
    clicks: sum(week, 'Clicks'),
    prevImpressions: prevWeek.length ? sum(prevWeek, 'Impressions') : null,
    prevClicks: prevWeek.length ? sum(prevWeek, 'Clicks') : null,
  };
}

// ── History: week-over-week for the sources that cannot look back themselves
// (Cloudflare retains 8 days on the free plan; URL Inspection has no history) ──

const outDir = join(ROOT, 'reports', 'geo-weekly');
const historyFile = join(outDir, 'history.json');

function readHistory() {
  try {
    const parsed = JSON.parse(readFileSync(historyFile, 'utf8'));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** Newest snapshot that is old enough to be a real comparison (not a re-run). */
function priorSnapshot(history, field, minAgeDays = 3) {
  const cutoff = daysAgo(minAgeDays);
  return (
    history
      .filter((s) => s.date <= cutoff && s[field] != null)
      .sort((a, b) => a.date.localeCompare(b.date))
      .pop() ?? null
  );
}

// ── Formatting ──

const section = (title, lines) => `## ${title}\n\n${lines.join('\n')}\n\n`;
const pad = (v, n) => String(v).padStart(n);

/**
 * "+2 (+25%)" / "-483 (-51%)" / "1.9 better". `lowerIsBetter` is for average
 * position, where a smaller number is the good outcome.
 */
function delta(cur, prev, { decimals = 0, lowerIsBetter = false, showPct = true } = {}) {
  if (prev === null || prev === undefined || Number.isNaN(Number(prev))) return 'no prior data';
  const d = Number(cur) - Number(prev);
  if (Math.abs(d) < (decimals ? 0.05 : 0.5)) return 'flat';
  const abs = `${d > 0 ? '+' : ''}${decimals ? d.toFixed(decimals) : num(d)}`;
  const share = !showPct ? '' : Number(prev) ? ` (${d > 0 ? '+' : ''}${((d / prev) * 100).toFixed(0)}%)` : ' (new)';
  const verdict = lowerIsBetter ? (d < 0 ? ' better' : ' worse') : '';
  return `${abs}${share}${verdict}`;
}

const headline = (label, value, note = '') => `  ${label.padEnd(22)}${pad(value, 7)}   ${note}`.trimEnd();

const SEARCH_HEAD = `${pad('clk', 4)}${pad('impr', 6)}${pad('ctr', 6)}${pad('pos', 5)}  `;
const searchRow = (r, label) =>
  `${pad(r.clicks, 4)}${pad(r.impressions, 6)}${pad(`${(r.ctr * 100).toFixed(1)}%`, 6)}${pad(r.position.toFixed(1), 5)}  ${label}`;

const CHANNEL_HEAD = `${pad('sess', 5)}${pad('prev', 6)}${pad('eng', 6)}${pad('conv', 6)}  `;

// ── Collect ──

const [cf, ga, gsc, bing, coverage] = await Promise.all([
  cloudflareCrawlers().catch((e) => ({ error: e.message })),
  ga4Stats().catch((e) => ({ error: e.message })),
  gscStats().catch((e) => ({ error: e.message })),
  bingStats().catch((e) => ({ error: e.message })),
  SKIP_COVERAGE
    ? Promise.resolve({ skipped: true })
    : indexCoverage().catch((e) => ({ error: e.message })),
]);

const history = readHistory();
const priorCrawlers = priorSnapshot(history, 'crawlerHits');
const priorIndexed = priorSnapshot(history, 'indexed');

// ── Render ──

let md = `# GEO weekly report — ${today}\n\n`;
md += `Site: ${SITE}\n`;
md += `Search window:    ${GSC_CUR.start} to ${GSC_CUR.end}  (vs ${GSC_PREV.start} to ${GSC_PREV.end})\n`;
md += `Analytics window: last 7 days  (vs the 7 days before)\n\n`;

// Headline —————————————————————————————————————————————————————————————

const gaTotalCur = ga.error ? null : inRange(ga.totals.rows, 'cur')[0];
const gaTotalPrev = ga.error ? null : inRange(ga.totals.rows, 'prev')[0];
const convCount = (name) =>
  ga.error
    ? null
    : inRange(ga.conversions.rows, name).reduce((s, r) => s + Number(r.metrics[0]), 0);
const convCur = convCount('cur');
const convPrev = convCount('prev');

const headlineLines = [];
if (!gsc.error && gsc.cur) {
  headlineLines.push(
    headline('Google clicks', gsc.cur.clicks, delta(gsc.cur.clicks, gsc.prev?.clicks)),
    headline('Google impressions', num(gsc.cur.impressions), delta(gsc.cur.impressions, gsc.prev?.impressions)),
    headline('Google avg position', gsc.cur.position.toFixed(1),
      delta(gsc.cur.position, gsc.prev?.position, { decimals: 1, lowerIsBetter: true, showPct: false })),
  );
} else {
  headlineLines.push(headline('Google search', 'n/a', gsc.error ?? 'no data in window'));
}
if (coverage.skipped) headlineLines.push(headline('Google indexed', 'skipped', '--fast'));
else if (coverage.error) headlineLines.push(headline('Google indexed', 'n/a', coverage.error));
else
  headlineLines.push(
    headline(
      'Google indexed',
      `${coverage.indexed}/${coverage.total}`,
      `${pct(coverage.indexed / coverage.total)} of sitemap` +
        (priorIndexed ? ` · ${delta(coverage.indexed, priorIndexed.indexed, { showPct: false })} vs ${priorIndexed.date}` : ''),
    ),
  );
if (gaTotalCur)
  headlineLines.push(
    headline('GA4 sessions', gaTotalCur.metrics[0], delta(gaTotalCur.metrics[0], gaTotalPrev?.metrics[0])),
    headline('Conversions (form+WA)', convCur, delta(convCur, convPrev)),
  );
if (!cf.error)
  headlineLines.push(
    headline('AI crawler hits', num(cf.total),
      priorCrawlers
        ? `${delta(cf.total, priorCrawlers.crawlerHits)} vs ${priorCrawlers.date}`
        : 'first recorded run'),
  );
if (!bing.error)
  headlineLines.push(
    headline('Bing impressions', num(bing.impressions), delta(bing.impressions, bing.prevImpressions)),
  );
md += section('Headline vs last week', headlineLines);

// Index coverage ————————————————————————————————————————————————————————

function coverageLines() {
  if (coverage.skipped) return ['- skipped (--fast); drop the flag for the full sweep'];
  if (coverage.error) return [`- not available: ${coverage.error}`];
  const lines = [
    `- Indexed: ${coverage.indexed}/${coverage.total} sitemap URLs (${pct(coverage.indexed / coverage.total)})`,
    '',
    ...Object.entries(coverage.buckets)
      .sort((a, b) => b[1] - a[1])
      .map(([state, count]) => `${pad(count, 5)}  ${state}`),
  ];
  const highValue = coverage.notIndexed.filter((u) => HIGH_VALUE.test(u.path));
  const [en, ar] = [
    highValue.filter((u) => !u.path.startsWith('/ar')),
    highValue.filter((u) => u.path.startsWith('/ar')),
  ];
  lines.push(
    '',
    `- High-value pages NOT indexed: ${highValue.length} (${en.length} en / ${ar.length} ar)`,
    ...[...en, ...ar].slice(0, 20).map((u) => `  ${u.path}  — ${u.state}`),
  );
  if (highValue.length > 20) lines.push(`  ... and ${highValue.length - 20} more`);
  if (coverage.failures.length)
    lines.push('', `- Inspection errors: ${coverage.failures.length} (${coverage.failures[0].message})`);
  return lines;
}

md += section('Google index coverage (URL Inspection)', coverageLines());

// Search Console ————————————————————————————————————————————————————————

md += section(
  `Google Search — queries by impressions (${gsc.error ? 'n/a' : `${gsc.queries.length} of ${gsc.queryCount}`})`,
  gsc.error
    ? [`- not available: ${gsc.error}`]
    : gsc.queries.length
      ? [SEARCH_HEAD + 'query', ...gsc.queries.map((r) => searchRow(r, r.keys[0]))]
      : ['- no impressions in this window'],
);

md += section(
  `Google Search — pages by impressions (${gsc.error ? 'n/a' : `${gsc.pages.length} of ${gsc.pageCount}`})`,
  gsc.error
    ? [`- not available: ${gsc.error}`]
    : gsc.pages.length
      ? [SEARCH_HEAD + 'page', ...gsc.pages.map((r) => searchRow(r, r.keys[0].replace(SITE, '') || '/'))]
      : ['- no impressions in this window'],
);

// GA4 ———————————————————————————————————————————————————————————————————

if (ga.error) {
  md += section('GA4', [`- not available: ${ga.error}`]);
} else {
  // GA4 returns the union of rows across date ranges, so a row can be zero in
  // this week's range — those are noise here.
  const conversionRows = (range) =>
    inRange(ga.conversions.rows, range)
      .filter((r) => Number(r.metrics[0]) > 0)
      .map((r) => {
        const [event, source, channel] = r.dims;
        return `${pad(r.metrics[0], 4)}  ${(CONVERSIONS[event] ?? event).padEnd(13)} ${source} · ${channel}`;
      });
  const conv28 = inRange(ga.conversions.rows, 'd28').reduce((s, r) => s + Number(r.metrics[0]), 0);
  const thisWeek = conversionRows('cur');
  md += section(
    'Conversions — contact form + WhatsApp (7d)',
    ga.conversions.error
      ? [`- not available: ${ga.conversions.error}`]
      : [
          ...(thisWeek.length ? thisWeek : ['- none this week']),
          '',
          `- This week: ${convCur} · last week: ${convPrev} · last 28 days: ${conv28}`,
          "- WhatsApp clicks count as conversions: they are the studio's dominant contact path.",
        ],
  );

  const channelLines = () => {
    if (ga.channels.error) return [`- not available: ${ga.channels.error}`];
    const prevSessions = Object.fromEntries(
      inRange(ga.channels.rows, 'prev').map((r) => [r.dims[0], r.metrics[0]]),
    );
    const cur = inRange(ga.channels.rows, 'cur');
    if (!cur.length) return ['- no sessions this week'];
    return [
      CHANNEL_HEAD + 'channel',
      ...cur.map((r) => {
        const [channel] = r.dims;
        const [sessions, engagement, whatsapp, form] = r.metrics;
        const conv = Number(whatsapp) + Number(form);
        return `${pad(sessions, 5)}${pad(prevSessions[channel] ?? 0, 6)}${pad(pct(engagement), 6)}${pad(conv, 6)}  ${channel}`;
      }),
    ];
  };
  md += section(`Sessions by channel — ${ga.channelLabel} (7d)`, channelLines());

  const aiSessionLines = () => {
    if (ga.aiSessions.error) return [`- not available: ${ga.aiSessions.error}`];
    const prevSessions = Object.fromEntries(
      inRange(ga.aiSessions.rows, 'prev').map((r) => [r.dims[0], r.metrics[0]]),
    );
    const cur = inRange(ga.aiSessions.rows, 'cur');
    const d28 = inRange(ga.aiSessions.rows, 'd28');
    return [
      ...(cur.length
        ? cur.map((r) => {
            const [source] = r.dims;
            const [sessions, users, engagement] = r.metrics;
            return `- ${source}: ${plural(sessions, 'session')}, ${plural(users, 'user')}, ${pct(engagement)} engaged (prev week ${prevSessions[source] ?? 0})`;
          })
        : ['- none this week']),
      '',
      `- Last 28 days: ${plural(d28.reduce((s, r) => s + Number(r.metrics[0]), 0), 'session')} from ${plural(d28.length, 'AI source')}`,
    ];
  };
  md += section('AI-assistant acquisition (sessionSource — works without consent)', aiSessionLines());

  md += section(
    'Paid campaigns (90d — ads run in bursts)',
    ga.paid.error
      ? [`- not available: ${ga.paid.error}`]
      : ga.paid.rows.length
        ? ga.paid.rows.flatMap((r) => {
            const [channel, source, medium, campaign] = r.dims;
            const [sessions, engagement, duration, wa, form] = r.metrics;
            const conv = Number(wa) + Number(form);
            return [
              `- ${channel} · ${source}/${medium} · ${campaign}`,
              `    ${plural(sessions, 'session')} · ${pct(engagement)} engaged · ${Number(duration).toFixed(1)}s avg · ${plural(conv, 'conversion')}`,
            ];
          })
        : ['- no paid sessions in the last 90 days'],
  );

  md += section(
    'AI visitors — contacted vs not (28d)',
    ga.aiVisitors.error
      ? [`- not available: ${ga.aiVisitors.error}`]
      : ga.aiVisitors.rows.length
        ? ga.aiVisitors.rows.map((r) => {
            const [source, country, landing] = r.dims;
            const [sessions, forms, whatsapp] = r.metrics.map(Number);
            const contact =
              forms || whatsapp
                ? `CONTACTED (${[forms && `form x${forms}`, whatsapp && `WhatsApp x${whatsapp}`]
                    .filter(Boolean)
                    .join(', ')})`
                : 'no contact';
            return `- ${source} · ${country} · ${landing}: ${sessions} session${sessions === 1 ? '' : 's'} — ${contact}`;
          })
        : ['- no AI-assistant sessions in the last 28 days'],
  );

  const ftCounts = Object.fromEntries(
    (ga.consentCoverage.rows ?? []).map((r) => [r.dims[0], Number(r.metrics[0])]),
  );
  const consentNote =
    ftCounts.first_visit != null && ftCounts.first_touch != null
      ? `- Consent coverage (90d): ${ftCounts.first_touch ?? 0} first_touch events vs ${ftCounts.first_visit} first visits` +
        ` (${pct((ftCounts.first_touch ?? 0) / (ftCounts.first_visit || 1))}).`
      : '- Consent coverage unavailable.';
  md += section(
    'First-touch attribution (CONSENT-GATED — undercounts, not "no traffic")',
    [
      consentNote,
      '- first_touch only fires after analytics consent; use the AI-assistant and',
      '  channel sections above for real acquisition. Lead emails are unaffected —',
      '  the contact form posts attribution server-side.',
      '',
      ...(ga.firstTouch.error
        ? [`- not available: ${ga.firstTouch.error}`]
        : ga.firstTouch.rows.length
          ? ga.firstTouch.rows.map((r) => `- ${r.dims[0] || '(not set)'} / ${r.dims[1] || '(not set)'}: ${r.metrics[0]}`)
          : ['- no consented first_touch events in 90 days']),
    ],
  );
}

// Crawlers + Bing ———————————————————————————————————————————————————————

md += section(
  'AI crawler hits (Cloudflare, 7d)',
  cf.error
    ? [`- ERROR: ${cf.error}`]
    : [
        ...Object.entries(cf.perBot)
          .filter(([, c]) => c > 0)
          .sort((a, b) => b[1] - a[1])
          .map(([bot, c]) => `${pad(num(c), 7)}  ${bot}`),
        '',
        `${pad(num(cf.total), 7)}  TOTAL — ` +
          (priorCrawlers
            ? `${delta(cf.total, priorCrawlers.crawlerHits)} vs the ${priorCrawlers.date} run`
            : 'first recorded run, deltas start next week'),
      ],
);

md += section(
  'Bing',
  bing.error
    ? [`- ERROR: ${bing.error}`]
    : [
        `- Pages in index: ${bing.inIndex}`,
        `- Crawled/day (latest): ${bing.crawledPerDay}, errors: ${bing.crawlErrors}`,
        `- Impressions (7d): ${num(bing.impressions)} · ${delta(bing.impressions, bing.prevImpressions)}`,
        `- Clicks (7d): ${bing.clicks} · ${delta(bing.clicks, bing.prevClicks)}`,
      ],
);

// ── Persist ──

mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, `${today}.md`);
writeFileSync(outFile, md);

const measured = {
  date: today,
  ranAt: new Date().toISOString(),
  gscClicks: gsc.error ? null : (gsc.cur?.clicks ?? null),
  gscImpressions: gsc.error ? null : (gsc.cur?.impressions ?? null),
  gscPosition: gsc.error ? null : (gsc.cur?.position ?? null),
  ga4Sessions: gaTotalCur ? Number(gaTotalCur.metrics[0]) : null,
  conversions: convCur,
  crawlerHits: cf.error ? null : cf.total,
  indexed: coverage.skipped || coverage.error ? null : coverage.indexed,
  sitemapUrls: coverage.skipped || coverage.error ? null : coverage.total,
};
// Merge over any earlier run on the same day: a --fast re-run must not wipe the
// coverage numbers a full run already recorded.
const snapshot = {
  ...history.find((s) => s.date === today),
  ...Object.fromEntries(Object.entries(measured).filter(([, v]) => v !== null)),
};
writeFileSync(
  historyFile,
  JSON.stringify([...history.filter((s) => s.date !== today), snapshot].slice(-52), null, 2),
);

console.log(md);
console.error(`written: ${outFile}`);

// ── Optional email delivery (--email): Brevo transactional, creds from .env ──

if (flag('--email')) {
  const env = readFileSync(join(ROOT, '.env'), 'utf8');
  const envVar = (name) => env.match(new RegExp(`^${name}=(.*)$`, 'm'))?.[1]?.trim();
  const apiKey = envVar('BREVO_API_KEY');
  const sender = envVar('BREVO_SENDER_EMAIL');
  const receiver = envVar('BREVO_RECEIVER_EMAIL');
  if (!apiKey || !sender || !receiver) {
    console.error('email skipped: BREVO_* vars missing from .env');
  } else {
    const subject = [
      'GEO weekly',
      coverage.skipped || coverage.error ? null : `${coverage.indexed}/${coverage.total} indexed`,
      gsc.error || !gsc.cur ? null : `${gsc.cur.clicks} clicks`,
      convCur === null ? null : `${convCur} conv`,
      today,
    ]
      .filter(Boolean)
      .join(' · ');
    const html = `<div style="background:#111;color:#e0e0e0;padding:24px;border-top:3px solid #cc0000"><pre style="font-family:monospace;font-size:13px;line-height:1.6;white-space:pre-wrap">${md
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')}</pre></div>`;
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'api-key': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: { name: 'GEO Report', email: sender },
        to: [{ email: receiver }],
        subject,
        htmlContent: html,
      }),
    });
    console.error(`email: ${res.status === 201 ? 'sent to ' + receiver : 'failed HTTP ' + res.status}`);
  }
}
