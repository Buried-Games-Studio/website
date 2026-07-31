import { type MetadataRoute } from 'next';
import { gamesContent } from '@/lib/content/games';
import { devlogPosts } from '@/lib/content/devlog';
import { servicePages } from '@/lib/content/service-pages';
import { gccLandings, gccLandingSlugs } from '@/lib/content/gcc-landing';
import { caseStudies } from '@/lib/content/case-studies';
import { DESIGN_WORKS_PATH, designWorks, hasDesignWorks } from '@/lib/content/design-works';
import { legalEntity } from '@/lib/legal-entity';
import { locales, localePath, languageAlternates, type Locale } from '@/lib/i18n';

const baseUrl = 'https://buriedgames.com';

/**
 * Turn a locale-aware public path into an absolute URL. `localePath('en', '/')`
 * returns '/', which would yield a trailing-slash root — strip it so the root
 * matches the site's canonical (no trailing slash) form.
 */
function absolute(path: string): string {
  return path === '/' ? baseUrl : `${baseUrl}${path}`;
}

function languageMap(path: string): Record<string, string> {
  const alternates = languageAlternates(path);
  return Object.fromEntries(
    Object.entries(alternates).map(([key, value]) => [key, absolute(value)]),
  );
}

/**
 * ─────────────────────────── <lastmod> convention ───────────────────────────
 *
 * EVERY route carries a lastModified, and every one of them is a hand-written
 * ISO date (YYYY-MM-DD). This is deliberate and load-bearing:
 *
 *  • NEVER use `new Date()`, file mtimes, or anything else derived from build
 *    time anywhere in this file. A sitemap where all 96 URLs change on every
 *    deploy is noise, and search engines learn to discount the signal — which
 *    costs us the one crawl-scheduling lever we actually control. (Google has
 *    crawled well under half of these URLs; lastmod is how we fix that.)
 *
 *  • A date means: "the last time this URL's content materially changed" —
 *    visible copy, title/description, or structured data. Per Google, minor and
 *    site-wide edits (an OG image default, a tracking param on a CTA, shared
 *    chrome, perf work) do NOT count and must not move the date.
 *
 *  • WHEN YOU EDIT A PAGE, BUMP ITS DATE BY HAND. For the static routes below
 *    that means editing the literal here. For content-module routes (services,
 *    GCC landings, games, devlog, case studies, design works) it means the
 *    `updatedAt` field on the entry you just edited — it lives next to `slug`
 *    in every module for exactly that reason.
 *
 *  • Index routes fold in their children via `latestOf` (see below), so adding
 *    a devlog post or a design work can never leave the index claiming a stale
 *    date. The inputs are still hand-maintained content dates, never build time.
 *
 * The dates seeded here were sourced from git — `git log -1 --format=%cs` on
 * the page/content files backing each route, and `git log -1 -L <lines>:<file>`
 * for per-entry dates inside the content modules — then filtered by the
 * "material change" rule above.
 */

type Route = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
  /** ISO date (YYYY-MM-DD). Required — see the convention note above. */
  lastModified: string;
};

/** Most recent of a set of hand-maintained ISO dates (lexical sort is safe). */
function latestOf(...dates: string[]): string {
  return dates.reduce((a, b) => (b > a ? b : a));
}

// changeFrequency/priority are ignored by Google but Bing still treats them as
// hints, and Bing currently indexes ~3x more of this site — so they stay.
const staticRoutes: Route[] = [
  // Homepage: the design-works band added a new section (14d48fd).
  { path: '/', changeFrequency: 'weekly', priority: 1, lastModified: '2026-07-18' },
  // Index of gamesContent — folds in the per-game updatedAt dates.
  {
    path: '/games',
    changeFrequency: 'monthly',
    priority: 0.8,
    lastModified: latestOf('2026-06-13', ...gamesContent.map((g) => g.updatedAt)),
  },
  // Hub copy lives in content/services.ts, NOT service-pages.ts — the child
  // pages' own dates are deliberately not folded in here.
  { path: '/services', changeFrequency: 'monthly', priority: 0.8, lastModified: '2026-06-13' },
  { path: '/how-it-works', changeFrequency: 'monthly', priority: 0.7, lastModified: '2026-07-23' },
  { path: '/releases', changeFrequency: 'weekly', priority: 0.7, lastModified: '2026-07-23' },
  { path: '/faq', changeFrequency: 'monthly', priority: 0.6, lastModified: '2026-07-23' },
  { path: '/press', changeFrequency: 'monthly', priority: 0.5, lastModified: '2026-07-23' },
  // Gained the "How did you hear about us?" field (dbdd15d).
  { path: '/contact-us', changeFrequency: 'yearly', priority: 0.8, lastModified: '2026-07-23' },
  // Team cards + Person JSON-LD move with content/team.ts.
  { path: '/about-us', changeFrequency: 'yearly', priority: 0.7, lastModified: '2026-07-23' },
  {
    path: '/devlog',
    changeFrequency: 'weekly',
    priority: 0.8,
    lastModified: latestOf('2026-06-13', ...devlogPosts.map((p) => p.updatedAt)),
  },
  {
    path: '/case-studies',
    changeFrequency: 'monthly',
    priority: 0.8,
    lastModified: latestOf('2026-07-23', ...caseStudies.map((cs) => cs.updatedAt)),
  },
  { path: '/careers', changeFrequency: 'monthly', priority: 0.7, lastModified: '2026-06-13' },
  // Both legal pages were rewritten for the Estonia layer (fe53de2), then
  // rewritten again on incorporation (31.07.2026) — they now name the OÜ, the
  // supervisory authority and the governing law instead of staying neutral.
  { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.3, lastModified: '2026-07-31' },
  { path: '/terms-of-use', changeFrequency: 'yearly', priority: 0.3, lastModified: '2026-07-31' },
  // /imprint is advertised only once it carries real disclosure content (the
  // OÜ is registered); before that it is a noindex placeholder. That flipped on
  // 31.07.2026 when Buried Games OÜ was entered into the register, so this is
  // now live and its lastmod is the incorporation date.
  ...(legalEntity.registered
    ? [
        {
          path: '/imprint',
          changeFrequency: 'yearly',
          priority: 0.3,
          lastModified: '2026-07-31',
        } as Route,
      ]
    : []),
];

const gameRoutes: Route[] = gamesContent.map((game) => ({
  path: `/games/${game.slug}`,
  changeFrequency: 'monthly',
  priority: 0.9,
  lastModified: game.updatedAt,
}));

// NB: lastModified is updatedAt, not publishedAt — publishedAt is the source
// video's 2024 YouTube upload date, not when this article was last edited.
const devlogRoutes: Route[] = devlogPosts.map((post) => ({
  path: `/devlog/${post.slug}`,
  changeFrequency: 'monthly',
  priority: 0.6,
  lastModified: post.updatedAt,
}));

// Service child pages and GCC country landing pages are derived from their
// content modules so a new entry there is automatically advertised here.
const serviceRoutes: Route[] = servicePages.map((page) => ({
  path: `/services/${page.slug}`,
  changeFrequency: 'monthly',
  priority: 0.9,
  lastModified: page.updatedAt,
}));

const gccLandingRoutes: Route[] = gccLandingSlugs.map((slug) => ({
  path: `/${slug}`,
  changeFrequency: 'monthly',
  priority: 0.8,
  lastModified: gccLandings[slug].updatedAt,
}));

// Likewise updatedAt, not datePublished — datePublished is the project's own
// release date, which long predates the write-up.
const caseStudyRoutes: Route[] = caseStudies.map((cs) => ({
  path: `/case-studies/${cs.slug}`,
  changeFrequency: 'monthly',
  priority: 0.8,
  lastModified: cs.updatedAt,
}));

// The design-works showcase (hub + pieces) is advertised only once the first
// real works are published — while the module is empty the routes 404.
const designWorkRoutes: Route[] = hasDesignWorks()
  ? [
      {
        path: DESIGN_WORKS_PATH,
        changeFrequency: 'monthly',
        priority: 0.7,
        lastModified: latestOf('2026-07-18', ...designWorks.map((w) => w.updatedAt)),
      },
      ...designWorks.map(
        (work): Route => ({
          path: `${DESIGN_WORKS_PATH}/${work.slug}`,
          changeFrequency: 'monthly',
          priority: 0.8,
          lastModified: work.updatedAt,
        }),
      ),
    ]
  : [];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...staticRoutes,
    ...serviceRoutes,
    ...gccLandingRoutes,
    ...caseStudyRoutes,
    ...designWorkRoutes,
    ...gameRoutes,
    ...devlogRoutes,
  ];

  // Emit one entry per locale for every route, each carrying the full hreflang
  // map (en / ar / x-default) so search engines can pair the localized URLs.
  return routes.flatMap(({ path, changeFrequency, priority, lastModified }) =>
    locales.map((locale: Locale) => ({
      url: absolute(localePath(locale, path)),
      changeFrequency,
      priority,
      lastModified,
      alternates: { languages: languageMap(path) },
    })),
  );
}
