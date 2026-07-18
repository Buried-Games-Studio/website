import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ImprintContent } from "@/components/pages/imprint-content";
import { legalEntity } from "@/lib/legal-entity";
import { isLocale, localePath, languageAlternates, ogLocale, type Locale } from "@/lib/i18n";

const PATH = "/imprint";

type PageProps = { params: Promise<{ locale: string }> };

const title: Record<Locale, string> = {
  en: "Legal Notice",
  ar: "بيان قانوني",
};

const description: Record<Locale, string> = {
  en: "Legal notice and company information for Buried Games.",
  ar: "البيان القانوني ومعلومات الشركة الخاصة ببريد جيمز.",
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";

  return {
    title: title[locale],
    description: description[locale],
    alternates: {
      canonical: localePath(locale, PATH),
      languages: languageAlternates(PATH),
    },
    // The page is a neutral placeholder until the entity is registered — keep it
    // out of the index until it carries real disclosure content.
    robots: { index: legalEntity.registered, follow: true },
    openGraph: {
      title: title[locale],
      description: description[locale],
      url: localePath(locale, PATH),
      locale: ogLocale[locale],
      type: "website",
    },
  };
}

export default async function ImprintPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  return <ImprintContent locale={raw} />;
}
