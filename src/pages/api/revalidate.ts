import { NextApiRequest, NextApiResponse } from 'next/types';
import { revalidatePath } from 'next/cache';

type Data = {
  event: string;
  payload: any;
  keys: string[];
  key: string;
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

  switch (data.event) {
    case 'blog_post.items.create': {
      await res.revalidate('/blog');
      revalidatePath('/blog/[slug]');
      return res.status(200).json({ revalidated: ['/blog', `/blog/[slug]`] });
    }
    case 'blog_post.items.update': {
      for (const slug of data.keys) {
        await res.revalidate(`/blog/${slug}`);
      }
      await res.revalidate('/blog');
      return res
        .status(200)
        .json({ revalidated: ['/blog', ...data.keys.map((slug) => `/blog/${slug}`)] });
    }
    case 'art.items.update': {
      await res.revalidate('/art');
      return res.status(200).json({ revalidated: '/art' });
    }
    default: {
      return res.status(501).json({ error: 'this collection is not implemented yet!' });
    }
  }
};

export default handler;
