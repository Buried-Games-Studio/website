import { type Locale } from '@/lib/i18n';

/**
 * Single source of truth for Buried Games' LEGAL identity.
 *
 * The studio *operates for* Kuwait & the GCC — that is the market / SEO layer
 * (areaServed, hreflang, page copy, "rooted in the Gulf"). This module is the
 * other, independent layer: the legal entity that *runs* the site. Nothing here
 * touches areaServed, targeting, or any GCC framing, and it must stay that way
 * (see the "Legal positioning rule" in CLAUDE.md — Estonia is the HQ, the GCC is
 * the market, and the two never bleed into each other).
 *
 * ─────────────────────────────────────────────────────────────────────────────
 *  INCORPORATION SWITCH
 *  The Estonian company (Buried Games OÜ) is being established via e-Residency.
 *  Until it is on the Estonian e-Business Register, `registered` is false and
 *  NOTHING asserts the entity publicly: no legalName in schema, no footer legal
 *  line, and the Imprint page shows a neutral "registration in progress" notice
 *  (Estonia is not even named). The instant the OÜ is incorporated, fill the
 *  three values in the INCORPORATION block below (env var or edit the fallback)
 *  and every surface lights up correctly — no other file needs to change.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Everything here is PUBLIC information by law (an EU company must publish its
 * legal name, registry code and registered address), so these live as plain
 * constants / NEXT_PUBLIC_ env — never as secrets in TOKENS.md or .env.
 */

export type RegisteredAddress = {
  street: string;
  city: string;
  postalCode: string;
  country: string; // English name, e.g. "Estonia"
  countryCode: string; // ISO 3166-1 alpha-2, e.g. "EE"
};

type Localized = Record<Locale, string>;

// ── INCORPORATION block — fill on the day the OÜ hits the register ────────────
//    registryCode / vatId accept a NEXT_PUBLIC_ env override (handy for App
//    Hosting) and otherwise read the literal fallback. Set the address literal
//    once known (it will be your service provider's / legal-address provider's).

/** Estonian registry code (registrikood), 8 digits. `null` ⇒ not yet registered. */
const registryCode: string | null =
  process.env.NEXT_PUBLIC_BG_REGISTRY_CODE || null;

/** EE VAT number — only once turnover crosses the ~€40k threshold or you register
 *  voluntarily. `null` ⇒ not VAT-registered (invoices carry no VAT line). */
const vatId: string | null = process.env.NEXT_PUBLIC_BG_VAT_ID || null;

/** Registered office address in Estonia. `null` until incorporation. */
const registeredAddress: RegisteredAddress | null = null;
// Example once known:
// const registeredAddress: RegisteredAddress = {
//   street: 'Sepapaja tn 6', city: 'Tallinn',
//   postalCode: '15551', country: 'Estonia', countryCode: 'EE',
// };
// ─────────────────────────────────────────────────────────────────────────────

export const legalEntity = {
  /**
   * True once the OÜ is on the Estonian e-Business Register. Derived from the
   * presence of a registry code so a single value flips every public assertion.
   */
  registered: Boolean(registryCode),

  /** Intended registered legal name. NOT asserted publicly until `registered`. */
  legalName: 'Buried Games OÜ',
  /** Public / trade name — unchanged, used across all marketing surfaces. */
  tradeName: 'Buried Games Studio',
  tradeNameAr: 'استوديو بريد جيمز',

  entityType: {
    en: 'a private limited company (osaühing) incorporated in Estonia',
    ar: 'شركة ذات مسؤولية محدودة (osaühing) مسجّلة في إستونيا',
  } as Localized,

  jurisdiction: { en: 'Estonia', ar: 'إستونيا' } as Localized,

  registryCode, // string | null
  vatId, // string | null
  registeredAddress, // RegisteredAddress | null

  /** The person behind the studio — already public on About / Press. */
  founder: 'Fahed Alahmad',
  foundingDate: '2018-10-01',

  /** Primary contact for legal, privacy and general inquiries. */
  email: 'support@buriedgames.com',

  /** GDPR lead supervisory authority (Estonia). Verified: aki.ee. */
  supervisoryAuthority: {
    name: {
      en: 'the Estonian Data Protection Inspectorate (Andmekaitse Inspektsioon)',
      ar: 'هيئة حماية البيانات الإستونية (Andmekaitse Inspektsioon)',
    } as Localized,
    website: 'https://www.aki.ee/en',
    email: 'info@aki.ee',
    address: '39 Tatari St., 10134 Tallinn, Estonia',
    phone: '+372 627 4135',
  },

  /** Governing law for the website Terms of Use. */
  governingLaw: {
    en: 'the laws of the Republic of Estonia',
    ar: 'قوانين جمهورية إستونيا',
  } as Localized,
};

/**
 * One-line, single-string registered address for schema / imprint rendering.
 * Returns null until the address is known.
 */
export function formatAddress(addr: RegisteredAddress | null): string | null {
  if (!addr) return null;
  return `${addr.street}, ${addr.postalCode} ${addr.city}, ${addr.country}`;
}

/**
 * The name of the party responsible for the site in legal copy. Before the OÜ is
 * registered the responsible party is the studio operated by its founder; after
 * registration it is the OÜ. This keeps the Privacy Policy / Terms accurate in
 * both states without asserting an entity that does not yet exist.
 */
export function controllerName(locale: Locale): string {
  if (legalEntity.registered) return legalEntity.legalName;
  return locale === 'ar'
    ? 'استوديو بريد جيمز (يُدار من قِبل مؤسسه فهد الأحمد)'
    : 'Buried Games Studio (operated by its founder, Fahed Alahmad)';
}
