import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailContent } from "@/components/pages/service-detail-content";
import { servicePages, getServicePage } from "@/lib/content/service-pages";
import { isLocale, localePath, languageAlternates, ogLocale, type Locale } from "@/lib/i18n";

const SITE = "https://buriedgames.com";

type PageProps = { params: Promise<{ locale: string; service: string }> };

// Child pages live under the canonical /services/<slug> URLs; the /services hub
// stays at its own route. generateStaticParams enumerates the four service slugs.
export function generateStaticParams() {
  return servicePages.map((page) => ({ service: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw, service } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const page = getServicePage(service);

  if (!page) {
    return { title: "Service Not Found" };
  }

  const path = `/services/${page.slug}`;

  return {
    title: page.metaTitle[locale],
    description: page.metaDescription[locale],
    alternates: {
      canonical: localePath(locale, path),
      languages: languageAlternates(path),
    },
    openGraph: {
      title: page.metaTitle[locale],
      description: page.metaDescription[locale],
      url: localePath(locale, path),
      locale: ogLocale[locale],
      type: "website",
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { locale: raw, service } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const page = getServicePage(service);
  if (!page) notFound();

  const path = `/services/${page.slug}`;
  const url = SITE + localePath(locale, path);

  // Service JSON-LD — areaServed matches the hub page's GCC coverage. The
  // Arabic page keeps the Latin service name as alternateName for entity match.
  const serviceSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": page.metaTitle[locale],
    "description": page.metaDescription[locale],
    "serviceType": page.serviceType,
    "url": url,
    "areaServed": ["KW", "SA", "AE", "QA", "BH", "OM"],
    "provider": {
      "@type": "Organization",
      "name": "Buried Games Studio",
      "url": SITE,
    },
  };
  if (locale === "ar") {
    serviceSchema.alternateName = page.latinName;
  }

  // FAQPage JSON-LD generated from the same FAQ the page renders, per locale.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": page.faq.items.map((item) => ({
      "@type": "Question",
      "name": item.q[locale],
      "acceptedAnswer": { "@type": "Answer", "text": item.a[locale] },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": locale === "ar" ? "الرئيسية" : "Home",
        "item": SITE + localePath(locale, "/"),
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": locale === "ar" ? "الخدمات" : "Services",
        "item": SITE + localePath(locale, "/services"),
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": page.hero.eyebrow[locale],
        "item": url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServiceDetailContent service={page} locale={locale} />
    </>
  );
}
