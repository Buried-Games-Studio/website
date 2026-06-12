import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactUsContent } from "@/components/pages/contact-us-content";
import { isLocale, localePath, languageAlternates, ogLocale, type Locale } from "@/lib/i18n";

type PageProps = { params: Promise<{ locale: string }> };

const PATH = "/contact-us";

const title: Record<Locale, string> = {
  en: "Contact Us — Start Your Game Project",
  ar: "اتصل بنا — ابدأ مشروع لعبتك",
};

const description: Record<Locale, string> = {
  en: "Get in touch with Buried Games Studio to start your game project. Message us on WhatsApp for the fastest reply, or send a project, partnership, or publishing inquiry across Kuwait and the GCC.",
  ar: "تواصل مع استوديو بريد جيمز لبدء مشروع لعبتك. راسلنا عبر واتساب للحصول على أسرع رد، أو أرسل استفسار مشروع أو شراكة أو نشر ألعاب في الكويت ودول الخليج.",
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

// ContactPage JSON-LD — describes the contact page and exposes the WhatsApp
// business line as the primary contact point for GCC visitors.
function contactSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": title[locale],
    "description": description[locale],
    "url": "https://buriedgames.com" + localePath(locale, PATH),
    "inLanguage": locale === "ar" ? "ar-KW" : "en-US",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Buried Games Studio",
      "url": "https://buriedgames.com",
    },
    "mainEntity": {
      "@type": "Organization",
      "name": "Buried Games Studio",
      "url": "https://buriedgames.com",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+96555528686",
          "contactType": "customer support",
          "contactOption": "WhatsApp",
          "areaServed": ["KW", "SA", "AE", "QA", "BH", "OM"],
          "availableLanguage": ["Arabic", "English"],
        },
      ],
    },
  };
}

export default async function ContactUsPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema(raw)) }}
      />
      <ContactUsContent locale={raw} />
    </>
  );
}
