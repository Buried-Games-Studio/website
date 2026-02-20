import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';

  // Redirect www → non-www
  if (hostname.startsWith('www.')) {
    url.host = hostname.replace('www.', '');
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Run on all paths except static files and _next internals
    '/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|fonts/).*)',
  ],
};
