import RSS from 'rss';
import { DOMAIN } from '../util/constants';
import { getSortedPostsData, MetaData } from '../util/posts';

function generateRssFeed(posts: MetaData[]): RSS {
  const feed = new RSS({
    title: 'Joinemm.dev',
    DOMAIN: DOMAIN,
    feed_url: `${DOMAIN}/rss.xml`,
    image_url: `${DOMAIN}/icon.svg`,
    pubDate: new Date(),
    copyright: `${new Date().getFullYear()}, Joinemm`,
  });

  posts.map((post: MetaData) => {
    feed.item({
      guid: post.slug,
      title: post.title,
      description: post.abstract,
      date: post.date,
      categories: post.tags,
      author: 'Joinemm',
      url: `${DOMAIN}/blog/${post.slug}`,
      enclosure: post.image
        ? {
            url: '/img/blog/' + post.image,
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
  const posts = getSortedPostsData();
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
