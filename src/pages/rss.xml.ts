import RSS from 'rss';
import { DOMAIN } from '../util/constants';
import { BlogPost, getAssetUrl, getBlogPosts } from '../util/content-manager';

function generateRssFeed(posts: BlogPost[]): RSS {
  const feed = new RSS({
    title: 'Joinemm.dev',
    DOMAIN: DOMAIN,
    feed_url: `${DOMAIN}/rss.xml`,
    image_url: `${DOMAIN}/icon.svg`,
    pubDate: new Date(),
    copyright: `${new Date().getFullYear()}, Joinemm`,
  });

  posts.map((post: BlogPost) => {
    feed.item({
      guid: post.slug,
      title: post.title,
      description: post.excerpt,
      date: post.date_created,
      categories: post.tags,
      author: 'Joinemm',
      url: `${DOMAIN}/blog/${post.slug}`,
      enclosure: post.image
        ? {
            url: getAssetUrl(post.image.id, 'header'),
          }
        : null,
    });
  });

  return feed;
}

function RssFeed() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const posts = await getBlogPosts();
  const feed = generateRssFeed(posts);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(feed.xml({ indent: true }));
  res.end();

  return {
    props: {},
  };
}

export default RssFeed;
