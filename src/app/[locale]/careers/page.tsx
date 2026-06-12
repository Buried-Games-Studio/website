import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CareersContent } from "@/components/pages/careers-content";
import { isLocale, localePath, languageAlternates, ogLocale, type Locale } from "@/lib/i18n";

type PageProps = { params: Promise<{ locale: string }> };

const PATH = "/careers";

const title: Record<Locale, string> = {
  en: 'Careers — Game Development Jobs',
  ar: 'وظائف — انضم إلى فريق تطوير الألعاب',
};

const description: Record<Locale, string> = {
  en: 'Join Buried Games Studio. Explore open positions and become part of an indie game development team crafting multiplayer games, strategy games, and interactive digital experiences.',
  ar: 'انضم إلى استوديو بريد جيمز. اكتشف الوظائف المتاحة وكن جزءاً من فريق مستقل لتطوير الألعاب يصنع ألعاباً جماعية وألعاب استراتيجية وتجارب رقمية تفاعلية.',
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';

  return {
    title: title[locale],
    description: description[locale],
    alternates: {
      canonical: localePath(locale, PATH),
      languages: languageAlternates(PATH),
    },
    openGraph: {
      title: title[locale],
      description: description[locale],
      url: localePath(locale, PATH),
      locale: ogLocale[locale],
      type: 'website',
    },
  };
}

export default async function CareersPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  return <CareersContent locale={raw} />;
}
