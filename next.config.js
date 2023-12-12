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
    //largePageDataBytes: 128 * 1000, // 128KB by default
    largePageDataBytes: 128 * 10000,
  },
  compiler: {
    removeConsole: false,
  },
};

module.exports = nextConfig;
