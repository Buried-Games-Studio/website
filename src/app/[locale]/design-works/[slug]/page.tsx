import { Metadata } from "next";
import { notFound } from "next/navigation";
import { DesignWorkDetailContent } from "@/components/pages/design-work-detail-content";
import {
  DESIGN_WORKS_PATH,
  designWorks,
  designWorksUi,
  getDesignWork,
  type DesignWork,
} from "@/lib/content/design-works";
import { bokhari, getTeamMember, personLd } from "@/lib/content/team";
import { isLocale, localePath, languageAlternates, ogLocale, type Locale } from "@/lib/i18n";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

const SITE = "https://buriedgames.com";

export function generateStaticParams() {
  return designWorks.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const work = getDesignWork(slug);

  if (!work) {
    return { title: locale === "ar" ? "العمل غير موجود" : "Design Work Not Found" };
  }

  const path = `${DESIGN_WORKS_PATH}/${work.slug}`;

  return {
    title: work.metaTitle[locale],
    description: work.metaDescription[locale],
    alternates: {
      canonical: localePath(locale, path),
      languages: languageAlternates(path),
    },
    openGraph: {
      title: work.metaTitle[locale],
      description: work.metaDescription[locale],
      url: localePath(locale, path),
      locale: ogLocale[locale],
      type: "article",
      images: [{ url: work.heroImage, alt: work.heroImageHint[locale] }],
    },
    twitter: {
      card: "summary_large_image",
      title: work.metaTitle[locale],
      description: work.metaDescription[locale],
      images: [work.heroImage],
    },
  };
}

function author(work: DesignWork) {
  return getTeamMember(work.authorId ?? "") ?? bokhari;
}

// The load-bearing attribution: creator is a Person whose worksFor ties him to
// the studio — a team member's own work, published by the studio. Never an
// Organization-authored piece and never an unaffiliated vendor.
function workSchema(locale: Locale, slug: string) {
  const work = getDesignWork(slug)!;
  const url = `${SITE}${localePath(locale, `${DESIGN_WORKS_PATH}/${work.slug}`)}`;

  const images = [
    { url: work.heroImage, caption: work.heroImageHint[locale] },
    ...work.gallery.map((image) => ({ url: image.url, caption: image.hint[locale] })),
  ].filter((image, i, all) => all.findIndex((other) => other.url === image.url) === i);

  return {
    "@context": "https://schema.org",
    "@type": work.schemaType ?? "VisualArtwork",
    "name": work.title[locale],
    ...(locale === "ar" ? { "alternateName": work.latinName } : {}),
    "description": work.metaDescription[locale],
    "url": url,
    "inLanguage": locale,
    "image": images.map((image) => ({
      "@type": "ImageObject",
      "url": image.url,
      "caption": image.caption,
    })),
    ...(work.year ? { "dateCreated": work.year } : {}),
    ...(work.datePublished ? { "datePublished": work.datePublished } : {}),
    ...(work.tools?.length ? { "artMedium": work.tools.join(", ") } : {}),
    "creator": personLd(author(work), locale),
    "publisher": {
      "@type": "Organization",
      "name": "Buried Games Studio",
      "url": SITE,
    },
  };
}

function breadcrumbSchema(locale: Locale, slug: string) {
  const work = getDesignWork(slug)!;
  const ui = designWorksUi[locale];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": ui.breadcrumbHome, "item": `${SITE}${localePath(locale, "/")}` },
      { "@type": "ListItem", "position": 2, "name": ui.breadcrumbIndex, "item": `${SITE}${localePath(locale, DESIGN_WORKS_PATH)}` },
      { "@type": "ListItem", "position": 3, "name": work.title[locale], "item": `${SITE}${localePath(locale, `${DESIGN_WORKS_PATH}/${work.slug}`)}` },
    ],
  };
}

export default async function DesignWorkPage({ params }: PageProps) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const work = getDesignWork(slug);
  if (!work) notFound();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(workSchema(raw, slug)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(raw, slug)) }} />
      <DesignWorkDetailContent locale={raw} work={work} />
    </>
  );
}
