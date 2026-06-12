import { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutUsContent } from "@/components/pages/about-us-content";
import { aboutContent } from "@/lib/content/about";
import { isLocale, localePath, languageAlternates, ogLocale, type Locale } from "@/lib/i18n";

type PageProps = { params: Promise<{ locale: string }> };

const PATH = "/about-us";

const title: Record<Locale, string> = {
  en: 'About Us — Indie Game Studio in Kuwait',
  ar: 'من نحن — استوديو ألعاب مستقل في الكويت',
};

const description: Record<Locale, string> = {
  en: "Meet Buried Games Studio — an indie game development studio founded in Kuwait in 2018. Discover our story, our gameplay-first mission, our core values, and the team building immersive games for the GCC and beyond.",
  ar: "تعرّف على استوديو بريد جيمز — استوديو كويتي مستقل لتطوير الألعاب تأسس عام 2018. اكتشف قصتنا ومهمتنا القائمة على \"اللعب أولاً\" وقيمنا والفريق الذي يصنع ألعابًا غامرة لمنطقة الخليج والعالم.",
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

// AboutPage JSON-LD describing the studio, generated from the same localized
// content the page renders so the structured data tracks the visible copy.
function aboutSchema(locale: Locale) {
  const about = aboutContent.about_page[locale];
  const founder = about.team[0];

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
      "founder": {
        "@type": "Person",
        "name": founder.name,
        "jobTitle": founder.role,
        "sameAs": founder.linkedInUrl,
      },
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
      <AboutUsContent locale={raw} />
    </>
  );
}
