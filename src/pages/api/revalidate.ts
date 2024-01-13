import { NextApiRequest, NextApiResponse } from 'next/types';

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
  let paths: string[] = [];
  const [collection, ...rest] = data.event.split('.');
  const event = rest.join('.');

  switch (collection) {
    case 'blog_post': {
      await refresh(res, '/blog', paths);
      await refresh(res, '/rss.xml', paths);

      switch (event) {
        case 'items.create':
        case 'items.update':
        case 'items.delete': {
          for (const slug of data.keys) {
            await refresh(res, `/blog/${slug}`, paths);
          }
          break;
        }
        default: {
          return res
            .status(501)
            .json({ error: `'${event}' for '${collection}' is not implemented yet!` });
        }
      }
      break;
    }

    case 'art': {
      await refresh(res, '/art', paths);
      break;
    }

    default: {
      return res.status(501).json({ error: 'this collection is not implemented yet!' });
    }
  }

  return res.status(200).json({
    revalidated: paths,
  });
};

const refresh = async (res: NextApiResponse, path: string, paths: string[]) => {
  await res.revalidate(path);
  paths.push(path);
};

export default handler;
