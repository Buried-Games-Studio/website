import { Metadata } from "next";
import { notFound } from "next/navigation";
import { TermsOfUseContent } from "@/components/pages/terms-of-use-content";
import { isLocale, localePath, languageAlternates, ogLocale, type Locale } from "@/lib/i18n";
import { ogDefaults } from '@/lib/og';

const PATH = "/terms-of-use";

type PageProps = { params: Promise<{ locale: string }> };

const title: Record<Locale, string> = {
  en: 'Terms of Use',
  ar: 'شروط الاستخدام',
};

const description: Record<Locale, string> = {
  en: 'Terms of Use for Buried Games Studio. Read the terms and conditions governing the use of our website and services.',
  ar: 'شروط الاستخدام لاستوديو بريد جيمز. اطّلع على الشروط والأحكام التي تحكم استخدام موقعنا وخدماتنا.',
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
      ...ogDefaults,
      title: title[locale],
      description: description[locale],
      url: localePath(locale, PATH),
      locale: ogLocale[locale],
      type: 'website',
    },
  };
}

export default async function TermsOfUsePage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  return <TermsOfUseContent locale={raw} />;
}
