import { NextResponse } from 'next/server';

// This will serve an SVG version of the logo as the favicon.
// It's a simple representation and can be customized.
export async function GET() {
  const svg = `
<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" rx="20" fill="#171717" />
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="70" font-weight="bold" fill="#cc0000" dy=".1em">B</text>
</svg>
  `;
  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
