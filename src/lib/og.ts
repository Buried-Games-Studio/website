import { assetUrl } from './assets';

/**
 * Shared 1200×630 Open Graph card (WhatsApp/Twitter/LinkedIn link previews).
 *
 * Next.js merges metadata shallowly: a page-level `openGraph` object replaces
 * the layout's wholesale, so every page must spread `ogDefaults` into its own
 * `openGraph` — otherwise it ships no og:image at all. Pages with a real
 * per-page image (games, devlogs, design works) keep their own `images`.
 */
export const ogCard = {
  url: assetUrl('images/og/og-card.png'),
  width: 1200,
  height: 630,
  alt: 'Buried Games Studio — game development for Kuwait & the GCC',
};

export const ogDefaults = {
  siteName: 'Buried Games Studio',
  images: [ogCard],
};
