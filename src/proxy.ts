import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';

  const isWww = hostname.startsWith('www.');
  const hasTrailingSlash =
    url.pathname.length > 1 && url.pathname.endsWith('/');
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

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths so www → non-www redirect works for static assets too
    '/(.*)',
  ],
};
