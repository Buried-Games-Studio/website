import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // Block WordPress/PHP vulnerability scanners — return 403 without rendering
  if (pathname.endsWith('.php') || pathname.endsWith('.asp') || pathname.endsWith('.aspx') || pathname.endsWith('.env') || pathname.endsWith('.git')) {
    return new NextResponse(null, { status: 403 });
  }

  const hostname = request.headers.get('host') || '';

  const isWww = hostname.startsWith('www.');
  const hasTrailingSlash =
    pathname.length > 1 && pathname.endsWith('/');
  const hasJunkParams = url.searchParams.has('s');

  // Consolidate www removal + trailing slash strip + junk param strip into a single redirect
  if (isWww || hasTrailingSlash || hasJunkParams) {
    if (isWww) {
      url.host = hostname.replace('www.', '');
    }
    if (hasTrailingSlash) {
      url.pathname = url.pathname.replace(/\/+$/, '');
    }
    if (hasJunkParams) {
      url.searchParams.delete('s');
    }
    return NextResponse.redirect(url, 308);
  }

  // Locale routing: /ar/* serves the Arabic tree; every other page route is
  // rewritten internally to /en/* so English stays unprefixed at the root.
  // (/en/* external requests are stripped back to / by next.config redirects.)
  const isArabicTree = pathname === '/ar' || pathname.startsWith('/ar/');
  const hasFileExtension = /\.[^/]+$/.test(pathname);
  if (
    !isArabicTree &&
    !pathname.startsWith('/api/') &&
    !pathname.startsWith('/_next/') &&
    !hasFileExtension
  ) {
    url.pathname = pathname === '/' ? '/en' : `/en${pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths so www → non-www redirect works for static assets too
    '/(.*)',
  ],
};
