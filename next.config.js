/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: 'default',
    remotePatterns: [
      { hostname: '**.joinemm.dev' },
      // for movie cover images
      { hostname: 'm.media-amazon.com', pathname: '/images/**' },
    ],
  },
  experimental: {
    outputFileTracingIncludes: {
      '/blog/[slug]': ['node_modules/shiki/**/*'],
    },
  },
};

module.exports = nextConfig;
