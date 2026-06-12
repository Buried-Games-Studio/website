
import type { Metadata, Viewport } from 'next';
import '../globals.css';
import { notFound } from 'next/navigation';
import { LanguageProvider } from '@/contexts/language-context';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";

import { Suspense } from 'react';
import { assets } from '@/lib/assets';
import { Cairo, Inter } from 'next/font/google';
import Script from 'next/script';
import FloatingSocials from '@/components/layout/floating-socials';
import { SurveyModal } from '@/components/survey-modal';
import { SmoothScroll } from '@/components/providers/smooth-scroll';
import { PageTransition } from '@/components/providers/page-transition';
import { MotionProvider } from '@/components/providers/lazy-motion';
import { locales, isLocale, languageAlternates, ogLocale, textDirection, type Locale } from '@/lib/i18n';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
  variable: '--font-cairo',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
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
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "KW"
  },
  "areaServed": ["KW", "SA", "AE", "QA", "BH", "OM"],
  "sameAs": [
    "https://www.youtube.com/@buriedgames",
    "https://twitter.com/buriedgames",
    "https://instagram.com/buriedgames",
    "https://linkedin.com/company/buriedgames",
    "https://github.com/Buried-Games-Studio",
    "https://wa.me/96555528686"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+96555528686",
    "contactType": "Customer Support",
    "availableLanguage": ["en", "ar"]
  }
};

const siteTitle: Record<Locale, { default: string; template: string }> = {
  en: {
    default: 'Buried Games Studio | Crafting Worlds, One Game at a Time',
    template: '%s | Buried Games Studio',
  },
  ar: {
    default: 'استوديو بريد جيمز | نصنع عوالم، لعبة تلو الأخرى',
    template: '%s | استوديو بريد جيمز',
  },
};

const siteDescription: Record<Locale, string> = {
  en: 'Buried Games Studio is an indie game development studio specializing in multiplayer games, trivia apps, and interactive digital experiences. Explore our games, services, and devlogs.',
  ar: 'استوديو بريد جيمز هو استوديو مستقل لتطوير الألعاب متخصص في الألعاب الجماعية وتطبيقات التريفيا والتجارب الرقمية التفاعلية. اكتشف ألعابنا وخدماتنا ومدونة التطوير.',
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
    <html lang={locale} dir={textDirection(locale)} className={`${cairo.variable} ${inter.variable} dark`}>
      <head>
        <link rel="preconnect" href="https://assets.buriedgames.com" />
        <link rel="dns-prefetch" href="https://assets.buriedgames.com" />
        <link rel="preconnect" href="https://cdn-icons-png.flaticon.com" />
        <link rel="dns-prefetch" href="https://cdn-icons-png.flaticon.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground selection:bg-primary/20">
        <LanguageProvider locale={locale}>
          <MotionProvider>
            <SmoothScroll>
              <Suspense>
                <SurveyModal />
              </Suspense>
              <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:start-4 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md">
                {locale === 'ar' ? 'تخطي إلى المحتوى الرئيسي' : 'Skip to main content'}
              </a>
              <div className="relative flex min-h-screen flex-col">
                <Header />
                <FloatingSocials />
                <div id="main-content" className="flex-1 md:px-12">
                  <PageTransition>{children}</PageTransition>
                </div>
                <Footer />
              </div>
              <Toaster />
            </SmoothScroll>
          </MotionProvider>
        </LanguageProvider>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5T83FCTGPZ"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-5T83FCTGPZ');`}
        </Script>
      </body>
    </html>
  );
}
