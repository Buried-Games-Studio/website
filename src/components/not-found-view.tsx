'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle, Home } from 'lucide-react';

const copy = {
  en: {
    title: '404 - Page Not Found',
    message: 'Oops! The page you are looking for does not exist. It might have been moved or deleted.',
    cta: 'Go back to Homepage',
    home: '/',
  },
  ar: {
    title: '٤٠٤ - الصفحة غير موجودة',
    message: 'عفوًا! الصفحة التي تبحث عنها غير موجودة. ربما تم نقلها أو حذفها.',
    cta: 'العودة إلى الصفحة الرئيسية',
    home: '/ar',
  },
} as const;

/**
 * Rendered by global-not-found outside the [locale] tree, so the locale is
 * derived from the URL on the client (404s are noindex — no SEO surface).
 */
export function NotFoundView() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');

  useEffect(() => {
    const { pathname } = window.location;
    if (pathname === '/ar' || pathname.startsWith('/ar/')) {
      setLang('ar');
      document.documentElement.lang = 'ar';
      document.documentElement.dir = 'rtl';
    }
  }, []);

  const t = copy[lang];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-center">
      <div className="container flex flex-col items-center gap-4 px-6">
        <AlertTriangle className="h-16 w-16 text-destructive" />
        <h1 className="text-4xl font-bold tracking-wide sm:text-5xl font-headline !leading-tight" style={{ letterSpacing: '0.05em' }}>
          {t.title}
        </h1>
        <p className="max-w-md text-muted-foreground">{t.message}</p>
        <a
          href={t.home}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Home className="me-2 h-4 w-4" />
          {t.cta}
        </a>
      </div>
    </main>
  );
}
