import { Html, Head, Main, NextScript } from 'next/document';
import { ANALYTICS_DOMAIN, SITE_NAME } from '../util/constants';
import { mediaStyles } from '../util/media-context';

export default function Document() {
  return (
    <Html lang="en" className="text-[18px]">
      <Head>
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
