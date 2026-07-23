import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudiesContent } from "@/components/pages/case-studies-content";
import { caseStudies, caseStudiesUi } from "@/lib/content/case-studies";
import { isLocale, localePath, languageAlternates, ogLocale, type Locale } from "@/lib/i18n";
import { ogDefaults } from '@/lib/og';

type PageProps = { params: Promise<{ locale: string }> };

const SITE = "https://buriedgames.com";
const PATH = "/case-studies";

const meta: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Case Studies — Games & Products We've Shipped",
    description:
      "Real projects, real outcomes: how Buried Games Studio designs, builds, and ships games and interactive products for Kuwait and the GCC — from KoutQ8's multiplayer card tables to full-cycle client work.",
  },
  ar: {
    title: "دراسات الحالة — ألعاب ومنتجات أطلقناها",
    description:
      "مشاريع حقيقية ونتائج حقيقية: كيف يصمم استوديو بريد جيمز ويبني ويطلق ألعابًا ومنتجات تفاعلية للكويت والخليج — من طاولات كوت كويت الجماعية إلى عمل متكامل للعملاء.",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";

  return {
    title: meta[locale].title,
    description: meta[locale].description,
    alternates: {
      canonical: localePath(locale, PATH),
      languages: languageAlternates(PATH),
    },
    openGraph: {
      ...ogDefaults,
      title: meta[locale].title,
      description: meta[locale].description,
      url: localePath(locale, PATH),
      locale: ogLocale[locale],
      type: "website",
    },
  };
}

function collectionSchema(locale: Locale) {
  const url = `${SITE}${localePath(locale, PATH)}`;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": meta[locale].title,
    "description": meta[locale].description,
    "url": url,
    "hasPart": caseStudies.map((cs) => ({
      "@type": "Article",
      "headline": cs.title[locale],
      "url": `${SITE}${localePath(locale, `${PATH}/${cs.slug}`)}`,
    })),
  };
}

function breadcrumbSchema(locale: Locale) {
  const ui = caseStudiesUi[locale];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": ui.breadcrumbHome, "item": `${SITE}${localePath(locale, "/")}` },
      { "@type": "ListItem", "position": 2, "name": ui.breadcrumbIndex, "item": `${SITE}${localePath(locale, PATH)}` },
    ],
  };
}

export default async function CaseStudiesPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema(raw)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(raw)) }} />
      <CaseStudiesContent locale={raw} />
    </>
  );
}
