import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyDetailContent } from "@/components/pages/case-study-detail-content";
import { caseStudies, caseStudiesUi, getCaseStudy } from "@/lib/content/case-studies";
import { isLocale, localePath, languageAlternates, ogLocale, type Locale } from "@/lib/i18n";
import { ogDefaults } from '@/lib/og';

type PageProps = { params: Promise<{ locale: string; slug: string }> };

const SITE = "https://buriedgames.com";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) {
    return { title: locale === "ar" ? "دراسة الحالة غير موجودة" : "Case Study Not Found" };
  }

  const path = `/case-studies/${caseStudy.slug}`;

  return {
    title: caseStudy.metaTitle[locale],
    description: caseStudy.metaDescription[locale],
    alternates: {
      canonical: localePath(locale, path),
      languages: languageAlternates(path),
    },
    openGraph: {
      ...ogDefaults,
      title: caseStudy.metaTitle[locale],
      description: caseStudy.metaDescription[locale],
      url: localePath(locale, path),
      locale: ogLocale[locale],
      type: "article",
    },
  };
}

function articleSchema(locale: Locale, slug: string) {
  const caseStudy = getCaseStudy(slug)!;
  const url = `${SITE}${localePath(locale, `/case-studies/${caseStudy.slug}`)}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": caseStudy.title[locale],
    ...(locale === "ar" ? { "alternateName": caseStudy.latinName } : {}),
    "description": caseStudy.metaDescription[locale],
    "url": url,
    "inLanguage": locale,
    ...(caseStudy.datePublished ? { "datePublished": caseStudy.datePublished } : {}),
    "author": {
      "@type": "Organization",
      "name": "Buried Games Studio",
      "url": SITE,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Buried Games Studio",
      "url": SITE,
    },
  };
}

function breadcrumbSchema(locale: Locale, slug: string) {
  const caseStudy = getCaseStudy(slug)!;
  const ui = caseStudiesUi[locale];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": ui.breadcrumbHome, "item": `${SITE}${localePath(locale, "/")}` },
      { "@type": "ListItem", "position": 2, "name": ui.breadcrumbIndex, "item": `${SITE}${localePath(locale, "/case-studies")}` },
      { "@type": "ListItem", "position": 3, "name": caseStudy.title[locale], "item": `${SITE}${localePath(locale, `/case-studies/${caseStudy.slug}`)}` },
    ],
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) notFound();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema(raw, slug)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(raw, slug)) }} />
      <CaseStudyDetailContent locale={raw} caseStudy={caseStudy} />
    </>
  );
}
