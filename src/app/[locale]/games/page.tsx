import { Metadata } from "next";
import { notFound } from "next/navigation";
import { GamesListingContent } from "@/components/pages/games-listing-content";
import { gamesContent } from "@/lib/content/games";
import { isLocale, localePath, languageAlternates, ogLocale, type Locale } from "@/lib/i18n";

type PageProps = { params: Promise<{ locale: string }> };

const PATH = '/games';

const title: Record<Locale, string> = {
  en: 'Our Games — Multiplayer, Trivia & Card Games',
  ar: 'ألعابنا — ألعاب جماعية وتريفيا وورق',
};

const description: Record<Locale, string> = {
  en: 'Explore games by Buried Games Studio: Nabsh trivia, Power of Bombs arcade, KoutQ8 cards, Arrab social deduction, and more. Indie game development from Kuwait.',
  ar: 'استكشف ألعاب استوديو بريد جيمز: نبش للمعلومات العامة، باور أوف بومبز، كوت الكويت للورق، العرّاب للخداع الاجتماعي والمزيد. تطوير ألعاب مستقل من الكويت.',
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';

  return {
    title: title[locale],
    description: description[locale],
    alternates: {
      canonical: localePath(locale, PATH),
      languages: languageAlternates(PATH),
    },
    openGraph: {
      title: title[locale],
      description: description[locale],
      url: localePath(locale, PATH),
      locale: ogLocale[locale],
      type: 'website',
    },
  };
}

const ORIGIN = 'https://buriedgames.com';

// ItemList JSON-LD mirrors the visible games grid so search engines see the
// same localized catalogue (names, descriptions, and per-locale game URLs).
function itemListSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": title[locale],
    "itemListElement": gamesContent.map((game, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": ORIGIN + localePath(locale, `/games/${game.slug}`),
      "name": game.title,
      "description": game.description[locale],
    })),
  };
}

export default async function GamesPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema(raw)) }}
      />
      <GamesListingContent locale={raw} />
    </>
  );
}
