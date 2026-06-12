import { Metadata } from "next";
import { notFound } from "next/navigation";
import { HowItWorksContent } from "@/components/pages/how-it-works-content";
import { howItWorksContent } from "@/lib/content/how-it-works";
import { isLocale, localePath, languageAlternates, ogLocale, type Locale } from "@/lib/i18n";

const SITE = "https://buriedgames.com";
const PATH = "/how-it-works";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return {
    title: howItWorksContent.metaTitle[locale],
    description: howItWorksContent.metaDescription[locale],
    alternates: {
      canonical: localePath(locale, PATH),
      languages: languageAlternates(PATH),
    },
    openGraph: {
      title: howItWorksContent.metaTitle[locale],
      description: howItWorksContent.metaDescription[locale],
      url: localePath(locale, PATH),
      locale: ogLocale[locale],
      type: "website",
    },
  };
}

export default async function HowItWorksPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const url = SITE + localePath(locale, PATH);
  const c = howItWorksContent;

  // HowTo JSON-LD generated from the same 5-step process the page renders, per locale.
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": c.hero.title[locale],
    "description": c.metaDescription[locale],
    "step": c.steps.map((step, i) => ({
      "@type": "HowToStep",
      "position": i + 1,
      "name": step.title[locale],
      "text": step.summary[locale],
      "image": step.image,
      "url": `${url}#${step.key}`,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": locale === "ar" ? "الرئيسية" : "Home", "item": SITE + localePath(locale, "/") },
      { "@type": "ListItem", "position": 2, "name": c.hero.eyebrow[locale], "item": url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <HowItWorksContent locale={locale} />
    </>
  );
}
