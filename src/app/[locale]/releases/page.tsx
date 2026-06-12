import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReleasesContent } from "@/components/pages/releases-content";
import { releasesContent, releaseTimeline } from "@/lib/content/releases";
import { isLocale, localePath, languageAlternates, ogLocale, type Locale } from "@/lib/i18n";

const SITE = "https://buriedgames.com";
const PATH = "/releases";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return {
    title: releasesContent.metaTitle[locale],
    description: releasesContent.metaDescription[locale],
    alternates: {
      canonical: localePath(locale, PATH),
      languages: languageAlternates(PATH),
    },
    openGraph: {
      title: releasesContent.metaTitle[locale],
      description: releasesContent.metaDescription[locale],
      url: localePath(locale, PATH),
      locale: ogLocale[locale],
      type: "website",
    },
  };
}

export default async function ReleasesPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const url = SITE + localePath(locale, PATH);

  // ItemList JSON-LD for the timeline, per locale. Entries that link to an internal
  // page carry that URL; date is included only where verifiable.
  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": releasesContent.hero.title[locale],
    "description": releasesContent.metaDescription[locale],
    "itemListOrder": "https://schema.org/ItemListOrderDescending",
    "itemListElement": releaseTimeline.map((entry, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": entry.title[locale],
      ...(entry.link ? { "url": SITE + localePath(locale, entry.link.href) } : {}),
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": locale === "ar" ? "الرئيسية" : "Home", "item": SITE + localePath(locale, "/") },
      { "@type": "ListItem", "position": 2, "name": releasesContent.hero.eyebrow[locale], "item": url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ReleasesContent locale={locale} />
    </>
  );
}
