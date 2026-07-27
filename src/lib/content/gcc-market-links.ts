import type { GccLandingSlug } from "@/lib/content/gcc-landing";
import type { Locale } from "@/lib/i18n";

/**
 * Internal-link map for the GCC country landing pages.
 *
 * Deliberately separate from `gcc-landing.ts`: that module carries ~70KB of
 * page prose, and these anchors render in client components (homepage,
 * /services, game pages) where importing the full landing content would ship
 * every country's copy to the browser. The `GccLandingSlug` import above is
 * type-only, so it is erased at build time — we get the compile-time link
 * without the bundle.
 *
 * `labels` is keyed by the slug union, so TypeScript requires an entry for
 * every landing page that exists. Adding a market to `gcc-landing.ts` without
 * an anchor here fails the build — which is the point: these six pages went
 * uncrawled by Google precisely because nothing but the footer linked them, and
 * a silently missing anchor would recreate that.
 *
 * Anchor text mirrors each landing page's H1 so the link describes where it
 * goes. Positioning: these are service-area links — "how we work with clients
 * in <country>" — never a claim that the studio is established in any of them.
 *
 * Declaration order is display order (Kuwait first: the market our own titles
 * come from). Non-numeric object keys preserve insertion order per spec, so the
 * derived array below follows this block.
 */
const labels: Record<GccLandingSlug, Record<Locale, string>> = {
  "game-development-kuwait": {
    en: "Game development in Kuwait",
    ar: "تطوير الألعاب في الكويت",
  },
  "game-development-saudi-arabia": {
    en: "Game development in Saudi Arabia",
    ar: "تطوير الألعاب في السعودية",
  },
  "game-development-uae": {
    en: "Game development in the UAE",
    ar: "تطوير الألعاب في الإمارات",
  },
  "game-development-qatar": {
    en: "Game development in Qatar",
    ar: "تطوير الألعاب في قطر",
  },
  "game-development-bahrain": {
    en: "Game development in Bahrain",
    ar: "تطوير الألعاب في البحرين",
  },
  "game-development-oman": {
    en: "Game development in Oman",
    ar: "تطوير الألعاب في عُمان",
  },
};

export type GccMarketLink = {
  /** Locale-less route; callers wrap it in `localePath`. */
  href: `/${GccLandingSlug}`;
  label: Record<Locale, string>;
};

export const gccMarketLinks: GccMarketLink[] = (
  Object.keys(labels) as GccLandingSlug[]
).map((slug) => ({ href: `/${slug}`, label: labels[slug] }));

/** The Kuwait entry, reused as the single geo link in the game-page link strip. */
export const kuwaitMarketLink: GccMarketLink = {
  href: "/game-development-kuwait",
  label: labels["game-development-kuwait"],
};
