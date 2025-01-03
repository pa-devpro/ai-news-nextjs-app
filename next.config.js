/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = { 
  reactStrictMode: true, 
  experimental: {
    serverActions: {},
  },
  images: {
    unoptimized: true,
  },
  webpack(config, { isServer }) {
      if (!isServer) {
          config.resolve.fallback = {
              ...config.resolve.fallback,
              fs: false,
              module: false,
          };
      }
      return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);