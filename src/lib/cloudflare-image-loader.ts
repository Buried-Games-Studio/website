'use client';

/**
 * Cloudflare Image Transformations loader.
 *
 * Firebase App Hosting's Next.js adapter disables the built-in /_next/image
 * optimizer at build time, so production was shipping original assets
 * (5MB game art rendered at 344px, 1.2MB engine logos at 32px). Routing
 * every next/image through Cloudflare's edge transformer fixes that with
 * zero origin involvement: resized, AVIF/WebP-converted, edge-cached.
 *
 * In dev there is no Cloudflare in front of localhost, so srcs pass through.
 */
export default function cloudflareImageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  if (process.env.NODE_ENV === 'development') {
    return src;
  }
  const params = [
    `width=${width}`,
    `quality=${quality ?? 70}`,
    'format=auto',
    'fit=scale-down',
  ].join(',');
  return `https://buriedgames.com/cdn-cgi/image/${params}/${src}`;
}
