import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/contexts/language-context';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import { DynamicSEO } from '@/components/seo';

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
  title: 'Buried Games Studio',
  description: 'The official website for Buried Games studio.',
  authors: [{ name: 'Buried Games Studio', url: 'https://buriedgames.com' }],
  themeColor: '#000000',
  openGraph: {
    siteName: 'Buried Games Studio',
    title: 'Buried Games Studio',
    description: 'The official website for Buried Games studio.',
    url: 'https://buriedgames.com',
    images: [
      {
        url: 'https://buriedgames.com/assets/images/buriedgames_logo.png',
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
    images: ['https://buriedgames.com/assets/images/buriedgames_logo.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground selection:bg-primary/20">
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
