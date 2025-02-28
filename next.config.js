const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {},
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        pathname: '/**',
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    config.resolve.fallback = {
      fs: false,
    };
    return config;
  },
  env: {
    BACKEND_API_URL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
  },
};

module.exports = nextConfig;
