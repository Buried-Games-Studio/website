import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicesContent } from "@/components/pages/services-content";
import { servicesContent } from "@/lib/content/services";
import { isLocale, localePath, languageAlternates, ogLocale, type Locale } from "@/lib/i18n";
import { ogDefaults } from '@/lib/og';

type PageProps = { params: Promise<{ locale: string }> };

const PATH = "/services";

const title: Record<Locale, string> = {
  // Hub, not a service page: it enumerates the menu so it stops competing
  // head-on with /services/game-development, which owns "game development
  // company". Keeps "Services" + GCC for "gcc game dev services" (pos ~5).
  en: "Our Services — Game, App & Web Development, AR & VR",
  ar: "خدماتنا — تطوير ألعاب وتطبيقات ومواقع وواقع معزز",
};

const description: Record<Locale, string> = {
  en: "Everything we build for clients across Kuwait and the GCC — game development, mobile apps, websites, game art, AR/VR and interactive installations.",
  ar: "كل ما نبنيه لعملائنا في الكويت والخليج — تطوير ألعاب إلكترونية، وتطبيقات جوال، ومواقع، وفن ألعاب، وواقع معزز وافتراضي، وتركيبات تفاعلية.",
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";

  return {
    // Commercial page — `absolute` drops the "| Buried Games Studio" suffix so
    // the ~60 rendered characters go to the keyword, not the byline.
    title: { absolute: title[locale] },
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
