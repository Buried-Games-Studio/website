import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudiesContent } from "@/components/pages/case-studies-content";
import { caseStudies, caseStudiesUi, hasEnoughCaseStudies } from "@/lib/content/case-studies";
import { isLocale, localePath, languageAlternates, ogLocale, type Locale } from "@/lib/i18n";
import { ogDefaults } from '@/lib/og';

type PageProps = { params: Promise<{ locale: string }> };

const SITE = "https://buriedgames.com";
const PATH = "/case-studies";

const meta: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Case Studies — Games & Products We've Shipped",
    description:
      "Real projects, real outcomes: how we design, build and ship games and interactive products for Kuwait and the GCC.",
  },
  ar: {
    title: "دراسات الحالة — ألعاب ومنتجات أطلقناها",
    description:
      "مشاريع ونتائج حقيقية: كيف نصمم ونبني ونطلق ألعابًا ومنتجات تفاعلية للكويت والخليج.",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";

  return {
    // Content/commercial page — `absolute` opts out of the root
    // "%s | Buried Games Studio" template, which costs 22 of the ~60
    // characters Google renders. Brand pages keep the template.
    title: { absolute: meta[locale].title },
    description: meta[locale].description,
    // Thin until there are enough entries to be worth a crawl slot — see
    // hasEnoughCaseStudies(). `follow` stays true so the one real case study
    // below still inherits link equity from this page.
    robots: { index: hasEnoughCaseStudies(), follow: true },
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
