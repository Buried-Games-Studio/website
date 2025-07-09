
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack(config) {
    // This rule is to specifically handle image files with uppercase extensions like .JPG
    // which can cause "Unknown module type" errors in some environments.
    config.module.rules.push({
      test: /\.(jpe?g|png|gif|svg|JPG)$/i,
      type: 'asset/resource',
    });
    return config;
  },
};

export default nextConfig;
