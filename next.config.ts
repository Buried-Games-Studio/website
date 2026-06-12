
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
      // Legacy font files (no longer served from /fonts/)
      {
        source: '/fonts/:path*',
        destination: '/',
        permanent: false,
      },
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
