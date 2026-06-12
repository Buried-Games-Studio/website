import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrivacyPolicyContent } from "@/components/pages/privacy-policy-content";
import { isLocale, localePath, languageAlternates, ogLocale, type Locale } from "@/lib/i18n";

const PATH = "/privacy-policy";

type PageProps = { params: Promise<{ locale: string }> };

const title: Record<Locale, string> = {
  en: 'Privacy Policy',
  ar: 'سياسة الخصوصية',
};

const description: Record<Locale, string> = {
  en: 'Privacy Policy for Buried Games Studio. Learn how we collect, use, and protect your personal information.',
  ar: 'سياسة الخصوصية لاستوديو بريد جيمز. تعرّف على كيفية جمعنا لمعلوماتك الشخصية واستخدامها وحمايتها.',
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

export default async function PrivacyPolicyPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  return <PrivacyPolicyContent locale={raw} />;
}
