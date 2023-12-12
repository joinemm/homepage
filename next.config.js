/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: 'default',
    remotePatterns: [
      { hostname: '**.joinemm.dev' },
    ],
  },
  experimental: {
    outputFileTracingIncludes: {
      '/blog/[slug]': ['node_modules/shiki/**/*'],
    },
  },
  compiler: {
    removeConsole: false,
  },
};

module.exports = nextConfig;
