
import type { Metadata, Viewport } from 'next';
import '../globals.css';
import { notFound } from 'next/navigation';
import { LanguageProvider } from '@/contexts/language-context';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";

import { Suspense } from 'react';
import { assets } from '@/lib/assets';
import { Cairo, Inter, Space_Grotesk } from 'next/font/google';
import Script from 'next/script';
import { SurveyModal } from '@/components/survey-modal';
import { SmoothScroll } from '@/components/providers/smooth-scroll';
import { PageTransition } from '@/components/providers/page-transition';
import { MotionProvider } from '@/components/providers/lazy-motion';
import { locales, isLocale, languageAlternates, ogLocale, textDirection, type Locale } from '@/lib/i18n';

// display: 'optional' on all three: with 'swap', the H1 repainted when the
// webfont arrived and that repaint became the LCP entry (~8s simulated on
// mobile). 'optional' paints the metrically-adjusted fallback with no swap on
// cold visits and uses the cached webfont on every visit after.
const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
  variable: '--font-cairo',
  display: 'optional',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'optional',
});

// Heading face. The pixel display font (afolkalips) is reserved for the
// wordmark only — using it for headings destroyed legibility and credibility.
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-space-grotesk',
  display: 'optional',
});

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Buried Games Studio",
  "alternateName": "استوديو بريد جيمز",
  "foundingDate": "2018-10-01",
  "founder": {
    "@type": "Person",
    "name": "Fahed Alahmad"
  },
  "email": "support@buriedgames.com",
  "url": "https://buriedgames.com",
  "logo": "https://assets.buriedgames.com/images/buriedgames_logo.png",
  // No PostalAddress on purpose: areaServed declares the service area without
  // asserting a place of establishment.
  "areaServed": ["KW", "SA", "AE", "QA", "BH", "OM"],
  "knowsAbout": [
    "Game Development",
    "Unity",
    "Unreal Engine",
    "Mobile Games",
    "Multiplayer Games",
    "Game Design",
    "Arabic Games"
  ],
  "sameAs": [
    "https://www.youtube.com/@buriedgames",
    "https://twitter.com/buriedgames",
    "https://instagram.com/buriedgames",
    "https://linkedin.com/company/buriedgames",
    "https://github.com/Buried-Games-Studio",
    "https://tiktok.com/@buriedgames",
    "https://www.crunchbase.com/organization/buried-games-studio",
    "https://wa.me/96555528686"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+96555528686",
    "contactType": "Customer Support",
    "availableLanguage": ["en", "ar"]
  }
};

// WebSite node so Google associates the canonical site name and URL.
// Deliberately no SearchAction: the site has no on-site search, and the old
// WordPress deployment's ?s={search_term_string} template still haunts GSC.
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Buried Games Studio",
  "alternateName": "استوديو بريد جيمز",
  "url": "https://buriedgames.com",
  "inLanguage": ["en", "ar"],
  "publisher": {
    "@type": "Organization",
    "name": "Buried Games Studio",
    "url": "https://buriedgames.com"
  }
};

const siteTitle: Record<Locale, { default: string; template: string }> = {
  en: {
    default: 'Buried Games Studio | Game Development for Kuwait & the GCC',
    template: '%s | Buried Games Studio',
  },
  ar: {
    default: 'استوديو بريد جيمز | تطوير ألعاب للكويت والخليج',
    template: '%s | استوديو بريد جيمز',
  },
};

const siteDescription: Record<Locale, string> = {
  en: 'Buried Games Studio is a game development studio building multiplayer games, mobile games, and interactive experiences for clients across Kuwait and the GCC. Explore our games, services, and devlogs.',
  ar: 'استوديو بريد جيمز هو استوديو تطوير ألعاب يصنع ألعابًا جماعية وألعاب جوال وتجارب تفاعلية لعملاء في الكويت والخليج. اكتشف ألعابنا وخدماتنا ومدونة التطوير.',
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';

  return {
    metadataBase: new URL('https://buriedgames.com'),
    title: siteTitle[locale],
    description: siteDescription[locale],
    authors: [{ name: 'Buried Games Studio', url: 'https://buriedgames.com' }],
    manifest: '/site.webmanifest',
    // Bing Webmaster Tools ownership: set NEXT_PUBLIC_BING_VERIFICATION to the
    // msvalidate.01 code from bing.com/webmasters (Settings → Verify by meta tag).
    ...(process.env.NEXT_PUBLIC_BING_VERIFICATION
      ? {
          verification: {
            other: { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION },
          },
        }
      : {}),
    alternates: {
      languages: languageAlternates('/'),
    },
    openGraph: {
      title: 'Buried Games Studio',
      siteName: 'Buried Games Studio',
      description: siteDescription[locale],
      url: 'https://buriedgames.com',
      images: [
        {
          url: assets.logo,
          width: 200,
          height: 200,
          alt: 'Buried Games Studio Logo',
        },
      ],
      locale: ogLocale[locale],
      alternateLocale: locale === 'en' ? [ogLocale.ar] : [ogLocale.en],
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: 'Buried Games Studio',
      description: siteDescription[locale],
      images: [assets.logo],
    },
  };
}

export const viewport: Viewport = {
  themeColor: '#000000',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  return (
    <html lang={locale} dir={textDirection(locale)} className={`${cairo.variable} ${inter.variable} ${spaceGrotesk.variable} dark`}>
      <head>
        {/* crossOrigin variant: the Afolkalips @font-face fetches with CORS,
            which needs its own preconnected socket. Images now come from
            /cdn-cgi/image on this origin, so no plain-socket hint is needed. */}
        <link rel="preconnect" href="https://assets.buriedgames.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://assets.buriedgames.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground selection:bg-primary/20">
        <LanguageProvider locale={locale}>
          <MotionProvider>
            <SmoothScroll>
              <Suspense>
                <SurveyModal />
              </Suspense>
              <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:start-4 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md">
                {locale === 'ar' ? 'تخطي إلى المحتوى الرئيسي' : 'Skip to main content'}
              </a>
              <div className="relative flex min-h-screen flex-col">
                <Header />
                <div id="main-content" className="flex-1 md:px-12">
                  <PageTransition>{children}</PageTransition>
                </div>
                <Footer />
              </div>
              <Toaster />
            </SmoothScroll>
          </MotionProvider>
        </LanguageProvider>
        {/* lazyOnload: analytics has no business in the critical path — it was
            160KB of the "reduce unused JavaScript" audit. */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5T83FCTGPZ"
          strategy="lazyOnload"
        />
        <Script id="gtag-init" strategy="lazyOnload">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-5T83FCTGPZ');`}
        </Script>
      </body>
    </html>
  );
}
