import { NextResponse } from 'next/server';

// This will serve an SVG version of the logo as the favicon.
// It's a simple representation and can be customized.
export async function GET() {
  const svg = `
<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M50 0L93.3 25V75L50 100L6.7 75V25L50 0Z" fill="#171717"/>
  <path d="M36.5 68V32H50.5C55.1 32 58.65 33.15 61.15 35.45C63.65 37.75 64.9 40.8 64.9 44.6C64.9 48.4 63.65 51.45 61.15 53.75C58.65 56.05 55.1 57.2 50.5 57.2H42.5V68H36.5ZM42.5 51.5H50.1C52.7 51.5 54.725 50.875 56.175 49.625C57.625 48.375 58.35 46.65 58.35 44.45C58.35 42.25 57.625 40.525 56.175 39.275C54.725 38.025 52.7 37.4 50.1 37.4H42.5V51.5Z" fill="#cc0000"/>
</svg>
  `;
  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
