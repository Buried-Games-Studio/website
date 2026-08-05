import { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomeContent } from "@/components/pages/home-content";
import { isLocale, localePath, languageAlternates, ogLocale, type Locale } from "@/lib/i18n";
import { ogDefaults } from '@/lib/og';

type PageProps = { params: Promise<{ locale: string }> };

const title: Record<Locale, string> = {
  en: 'Buried Games Studio | Game Development for Kuwait & the GCC',
  ar: 'استوديو بريد جيمز | تطوير ألعاب للكويت والخليج',
};

const description: Record<Locale, string> = {
  en: 'Game development company for Kuwait and the GCC — mobile, multiplayer and Unity games for studios, brands and entrepreneurs. From concept to launch.',
  ar: 'شركة تطوير ألعاب إلكترونية للكويت والخليج — ألعاب جوال وجماعية على Unity للاستوديوهات والعلامات التجارية ورواد الأعمال. من الفكرة إلى الإطلاق.',
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
      ...ogDefaults,
      title: title[locale],
      description: description[locale],
      url: localePath(locale, '/'),
      locale: ogLocale[locale],
      type: 'website',
    },
  };
}

// The FAQ accordion stays on the homepage, but its FAQPage JSON-LD lives on
// /faq only — emitting the same schema on two URLs makes Google pick one
// arbitrarily and dilutes the rich-result eligibility of both.
export default async function Home({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  return <HomeContent locale={raw} />;
}
