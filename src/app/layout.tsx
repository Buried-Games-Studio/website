
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LanguageProvider } from '@/contexts/language-context';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import { faqSchemaEn } from '@/lib/schemas/faq-schema';
import { Suspense } from 'react';
import logoImage from '@/components/images/buriedgames_logo.png';
import { Cairo, Inter } from 'next/font/google';
import FloatingSocials from '@/components/layout/floating-socials';
import { SurveyModal } from '@/components/survey-modal';
import { SmoothScroll } from '@/components/providers/smooth-scroll';

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
  "foundingDate": "2018-10-01",
  "founder": {
    "@type": "Person",
    "name": "Fahed Alahmad"
  },
  "email": "support@buriedgames.com",
  "url": "https://buriedgames.com",
  "logo": "https://buriedgames.com/assets/images/buriedgames_logo.png",
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

export const metadata: Metadata = {
  metadataBase: new URL('https://buriedgames.com'),
  title: {
    template: '%s | Buried Games Studio',
    default: 'Buried Games Studio | Crafting Worlds, One Game at a Time',
  },
  description: 'Buried Games Studio is an indie game development studio specializing in multiplayer games, trivia apps, and interactive digital experiences. Explore our games, services, and devlogs.',
  authors: [{ name: 'Buried Games Studio', url: 'https://buriedgames.com' }],
  manifest: '/site.webmanifest',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Buried Games Studio',
    siteName: 'Buried Games Studio',
    description: 'Buried Games Studio is an indie game development studio specializing in multiplayer games, trivia apps, and interactive digital experiences.',
    url: '/',
    images: [
      {
        url: logoImage.src,
        width: 200,
        height: 200,
        alt: 'Buried Games Studio Logo',
      },
    ],
    locale: 'en_US',
    alternateLocale: ['ar'],
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Buried Games Studio',
    description: 'Buried Games Studio is an indie game development studio specializing in multiplayer games, trivia apps, and interactive digital experiences.',
    images: [logoImage.src],
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cairo.variable} ${inter.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaEn) }}
        />
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-5T83FCTGPZ"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-5T83FCTGPZ');
            `,
          }}
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground selection:bg-primary/20">
        <LanguageProvider>
          <SmoothScroll>
            <Suspense>
              <SurveyModal />
            </Suspense>
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md">
              Skip to main content
            </a>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <FloatingSocials />
              <div id="main-content" className="flex-1 md:px-12">{children}</div>
              <Footer />
            </div>
            <Toaster />
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
