import { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutUsContent } from "@/components/pages/about-us-content";
import { aboutContent } from "@/lib/content/about";
import { bokhari, fahed, personLdNested } from "@/lib/content/team";
import { hasDesignWorks } from "@/lib/content/design-works";
import { isLocale, localePath, languageAlternates, ogLocale, type Locale } from "@/lib/i18n";
import { ogDefaults } from '@/lib/og';

type PageProps = { params: Promise<{ locale: string }> };

const PATH = "/about-us";

const title: Record<Locale, string> = {
  en: 'About Us — Indie Game Studio for Kuwait & the GCC',
  ar: 'من نحن — استوديو ألعاب مستقل للكويت والخليج',
};

const description: Record<Locale, string> = {
  en: "Meet Buried Games Studio — an independent game development studio founded in 2018, serving players and clients across Kuwait and the GCC. Discover our story, our gameplay-first mission, our core values, and the team building immersive games for the region and beyond.",
  ar: "تعرّف على استوديو بريد جيمز — استوديو مستقل لتطوير الألعاب تأسس عام 2018 يخدم اللاعبين والعملاء في الكويت والخليج. اكتشف قصتنا ومهمتنا القائمة على \"اللعب أولاً\" وقيمنا والفريق الذي يصنع ألعابًا غامرة للمنطقة والعالم.",
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

// AboutPage JSON-LD describing the studio, generated from the same localized
// content the page renders so the structured data tracks the visible copy.
function aboutSchema(locale: Locale) {
  const about = aboutContent.about_page[locale];

  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "url": "https://buriedgames.com" + localePath(locale, PATH),
    "inLanguage": locale,
    "mainEntity": {
      "@type": "Organization",
      "name": "Buried Games Studio",
      "url": "https://buriedgames.com" + localePath(locale, '/'),
      "foundingDate": "2018",
      "description": about.p1,
      "founder": personLdNested(fahed, locale),
      "employee": [personLdNested(bokhari, locale)],
    },
  };
}

export default async function AboutUsPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema(raw)) }}
      />
      <AboutUsContent locale={raw} showDesignWorks={hasDesignWorks()} />
    </>
  );
}
