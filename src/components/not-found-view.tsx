'use client';

import { useEffect, useState } from 'react';
import { Home } from 'lucide-react';

const copy = {
  en: {
    code: '404',
    title: 'Page not found',
    message: 'The page you are looking for does not exist. It might have been moved or deleted.',
    cta: 'Go back to homepage',
    home: '/',
  },
  ar: {
    code: '٤٠٤',
    title: 'الصفحة غير موجودة',
    message: 'الصفحة التي تبحث عنها غير موجودة. ربما تم نقلها أو حذفها.',
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
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden text-center">
      <div className="absolute left-1/2 top-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
      <div className="container flex max-w-xl flex-col items-center gap-5 px-6">
        <span className="font-headline text-7xl font-bold tracking-tight text-primary md:text-8xl">
          {t.code}
        </span>
        <h1 className="font-headline text-2xl font-bold tracking-tight text-foreground md:text-4xl">
          {t.title}
        </h1>
        <p className="max-w-md text-foreground/65 leading-relaxed">{t.message}</p>
        <a
          href={t.home}
          className="group mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90"
        >
          <Home className="h-4 w-4" />
          {t.cta}
        </a>
      </div>
    </main>
  );
}
