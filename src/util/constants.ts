// configured in vercel env variables
const vercel_url = process.env.DOMAIN;
export const DOMAIN = vercel_url ? vercel_url : 'http://127.0.0.1:3000';

export const PAGE_WIDTH = 40;
export const ANALYTICS_DOMAIN = 'traffic.joinemm.dev';
export const SITE_NAME = 'joinemm.dev';
