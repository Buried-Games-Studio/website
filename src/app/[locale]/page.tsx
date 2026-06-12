import { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomeContent } from "@/components/pages/home-content";
import { faqContent } from "@/lib/content/faq";
import { isLocale, localePath, languageAlternates, ogLocale, type Locale } from "@/lib/i18n";

type PageProps = { params: Promise<{ locale: string }> };

const title: Record<Locale, string> = {
  en: 'Buried Games Studio | Indie Game Development Studio from Kuwait',
  ar: 'استوديو بريد جيمز | استوديو كويتي مستقل لتطوير الألعاب',
};

const description: Record<Locale, string> = {
  en: 'Buried Games Studio — indie game development studio from Kuwait crafting multiplayer games, trivia apps, and interactive experiences. Play Nabsh, Power of Bombs, KoutQ8, and more.',
  ar: 'استوديو بريد جيمز — استوديو كويتي مستقل لتطوير الألعاب، نصنع ألعابًا جماعية وتطبيقات تريفيا وتجارب تفاعلية. جرّب نبش، كوت الكويت، باور أوف بومبز والمزيد.',
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';

  return {
    title: { absolute: title[locale] },
    description: description[locale],
    alternates: {
      canonical: localePath(locale, '/'),
      languages: languageAlternates('/'),
    },
    openGraph: {
      title: title[locale],
      description: description[locale],
      url: localePath(locale, '/'),
      locale: ogLocale[locale],
      type: 'website',
    },
  };
}

// FAQPage JSON-LD is generated from the same content the visible FAQ accordion
// renders, so the structured data always matches the page in both languages.
function faqSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqContent[locale].items.map(({ q, a }) => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": { "@type": "Answer", "text": a },
    })),
  };
}

export default async function Home({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(raw)) }}
      />
      <HomeContent locale={raw} />
    </>
  );
}
