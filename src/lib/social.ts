import { WHATSAPP_URL } from './whatsapp';

/**
 * Single source of truth for the studio's social profiles — feeds both the
 * footer/contact icons (social-links.tsx) and Organization.sameAs
 * (layout.tsx), so the two can never drift apart again.
 *
 * Every entry is studio-owned. `footer: false` marks profiles advertised in
 * schema only (no footer icon) — e.g. directory/identity pages.
 */
export interface SocialProfile {
  /** Platform name — also the icon key in social-links.tsx. */
  label: string;
  /** Canonical profile URL (what Organization.sameAs advertises). */
  url: string;
  /** UI link when it differs from the canonical URL (e.g. ?sub_confirmation). */
  footerHref?: string;
  /** false → schema-only: appears in sameAs but gets no footer icon. */
  footer?: boolean;
}

export const socialProfiles: SocialProfile[] = [
  {
    label: 'YouTube',
    // The studio channel. A second legacy channel exists at @buriedgames —
    // never advertise it: one canonical channel per platform.
    url: 'https://www.youtube.com/@BuriedGamesStudio',
    footerHref: 'https://www.youtube.com/@BuriedGamesStudio?sub_confirmation=1',
  },
  { label: 'Instagram', url: 'https://www.instagram.com/buriedgames' },
  { label: 'TikTok', url: 'https://www.tiktok.com/@buriedgames' },
  { label: 'Facebook', url: 'https://www.facebook.com/@BuriedGamesStudio' },
  { label: 'WhatsApp', url: WHATSAPP_URL },
  { label: 'Discord', url: 'https://discord.com/invite/v9FWtuyKQn' },
  { label: 'Twitch', url: 'https://www.twitch.tv/buriedgamesofficial' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/company/buriedgames' },
  { label: 'GitHub', url: 'https://github.com/Buried-Games-Studio' },
  // Schema-only profiles (owner-confirmed; no footer icon).
  { label: 'X', url: 'https://twitter.com/buriedgames', footer: false },
  {
    label: 'Crunchbase',
    url: 'https://www.crunchbase.com/organization/buried-games-studio',
    footer: false,
  },
  {
    label: 'Product Hunt',
    url: 'https://www.producthunt.com/products/buried-games-studio',
    footer: false,
  },
];

/** Organization.sameAs — every live profile, canonical URLs only. */
export const sameAs = socialProfiles.map((p) => p.url);
