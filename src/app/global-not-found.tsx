import './globals.css';
import type { Metadata } from 'next';
import { NotFoundView } from '@/components/not-found-view';

// Next 16: global-not-found owns the whole document for every 404 — both
// unmatched URLs and notFound() thrown anywhere (the [locale] tree included).
export const metadata: Metadata = {
  title: '404 | Buried Games Studio',
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="en" dir="ltr" className="dark">
      <body className="font-body antialiased bg-background text-foreground">
        <NotFoundView />
      </body>
    </html>
  );
}
