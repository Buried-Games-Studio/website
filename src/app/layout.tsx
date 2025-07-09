
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LanguageProvider } from '@/contexts/language-context';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import { DynamicSEO } from '@/components/seo';
import { Suspense } from 'react';
import { FirebaseAnalytics } from '@/components/firebase-analytics';
import logoImage from '@/components/images/buriedgames_logo.png';
import { Cairo, Orbitron } from 'next/font/google';

const cairo = Cairo({
    subsets: ['arabic', 'latin'],
    weight: ['400', '700'],
    variable: '--font-cairo',
});

const orbitron = Orbitron({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-orbitron',
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
        "contactType": "Customer Service",
        "areaServed": "KW",
        "availableLanguage": ["en", "ar"]
    }
};

export const metadata: Metadata = {
  metadataBase: new URL('https://buriedgames.com'),
  title: {
    template: '%s | Buried Games Studio',
    default: 'Buried Games Studio | Crafting Worlds, One Game at a Time',
  },
  description: 'The official website for Buried Games studio.',
  authors: [{ name: 'Buried Games Studio', url: 'https://buriedgames.com' }],
  icons: {
    icon: logoImage.src,
    shortcut: logoImage.src,
    apple: logoImage.src,
  },
  openGraph: {
    title: 'Buried Games Studio',
    siteName: 'Buried Games Studio',
    description: 'The official website for Buried Games studio.',
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
    alternateLocale: ['ar_KW'],
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Buried Games Studio',
    description: 'The official website for Buried Games studio.',
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
    <html lang="en" className={`${cairo.variable} ${orbitron.variable} dark`}>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @font-face {
                font-family: 'afolkalips';
                src: url('/fonts/afolkalips.woff2') format('woff2');
                font-weight: normal;
                font-style: normal;
                font-display: swap;
              }
            `,
          }}
        />
        <link rel="preconnect" href="https://firebaseinstallations.googleapis.com" />
        <link
          rel="preload"
          href="/fonts/afolkalips.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground selection:bg-primary/20">
        <Suspense>
          <FirebaseAnalytics />
        </Suspense>
        <LanguageProvider>
          <DynamicSEO />
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
