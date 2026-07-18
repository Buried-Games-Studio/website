import { type MetadataRoute } from 'next';
import { gamesContent } from '@/lib/content/games';
import { devlogPosts } from '@/lib/content/devlog';
import { servicePages } from '@/lib/content/service-pages';
import { gccLandingSlugs } from '@/lib/content/gcc-landing';
import { caseStudies } from '@/lib/content/case-studies';
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

type Route = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
  lastModified?: string;
};

const staticRoutes: Route[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/games', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/services', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/how-it-works', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/releases', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/faq', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/press', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/contact-us', changeFrequency: 'yearly', priority: 0.8 },
  { path: '/about-us', changeFrequency: 'yearly', priority: 0.7 },
  { path: '/devlog', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/case-studies', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/careers', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms-of-use', changeFrequency: 'yearly', priority: 0.3 },
  // /imprint is advertised only once it carries real disclosure content (the
  // OÜ is registered); before that it is a noindex placeholder.
  ...(legalEntity.registered
    ? [{ path: '/imprint', changeFrequency: 'yearly', priority: 0.3 } as Route]
    : []),
];

const gameRoutes: Route[] = gamesContent.map((game) => ({
  path: `/games/${game.slug}`,
  changeFrequency: 'monthly',
  priority: 0.9,
}));

const devlogRoutes: Route[] = devlogPosts.map((post) => ({
  path: `/devlog/${post.slug}`,
  changeFrequency: 'monthly',
  priority: 0.6,
  lastModified: post.publishedAt,
}));

// Service child pages and GCC country landing pages are derived from their
// content modules so a new entry there is automatically advertised here.
const serviceRoutes: Route[] = servicePages.map((page) => ({
  path: `/services/${page.slug}`,
  changeFrequency: 'monthly',
  priority: 0.9,
}));

const gccLandingRoutes: Route[] = gccLandingSlugs.map((slug) => ({
  path: `/${slug}`,
  changeFrequency: 'monthly',
  priority: 0.8,
}));

const caseStudyRoutes: Route[] = caseStudies.map((cs) => ({
  path: `/case-studies/${cs.slug}`,
  changeFrequency: 'monthly',
  priority: 0.8,
  lastModified: cs.datePublished,
}));

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...staticRoutes,
    ...serviceRoutes,
    ...gccLandingRoutes,
    ...caseStudyRoutes,
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
      ...(lastModified ? { lastModified } : {}),
      alternates: { languages: languageMap(path) },
    })),
  );
}
