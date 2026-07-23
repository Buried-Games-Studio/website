#!/usr/bin/env node
/**
 * Weekly GEO/SEO report: AI-crawler activity (Cloudflare), AI-assistant
 * sessions + lead attribution (GA4), and Bing index/traffic stats — one
 * markdown file per run under reports/geo-weekly/ (gitignored).
 *
 * No dependencies. Secrets are read at runtime from TOKENS.md and
 * ga4-service-account.json at the repo root (both gitignored).
 *
 * Run: node scripts/geo-report.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createSign } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ZONE = 'd1c5abd26d6abdc3b7a94d4675112ac4';
const GA4_PROPERTY = 'properties/506151257';
const SITE = 'https://buriedgames.com';

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

// ── Cloudflare: AI crawler hits, one 1-day query per day (free-plan limit) ──

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
  return perBot;
}

// ── GA4 Data API (service-account JWT, no deps) ──

const b64url = (buf) =>
  Buffer.from(buf).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

async function gaToken(scope = 'https://www.googleapis.com/auth/analytics.readonly') {
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
  return (await res.json()).access_token;
}

async function gaReport(token, body) {
  const res = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/${GA4_PROPERTY}:runReport`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    },
  );
  return res.json();
}

const rows = (r) =>
  (r.rows ?? []).map((row) => ({
    dims: row.dimensionValues.map((d) => d.value),
    metrics: row.metricValues.map((m) => m.value),
  }));

async function ga4Stats() {
  const token = await gaToken();
  const week = { dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }] };

  const aiSessions = await gaReport(token, {
    ...week,
    dimensions: [{ name: 'sessionSource' }],
    metrics: [{ name: 'sessions' }, { name: 'totalUsers' }],
    dimensionFilter: {
      filter: {
        fieldName: 'sessionSource',
        stringFilter: { matchType: 'PARTIAL_REGEXP', value: AI_SOURCE_REGEX, caseSensitive: false },
      },
    },
  });

  const channels = await gaReport(token, {
    ...week,
    dimensions: [{ name: 'sessionDefaultChannelGroup' }],
    metrics: [{ name: 'sessions' }],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    limit: 10,
  });

  const leads = await gaReport(token, {
    ...week,
    dimensions: [{ name: 'eventName' }, { name: 'customEvent:first_touch_source' }],
    metrics: [{ name: 'eventCount' }],
    dimensionFilter: {
      filter: { fieldName: 'eventName', stringFilter: { matchType: 'EXACT', value: 'contact_form_submitted' } },
    },
  });

  const firstTouch = await gaReport(token, {
    ...week,
    dimensions: [{ name: 'customEvent:first_touch_channel' }],
    metrics: [{ name: 'eventCount' }],
    dimensionFilter: {
      filter: { fieldName: 'eventName', stringFilter: { matchType: 'EXACT', value: 'first_touch' } },
    },
  });

  return {
    aiSessions: rows(aiSessions),
    channels: rows(channels),
    leads: rows(leads),
    firstTouch: rows(firstTouch),
  };
}

// ── Google Search Console (same service account; needs it added as a user on
// the buriedgames.com property in GSC Settings → Users — reported as
// unavailable until then) ──

async function gscStats() {
  const token = await gaToken('https://www.googleapis.com/auth/webmasters.readonly');
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  const sites = await (await fetch('https://www.googleapis.com/webmasters/v3/sites', { headers })).json();
  const entry = (sites.siteEntry ?? []).find((s) => s.siteUrl.includes('buriedgames.com'));
  if (!entry) throw new Error('service account has no access to the GSC property yet');
  const query = async (body) =>
    (
      await fetch(
        `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(entry.siteUrl)}/searchAnalytics/query`,
        { method: 'POST', headers, body: JSON.stringify(body) },
      )
    ).json();
  const end = new Date().toISOString().slice(0, 10);
  const start = new Date(Date.now() - 7 * 86400e3).toISOString().slice(0, 10);
  const totals = await query({ startDate: start, endDate: end, dimensions: [] });
  const queries = await query({ startDate: start, endDate: end, dimensions: ['query'], rowLimit: 10 });
  return { totals: totals.rows?.[0], queries: queries.rows ?? [] };
}

// ── Bing Webmaster ──

async function bingStats() {
  const get = async (method) => {
    const res = await fetch(
      `https://ssl.bing.com/webmaster/api.svc/json/${method}?apikey=${BING_KEY}&siteUrl=${encodeURIComponent(SITE)}`,
    );
    return (await res.json()).d;
  };
  const crawl = await get('GetCrawlStats');
  const traffic = await get('GetRankAndTrafficStats');
  const latest = crawl[crawl.length - 1] ?? {};
  const week = traffic.slice(-7);
  return {
    inIndex: latest.InIndex,
    crawledPerDay: latest.CrawledPages,
    crawlErrors: latest.CrawlErrors,
    impressions7d: week.reduce((s, d) => s + d.Impressions, 0),
    clicks7d: week.reduce((s, d) => s + d.Clicks, 0),
  };
}

// ── Report ──

const section = (title, lines) => `## ${title}\n\n${lines.join('\n')}\n\n`;

const [cf, ga, gsc, bing] = await Promise.all([
  cloudflareCrawlers().catch((e) => ({ error: e.message })),
  ga4Stats().catch((e) => ({ error: e.message })),
  gscStats().catch((e) => ({ error: e.message })),
  bingStats().catch((e) => ({ error: e.message })),
]);

const today = new Date().toISOString().slice(0, 10);
let md = `# GEO weekly report — ${today}\n\nSite: ${SITE} · window: last 7 days\n\n`;

md += section(
  'AI crawler hits (Cloudflare)',
  cf.error
    ? [`ERROR: ${cf.error}`]
    : Object.entries(cf)
        .filter(([, c]) => c > 0)
        .sort((a, b) => b[1] - a[1])
        .map(([bot, c]) => `- ${bot}: ${c}`),
);

md += section(
  'AI-assistant sessions (GA4)',
  ga.error
    ? [`ERROR: ${ga.error}`]
    : ga.aiSessions.length
      ? ga.aiSessions.map((r) => `- ${r.dims[0]}: ${r.metrics[0]} sessions, ${r.metrics[1]} users`)
      : ['- none this week'],
);

if (!ga.error) {
  md += section(
    'Sessions by channel (GA4 default)',
    ga.channels.map((r) => `- ${r.dims[0]}: ${r.metrics[0]}`),
  );
  md += section(
    'Leads (contact_form_submitted) by first-touch source',
    ga.leads.length
      ? ga.leads.map((r) => `- ${r.dims[1] || '(not set)'}: ${r.metrics[0]}`)
      : ['- none this week'],
  );
  md += section(
    'New visitors by first-touch channel',
    ga.firstTouch.length
      ? ga.firstTouch.map((r) => `- ${r.dims[0] || '(not set)'}: ${r.metrics[0]}`)
      : ['- none yet (populates after the attribution deploy)'],
  );
}

md += section(
  'Google Search Console',
  gsc.error
    ? [`- not available: ${gsc.error}`]
    : [
        gsc.totals
          ? `- Clicks (7d): ${gsc.totals.clicks}, impressions: ${gsc.totals.impressions}, avg position: ${gsc.totals.position.toFixed(1)}`
          : '- no search traffic recorded this week',
        ...gsc.queries.map(
          (r) => `- "${r.keys[0]}": ${r.clicks} clicks / ${r.impressions} impressions`,
        ),
      ],
);

md += section(
  'Bing',
  bing.error
    ? [`ERROR: ${bing.error}`]
    : [
        `- Pages in index: ${bing.inIndex}`,
        `- Crawled/day (latest): ${bing.crawledPerDay}, errors: ${bing.crawlErrors}`,
        `- Impressions (7d): ${bing.impressions7d}, clicks: ${bing.clicks7d}`,
      ],
);

const outDir = join(ROOT, 'reports', 'geo-weekly');
mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, `${today}.md`);
writeFileSync(outFile, md);
console.log(md);
console.error(`written: ${outFile}`);

// ── Optional email delivery (--email): Brevo transactional, creds from .env ──

if (process.argv.includes('--email')) {
  const env = readFileSync(join(ROOT, '.env'), 'utf8');
  const envVar = (name) => env.match(new RegExp(`^${name}=(.*)$`, 'm'))?.[1]?.trim();
  const apiKey = envVar('BREVO_API_KEY');
  const sender = envVar('BREVO_SENDER_EMAIL');
  const receiver = envVar('BREVO_RECEIVER_EMAIL');
  if (!apiKey || !sender || !receiver) {
    console.error('email skipped: BREVO_* vars missing from .env');
  } else {
    const html = `<div style="background:#111;color:#e0e0e0;padding:24px;border-top:3px solid #cc0000"><pre style="font-family:monospace;font-size:13px;line-height:1.6;white-space:pre-wrap">${md
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')}</pre></div>`;
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'api-key': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: { name: 'GEO Report', email: sender },
        to: [{ email: receiver }],
        subject: `GEO weekly report — ${today}`,
        htmlContent: html,
      }),
    });
    console.error(`email: ${res.status === 201 ? 'sent to ' + receiver : 'failed HTTP ' + res.status}`);
  }
}
