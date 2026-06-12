import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Fail-closed indexability gate: only the canonical production host may be
// indexed. Anything else (App Hosting preview channels, *.web.app, localhost)
// gets X-Robots-Tag: noindex so non-prod deployments never leak into Google.
const CANONICAL_HOST = 'buriedgames.com';

function withIndexabilityGate(
  response: NextResponse,
  hostname: string,
): NextResponse {
  if (hostname !== CANONICAL_HOST) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }
  return response;
}

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // Block vulnerability scanners (secret/config probing) — fast 403, no render.
  // Covers dotfiles (.env, .env.prod, .git, .aws/credentials, .stripe, ...) in
  // any path segment plus server-side script probes. /.well-known/ stays allowed.
  const isDotfileProbe = pathname
    .split('/')
    .some((segment) => segment.startsWith('.') && segment !== '.well-known');
  const isScriptProbe = /\.(php|asp|aspx|git|env)$/.test(pathname);
  if (isDotfileProbe || isScriptProbe) {
    return new NextResponse(null, { status: 403 });
  }

  const hostname = request.headers.get('host') || '';

  const isWww = hostname.startsWith('www.');
  const hasTrailingSlash =
    pathname.length > 1 && pathname.endsWith('/');
  const hasJunkParams = url.searchParams.has('s');
  // External /en URLs are legacy (English lives unprefixed at the root).
  // next.config redirects bare /en, but /en/ would otherwise take two hops
  // (slash strip → /en, then /en → /); folding it here keeps one redirect.
  const hasEnPrefix = pathname === '/en' || pathname.startsWith('/en/');

  // Consolidate www removal + trailing slash strip + junk param strip +
  // legacy /en strip into a single redirect — never chain hops.
  if (isWww || hasTrailingSlash || hasJunkParams || hasEnPrefix) {
    if (isWww) {
      url.host = hostname.replace('www.', '');
    }
    if (hasEnPrefix) {
      url.pathname = url.pathname.replace(/^\/en(?=\/|$)/, '') || '/';
    }
    if (url.pathname.length > 1 && url.pathname.endsWith('/')) {
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
    return withIndexabilityGate(NextResponse.rewrite(url), hostname);
  }

  return withIndexabilityGate(NextResponse.next(), hostname);
}

export const config = {
  matcher: [
    // Match all paths so www → non-www redirect works for static assets too
    '/(.*)',
  ],
};
