import { Metadata } from "next";
import { notFound } from "next/navigation";
import { GccLandingContent } from "@/components/pages/gcc-landing-content";
import { getGccLanding, gccLandingUi } from "@/lib/content/gcc-landing";
import { isLocale, localePath, languageAlternates, ogLocale, type Locale } from "@/lib/i18n";
import { ogDefaults } from '@/lib/og';

type PageProps = { params: Promise<{ locale: string }> };

const SITE = "https://buriedgames.com";
const SLUG = "game-development-bahrain";
const PATH = `/${SLUG}`;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const landing = getGccLanding(SLUG)!;

  return {
    title: landing.metaTitle[locale],
    description: landing.metaDescription[locale],
    alternates: {
      canonical: localePath(locale, PATH),
      languages: languageAlternates(PATH),
    },
    openGraph: {
      ...ogDefaults,
      title: landing.metaTitle[locale],
      description: landing.metaDescription[locale],
      url: localePath(locale, PATH),
      locale: ogLocale[locale],
      type: "website",
    },
  };
}

function serviceSchema(locale: Locale) {
  const landing = getGccLanding(SLUG)!;
  const url = `${SITE}${localePath(locale, PATH)}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": landing.metaTitle[locale],
    "description": landing.metaDescription[locale],
    "serviceType": locale === "ar" ? "تطوير الألعاب" : "Game Development",
    "url": url,
    "areaServed": { "@type": "Country", "name": landing.countryName[locale], "identifier": landing.countryCode },
    "provider": {
      "@type": "Organization",
      "name": "Buried Games Studio",
      "url": SITE,
    },
  };
}

function breadcrumbSchema(locale: Locale) {
  const landing = getGccLanding(SLUG)!;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": gccLandingUi[locale].breadcrumbHome, "item": `${SITE}${localePath(locale, "/")}` },
      { "@type": "ListItem", "position": 2, "name": landing.title[locale], "item": `${SITE}${localePath(locale, PATH)}` },
    ],
  };
}

function faqSchema(locale: Locale) {
  const landing = getGccLanding(SLUG)!;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": landing.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q[locale],
      "acceptedAnswer": { "@type": "Answer", "text": faq.a[locale] },
    })),
  };
}

export default async function GameDevelopmentBahrainPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const landing = getGccLanding(SLUG);
  if (!landing) notFound();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(raw)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(raw)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(raw)) }} />
      <GccLandingContent locale={raw} landing={landing} />
    </>
  );
}
