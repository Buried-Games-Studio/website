import { Metadata } from "next";
import { notFound } from "next/navigation";
import { gamesContent } from "@/lib/content/games";
import { GameDetailContent } from "@/components/pages/game-detail-content";
import { isLocale, localePath, languageAlternates, ogLocale, type Locale } from "@/lib/i18n";

const SITE = "https://buriedgames.com";

export function generateStaticParams() {
  return gamesContent.map((game) => ({
    slug: game.slug,
  }));
}

// Localized SEO titles targeting real GCC search phrases. Keys match
// gamesContent slugs; the layout template appends the localized brand suffix.
const seoTitles: Record<Locale, Record<string, string>> = {
  en: {
    'nabsh': 'Nabsh — Online Trivia Game | Play Free',
    'power-of-bombs': 'Power of Bombs — Multiplayer Arcade Game of Bombs',
    'koutq8': 'KoutQ8 — Kout Game for Kuwait | Card Game App',
    'arrab': 'Arrab — Online Mafia Social Deduction Game',
    'luna-fantasy': 'Luna Fantasy — Web RPG Adventure Game',
    'gathered-by-the-light': 'Gathered by the Light — Pixel Art Adventure Game',
  },
  ar: {
    'nabsh': 'نبش — لعبة تريفيا جماعية أونلاين | العب مجانًا',
    'power-of-bombs': 'باور أوف بومبز — لعبة أكشن وقنابل جماعية',
    'koutq8': 'كوت — لعبة الكوت الكويتية أونلاين | تطبيق ورق',
    'arrab': 'العرّاب — لعبة مافيا أونلاين بالعربي',
    'luna-fantasy': 'لونا فانتازيا — لعبة آر بي جي مغامرات على الويب',
    'gathered-by-the-light': 'مجتمعون بالنور — لعبة مغامرات بكسل آرت',
  },
};

// Latin-script names kept as alternateName on Arabic pages so search engines
// connect the Arabic page to the brand/product the studio ships under.
const arabicAltNames: Record<string, string> = {
  'nabsh': 'Nabsh',
  'power-of-bombs': 'Power of Bombs',
  'koutq8': 'KoutQ8',
  'arrab': 'Arrab',
  'luna-fantasy': 'Luna Fantasy',
  'gathered-by-the-light': 'Gathered by the Light',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const game = gamesContent.find((g) => g.slug === slug);

  if (!game) {
    return {
      title: 'Game Not Found',
    };
  }

  const path = `/games/${game.slug}`;
  const title = seoTitles[locale][game.slug] || game.title;
  const description = game.description[locale];

  return {
    title,
    description,
    alternates: {
      canonical: localePath(locale, path),
      languages: languageAlternates(path),
    },
    openGraph: {
      title,
      description,
      url: localePath(locale, path),
      locale: ogLocale[locale],
      images: game.logoUrl ? [{ url: game.logoUrl, alt: game.title }] : undefined,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: game.logoUrl ? [game.logoUrl] : undefined,
    },
  };
}

export default async function GameDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const game = gamesContent.find((g) => g.slug === slug);

  if (!game) {
    notFound();
  }

  const path = `/games/${game.slug}`;
  const url = SITE + localePath(locale, path);

  // Accurate structured facts live alongside the game content (see games.ts
  // seoMeta). Genre/platforms/datePublished are grounded per game; datePublished
  // is only present where a real launch date was confirmed from a live source.
  const meta = game.seoMeta;
  const publisher = {
    "@type": "Organization",
    "name": "Buried Games Studio",
    "url": SITE + localePath(locale, '/'),
  };

  const videoGameSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": locale === 'ar' ? (seoTitles.ar[game.slug] || game.title) : game.title,
    "description": game.description[locale],
    "image": game.logoUrl,
    "url": url,
    "inLanguage": ["en", "ar"],
    "genre": meta?.genre,
    "gamePlatform": meta?.platforms ?? ['Web Browser'],
    "applicationCategory": "Game",
    "operatingSystem": "Any",
    "author": publisher,
    "publisher": publisher,
  };

  if (meta && 'datePublished' in meta && meta.datePublished) {
    videoGameSchema.datePublished = meta.datePublished;
  }

  if (locale === 'ar' && arabicAltNames[game.slug]) {
    videoGameSchema.alternateName = arabicAltNames[game.slug];
  }

  // Offers derived from the game's store links (web visit / app store, etc.).
  const offers = (game.storeLinks ?? []).map((link) => ({
    "@type": "Offer",
    "url": link.url,
    "category": link.store,
  }));
  if (offers.length > 0) {
    videoGameSchema.offers = offers;
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": locale === 'ar' ? "الرئيسية" : "Home",
        "item": SITE + localePath(locale, '/'),
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": locale === 'ar' ? "الألعاب" : "Games",
        "item": SITE + localePath(locale, '/games'),
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": locale === 'ar' ? (seoTitles.ar[game.slug] || game.title) : game.title,
        "item": url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <GameDetailContent slug={slug} locale={locale} />
    </>
  );
}
