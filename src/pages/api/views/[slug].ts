import type { NextApiRequest, NextApiResponse } from 'next';
import { ANALYTICS_DOMAIN, SITE_NAME } from '../../../util/constants';
import { fetcher } from '../../../util/fetcher';

const now = new Date();
const [nowDate] = now.toISOString().split('T');

type Data = {
  date?: string;
  views?: number;
  err?: unknown;
};

const viewsHandler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { slug } = req.query;
  if (!slug) {
    return res.status(400).json({ err: 'Not Found' });
  }
  try {
    const data = await getPlausibleViews(String(slug));
    return res.status(200).json({
      date: now.toUTCString(),
      views: data?.results?.visitors?.value,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err });
  }
};

async function getPlausibleViews(slug: string) {
  const url = `https://${ANALYTICS_DOMAIN}/api/v1/stats/aggregate?site_id=${SITE_NAME}&period=custom&date=2023-03-26,${nowDate}&filters=event:page==/blog/${slug}`;

  const headers = {
    Authorization: `Bearer ${process.env.PLAUSIBLE_API_KEY}`,
    Accept: 'application/json',
  };

  return fetcher(url, { headers });
}

export default viewsHandler;
