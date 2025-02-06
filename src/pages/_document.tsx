import { Html, Head, Main, NextScript } from 'next/document';
import { ANALYTICS_DOMAIN, SITE_NAME, DOMAIN, MASTODON } from '../util/constants';
import { mediaStyles } from '../util/media-context';

export default function Document() {
  return (
    <Html lang="en" className="text-[18px]">
      <Head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Joinemm.dev RSS"
          href={DOMAIN + '/rss.xml'}
        />
        <link rel="me" href={`https://${MASTODON}/@joinemm`} />
        <style type="text/css" dangerouslySetInnerHTML={{ __html: mediaStyles }} />
        <script
          defer
          data-domain={SITE_NAME}
          src={`https://${ANALYTICS_DOMAIN}/visit.js`}
        ></script>
      </Head>
      <body className="bg-primary fg-primary max-w-[100vw] overflow-x-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
