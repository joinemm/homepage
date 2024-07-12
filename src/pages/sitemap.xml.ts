import { DOMAIN } from '../util/constants';
import { getSortedPostsData } from '../util/posts';

function location(path: string) {
  return `
       <url>
           <loc>${path}</loc>
       </url>
     `;
}

function generateSiteMap(pages: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${DOMAIN}</loc>
     </url>
     ${pages.map((path) => location(DOMAIN + path)).join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const posts = getSortedPostsData(true);
  const postPaths = posts.map((post) => `/blog/${post.slug}`);
  const staticPaths = ['/about', '/blog', '/art', '/uses'];

  const sitemap = generateSiteMap(postPaths.concat(staticPaths));

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
