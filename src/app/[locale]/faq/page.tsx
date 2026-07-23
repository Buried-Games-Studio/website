import { Metadata } from "next";
import { notFound } from "next/navigation";
import { FaqContent } from "@/components/pages/faq-content";
import { faqContent } from "@/lib/content/faq";
import { isLocale, localePath, languageAlternates, ogLocale, type Locale } from "@/lib/i18n";
import { ogDefaults } from '@/lib/og';

const SITE = "https://buriedgames.com";
const PATH = "/faq";

type PageProps = { params: Promise<{ locale: string }> };

const metaTitle: Record<Locale, string> = {
  en: "FAQ | Game Development in Kuwait & the GCC",
  ar: "الأسئلة الشائعة | تطوير الألعاب في الكويت والخليج",
};
const metaDescription: Record<Locale, string> = {
  en: "Answers to common questions about Buried Games Studio: our games, the engines and platforms we use, working with us, pricing, Arabic game development, and how to reach us across Kuwait and the GCC.",
  ar: "إجابات على الأسئلة الشائعة حول استوديو بريد جيمز: ألعابنا، والمحركات والمنصات التي نستخدمها، والعمل معنا، والتكلفة، وتطوير الألعاب بالعربية، وكيفية التواصل معنا في الكويت والخليج.",
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return {
    title: metaTitle[locale],
    description: metaDescription[locale],
    alternates: {
      canonical: localePath(locale, PATH),
      languages: languageAlternates(PATH),
    },
    openGraph: {
      ...ogDefaults,
      title: metaTitle[locale],
      description: metaDescription[locale],
      url: localePath(locale, PATH),
      locale: ogLocale[locale],
      type: "website",
    },
  };
}

export default async function FaqPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const url = SITE + localePath(locale, PATH);

  // FAQPage JSON-LD built from the full faq.ts content, per locale. This dedicated
  // page is intended to be the canonical FAQPage schema carrier for the site.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqContent[locale].items.map(({ q, a }) => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": { "@type": "Answer", "text": a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": locale === "ar" ? "الرئيسية" : "Home", "item": SITE + localePath(locale, "/") },
      { "@type": "ListItem", "position": 2, "name": locale === "ar" ? "الأسئلة الشائعة" : "FAQ", "item": url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <FaqContent locale={locale} />
    </>
  );
}
