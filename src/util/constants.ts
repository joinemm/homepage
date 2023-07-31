const vercel_public_domain = process.env.NEXT_PUBLIC_DOMAIN;
const vercel_public_url = process.env.NEXT_PUBLIC_VERCEL_URL;

// if Vercel prod deployment, then use main domain; else use temporary domain unless you're on dev
export const DOMAIN = vercel_public_domain
  ? vercel_public_domain
  : vercel_public_url
  ? `https://${vercel_public_url}`
  : 'http://127.0.0.1:3000';

export const PAGE_WIDTH = 40;
export const CDN_DOMAIN = "'https://cdn.joinemm.dev"
