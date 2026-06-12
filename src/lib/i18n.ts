export const locales = ['en', 'ar'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Public URL for a route in a locale. English is served unprefixed at the
 * domain root (the proxy rewrites it to /en internally); Arabic lives under /ar.
 */
export function localePath(locale: Locale, path: string): string {
  const normalized = path === '/' ? '' : path;
  if (locale === 'en') return normalized || '/';
  return `/ar${normalized}`;
}

/**
 * Strip any locale prefix from a pathname, returning the locale-neutral route.
 * usePathname() reports the internal path, which carries /en for English pages
 * (the proxy rewrite) and /ar for Arabic ones — both must be removed before
 * rebuilding a URL for another locale.
 */
export function stripLocalePrefix(pathname: string): string {
  return pathname.replace(/^\/(en|ar)(?=\/|$)/, '') || '/';
}

/** hreflang map for Metadata.alternates.languages — en, ar, and x-default. */
export function languageAlternates(path: string): Record<string, string> {
  return {
    en: localePath('en', path),
    ar: localePath('ar', path),
    'x-default': localePath('en', path),
  };
}

export const ogLocale: Record<Locale, string> = {
  en: 'en_US',
  ar: 'ar_KW',
};

export function textDirection(locale: Locale): 'ltr' | 'rtl' {
  return locale === 'ar' ? 'rtl' : 'ltr';
}
