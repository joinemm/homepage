export const getBaseurl = () => {
  if (process.env.VERCEL_ENV) {
    return `https://${process.env.VERCEL_URL}`;
  } else {
    return 'http://localhost:3000';
  }
};
