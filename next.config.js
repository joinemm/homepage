/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingIncludes: {
    '/blog/[slug]': ['node_modules/shiki/**/*'],
  },
  experimental: {
    //largePageDataBytes: 128 * 1000, // 128KB by default
    largePageDataBytes: 128 * 10000,
  },
  compiler: {
    removeConsole: false,
  },
};

module.exports = nextConfig;
