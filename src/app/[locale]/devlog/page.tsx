import { Metadata } from "next";
import { notFound } from "next/navigation";
import { DevlogContent } from "@/components/pages/devlog-content";
import { devlogContent } from "@/lib/content/devlog";
import { isLocale, localePath, languageAlternates, ogLocale, type Locale } from "@/lib/i18n";

type PageProps = { params: Promise<{ locale: string }> };

const PATH = '/devlog';

const title: Record<Locale, string> = {
  en: 'Devlogs & Behind the Scenes',
  ar: 'مدونات التطوير وما وراء الكواليس',
};

const description: Record<Locale, string> = {
  en: devlogContent.en.page_subtitle,
  ar: devlogContent.ar.page_subtitle,
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

export default async function DevlogPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  return <DevlogContent locale={raw} />;
}
