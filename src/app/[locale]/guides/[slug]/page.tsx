import { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideContent } from "@/components/pages/guide-content";
import { guides, getGuide } from "@/lib/content/guides";
import { isLocale, localePath, languageAlternates, ogLocale, type Locale } from "@/lib/i18n";
import { ogDefaults } from "@/lib/og";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

const SITE = "https://buriedgames.com";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const guide = getGuide(slug);

  if (!guide) {
    return { title: locale === "ar" ? "الدليل غير موجود" : "Guide Not Found" };
  }

  const path = `/guides/${guide.slug}`;

  return {
    // Content page — `absolute` opts out of the root "%s | Buried Games Studio"
    // template, which costs 22 of the ~60 characters Google renders.
    title: { absolute: guide.metaTitle[locale] },
    description: guide.metaDescription[locale],
    alternates: {
      canonical: localePath(locale, path),
      languages: languageAlternates(path),
    },
    openGraph: {
      ...ogDefaults,
      title: guide.metaTitle[locale],
      description: guide.metaDescription[locale],
      url: localePath(locale, path),
      locale: ogLocale[locale],
      type: "article",
    },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const path = `/guides/${guide.slug}`;
  const url = `${SITE}${localePath(locale, path)}`;

  /**
   * ItemList rather than a ranked list: `itemListOrder` is explicitly
   * Unordered because the page says it does not rank the companies, and the
   * schema must not claim otherwise. FAQPage carries the Q&A, which is the part
   * AI assistants actually extract when asked who to hire in Kuwait.
   */
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: guide.title[locale],
    description: guide.metaDescription[locale],
    itemListOrder: "https://schema.org/ItemListUnordered",
    numberOfItems: guide.entries.length,
    itemListElement: guide.entries.map((entry, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@type": "Organization", name: entry.name },
    })),
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q[locale],
      acceptedAnswer: { "@type": "Answer", text: a[locale] },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "ar" ? "الرئيسية" : "Home",
        item: `${SITE}${localePath(locale, "/")}`,
      },
      { "@type": "ListItem", position: 2, name: guide.title[locale], item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <GuideContent locale={locale} guide={guide} />
    </>
  );
}
