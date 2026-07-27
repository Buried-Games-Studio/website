
import type {NextConfig} from 'next';

const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
];

const nextConfig: NextConfig = {
  // Trailing slashes are stripped by src/proxy.ts in the same 308 that folds
  // www/junk-params/legacy-/en — the built-in redirect would otherwise fire
  // first and turn /en/ into a two-hop chain (/en/ → /en → /).
  skipTrailingSlashRedirect: true,
  experimental: {
    // Custom branded 404 document: nested not-found boundaries don't catch
    // thrown notFound() under a dynamic root segment ([locale]) in Next 16.
    globalNotFound: true,
    // Tree-shake barrel imports so icon/animation libs only ship what each
    // page actually uses (lucide-react alone is ~1MB unshaken).
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    // Inline the ~22KB of CSS into the HTML: the two stylesheet requests were
    // the last render-blocking round-trips in the critical path.
    inlineCss: true,
  },
  images: {
    // Cloudflare Image Transformations instead of the built-in optimizer:
    // Firebase App Hosting's adapter disables /_next/image at build time, so
    // production shipped original multi-MB assets. The custom loader rewrites
    // every next/image src to /cdn-cgi/image (resize + AVIF/WebP at the edge).
    loader: 'custom',
    loaderFile: './src/lib/cloudflare-image-loader.ts',
  },
  async redirects() {
    return [
      // Strip /en locale prefix → root path
      {
        source: '/en',
        destination: '/',
        permanent: true,
      },
      {
        source: '/en/:path*',
        destination: '/:path*',
        permanent: true,
      },
      // Legacy .html URLs → clean Next.js routes
      {
        source: '/terms.html',
        destination: '/terms-of-use',
        permanent: true,
      },
      {
        source: '/404.html',
        destination: '/',
        permanent: false,
      },
      // Strip index.html from game URLs
      {
        source: '/games/:slug/index.html',
        destination: '/games/:slug',
        permanent: true,
      },
      // Orphaned /release-notes → /devlog
      {
        source: '/release-notes',
        destination: '/devlog',
        permanent: true,
      },
      // NOTE: there is deliberately no /fonts/:path* redirect. One existed
      // (5d5cf90) to mop up the 404s left when the wordmark font moved to R2
      // in 4eb5dca. The font is served from public/fonts/ again — the R2 host
      // sends no Access-Control-Allow-Origin, so a cross-origin webfont was
      // blocked outright — and that redirect swallowed it, answering a font
      // request with the homepage. Redirecting an asset to HTML was the wrong
      // shape anyway: a missing asset should 404.
      // Malformed URL from external broken link
      {
        source: '/&',
        destination: '/',
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
