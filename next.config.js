/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: 'default',
    domains: ['m.media-amazon.com', 'directus.joinemm.dev'],
  },
};

module.exports = nextConfig;
