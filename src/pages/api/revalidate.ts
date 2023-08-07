import { NextApiRequest, NextApiResponse } from 'next/types';

type Data = {
  event: string;
  payload: any;
  keys: string[];
  collection: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (
    !req.headers['x-webhook-secret'] ||
    req.headers['x-webhook-secret'] !== process.env.REVALIDATE_SECRET
  ) {
    return res.status(403).send('Forbidden');
  }

  const data: Data = req.body;

  switch (data.collection) {
    case 'blog_post': {
      for (const slug of data.keys) {
        await res.revalidate(`/blog/${slug}`);
      }
      await res.revalidate('/blog');
      return res
        .status(200)
        .json({ revalidated: ['/blog', ...data.keys.map((slug) => `/blog/${slug}`)] });
    }
    case 'art': {
      await res.revalidate('/art');
      return res.status(200).json({ revalidated: '/art' });
    }
    case 'movie_review': {
      await res.revalidate('/reviews');
      return res.status(200).json({ revalidated: '/reviews' });
    }
    default: {
      return res.status(501).json({ error: 'this collection is not implemented yet!' });
    }
  }
};

export default handler;
