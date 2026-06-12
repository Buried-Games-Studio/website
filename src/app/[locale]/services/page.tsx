import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicesContent } from "@/components/pages/services-content";
import { servicesContent } from "@/lib/content/services";
import { isLocale, localePath, languageAlternates, ogLocale, type Locale } from "@/lib/i18n";

type PageProps = { params: Promise<{ locale: string }> };

const PATH = "/services";

const title: Record<Locale, string> = {
  en: "Game Development Services | Unity & Unreal Studio in Kuwait",
  ar: "خدمات تطوير الألعاب — استوديو يونيتي وأنريل في الكويت والخليج",
};

const description: Record<Locale, string> = {
  en: "Full-cycle game development services from Kuwait for GCC clients. Buried Games Studio delivers Unity & Unreal development, mobile game porting, 2D/3D art, QA testing, and backend & multiplayer networking.",
  ar: "خدمات تطوير ألعاب متكاملة من الكويت لعملاء الخليج. يقدّم استوديو بريد جيمز تطوير ألعاب على يونيتي وأنريل، ونقل الألعاب إلى الجوال، وفن ثنائي وثلاثي الأبعاد، وضمان الجودة، وتطوير الواجهة الخلفية والشبكات.",
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
    openGraph: {
      title: title[locale],
      description: description[locale],
      url: localePath(locale, PATH),
      locale: ogLocale[locale],
      type: "website",
    },
  };
}

// Service + ItemList JSON-LD generated from the same content the visible
// services section renders, so structured data stays in sync per locale.
function servicesSchema(locale: Locale) {
  const services = servicesContent[locale].items;
  const url = `https://buriedgames.com${localePath(locale, PATH)}`;

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": title[locale],
    "description": description[locale],
    "url": url,
    "itemListElement": services.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": service.name,
        "description": service.description,
        "serviceType": service.name,
        "url": url,
        "areaServed": ["KW", "SA", "AE", "QA", "BH", "OM"],
        "provider": {
          "@type": "Organization",
          "name": "Buried Games Studio",
          "url": "https://buriedgames.com",
        },
      },
    })),
  };
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema(raw)) }}
      />
      <ServicesContent locale={raw} />
    </>
  );
}
