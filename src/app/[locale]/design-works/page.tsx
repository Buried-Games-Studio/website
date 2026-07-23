import { Metadata } from "next";
import { notFound } from "next/navigation";
import { DesignWorksContent } from "@/components/pages/design-works-content";
import {
  DESIGN_WORKS_PATH,
  designWorks,
  designWorksUi,
  hasDesignWorks,
} from "@/lib/content/design-works";
import { bokhari, personLd } from "@/lib/content/team";
import { isLocale, localePath, languageAlternates, ogLocale, type Locale } from "@/lib/i18n";
import { ogDefaults } from '@/lib/og';

type PageProps = { params: Promise<{ locale: string }> };

const SITE = "https://buriedgames.com";
const PATH = DESIGN_WORKS_PATH;

// Brand suffix comes from the layout's title.template — don't repeat it here.
const meta: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Design Works by Bokhari Hamid, Our Creative Director",
    description:
      "A showcase of design work by Bokhari Hamid, Creative Director at Buried Games Studio — concept art, character design, branding, and game UI, shared as part of our team's portfolio for Kuwait & the GCC.",
  },
  ar: {
    title: "أعمال التصميم — بوخاري حامد، مديرنا الإبداعي",
    description:
      "معرض لأعمال التصميم من إبداع بوخاري حامد، المدير الإبداعي في استوديو بريد جيمز — فن مفاهيمي وتصميم شخصيات وهوية بصرية وواجهات ألعاب، ضمن أعمال فريقنا للكويت والخليج.",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";

  return {
    title: meta[locale].title,
    description: meta[locale].description,
    alternates: {
      canonical: localePath(locale, PATH),
      languages: languageAlternates(PATH),
    },
    openGraph: {
      ...ogDefaults,
      title: meta[locale].title,
      description: meta[locale].description,
      url: localePath(locale, PATH),
      locale: ogLocale[locale],
      type: "website",
    },
  };
}

// CollectionPage whose creator is a Person tied to the studio via worksFor —
// the section reads as a team member's portfolio, not a studio production
// and not vendor work.
function collectionSchema(locale: Locale) {
  const url = `${SITE}${localePath(locale, PATH)}`;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": meta[locale].title,
    "description": meta[locale].description,
    "url": url,
    "inLanguage": locale,
    "creator": personLd(bokhari, locale),
    "hasPart": designWorks.map((work) => ({
      "@type": work.schemaType ?? "VisualArtwork",
      "name": work.title[locale],
      "url": `${SITE}${localePath(locale, `${PATH}/${work.slug}`)}`,
    })),
  };
}

function breadcrumbSchema(locale: Locale) {
  const ui = designWorksUi[locale];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": ui.breadcrumbHome, "item": `${SITE}${localePath(locale, "/")}` },
      { "@type": "ListItem", "position": 2, "name": ui.breadcrumbIndex, "item": `${SITE}${localePath(locale, PATH)}` },
    ],
  };
}

export default async function DesignWorksPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  // The whole section stays dark until the first real works are published.
  if (!hasDesignWorks()) notFound();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema(raw)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(raw)) }} />
      <DesignWorksContent locale={raw} />
    </>
  );
}
