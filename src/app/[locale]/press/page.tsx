import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PressContent } from "@/components/pages/press-content";
import { pressContent, gameFactSheets } from "@/lib/content/press";
import { legalEntity } from "@/lib/legal-entity";
import { isLocale, localePath, languageAlternates, ogLocale, type Locale } from "@/lib/i18n";
import { ogDefaults } from '@/lib/og';

const SITE = "https://buriedgames.com";
const PATH = "/press";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return {
    title: pressContent.metaTitle[locale],
    description: pressContent.metaDescription[locale],
    alternates: {
      canonical: localePath(locale, PATH),
      languages: languageAlternates(PATH),
    },
    openGraph: {
      ...ogDefaults,
      title: pressContent.metaTitle[locale],
      description: pressContent.metaDescription[locale],
      url: localePath(locale, PATH),
      locale: ogLocale[locale],
      type: "website",
    },
  };
}

export default async function PressPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const url = SITE + localePath(locale, PATH);

  // Organization schema scoped to the press kit: boilerplate + brand assets, no
  // PostalAddress (legal rule), areaServed for SEO. founder/foundingDate match the
  // site-wide Organization node in layout.tsx.
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Buried Games Studio",
    "alternateName": "استوديو بريد جيمز",
    ...(legalEntity.registered ? { "legalName": legalEntity.legalName } : {}),
    "description": pressContent.boilerplate.short[locale],
    "foundingDate": "2018-10-01",
    "founder": { "@type": "Person", "name": "Fahed Alahmad" },
    "email": pressContent.contact.email,
    "url": SITE,
    "logo": pressContent.logos.downloads[0].href,
    "areaServed": ["KW", "SA", "AE", "QA", "BH", "OM"],
    "sameAs": pressContent.socials.links.map((s) => s.href),
  };

  // CreativeWork list of the studio's games — entity context for the fact sheets.
  const gamesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": pressContent.gamesHeading[locale],
    "itemListElement": gameFactSheets.map((game, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "VideoGame",
        "name": game.name,
        "url": SITE + localePath(locale, game.href),
        "genre": game.genre.en.split(", "),
        "gamePlatform": game.platforms.en.split(", "),
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": locale === "ar" ? "الرئيسية" : "Home", "item": SITE + localePath(locale, "/") },
      { "@type": "ListItem", "position": 2, "name": pressContent.hero.eyebrow[locale], "item": url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gamesSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PressContent locale={locale} />
    </>
  );
}
