import { type MetadataRoute } from 'next';
import { gamesContent } from '@/lib/content/games';
import { devlogPosts } from '@/lib/content/devlog';
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
};

const staticRoutes: Route[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/games', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/services', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/contact-us', changeFrequency: 'yearly', priority: 0.8 },
  { path: '/about-us', changeFrequency: 'yearly', priority: 0.7 },
  { path: '/devlog', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/careers', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms-of-use', changeFrequency: 'yearly', priority: 0.3 },
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
}));

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [...staticRoutes, ...gameRoutes, ...devlogRoutes];

  // Emit one entry per locale for every route, each carrying the full hreflang
  // map (en / ar / x-default) so search engines can pair the localized URLs.
  return routes.flatMap(({ path, changeFrequency, priority }) =>
    locales.map((locale: Locale) => ({
      url: absolute(localePath(locale, path)),
      changeFrequency,
      priority,
      alternates: { languages: languageMap(path) },
    })),
  );
}
