import { Html, Head, Main, NextScript } from 'next/document';
import { ANALYTICS_DOMAIN } from '../util/constants';
import { mediaStyles } from '../util/media-context';

export default function Document() {
  return (
    <Html lang="en" className="fg-primary text-[18px]">
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css"
        />
        <style type="text/css" dangerouslySetInnerHTML={{ __html: mediaStyles }} />
        <script
          defer
          data-domain={ANALYTICS_DOMAIN}
          src={`https://${ANALYTICS_DOMAIN}/pls.js`}
        ></script>
      </Head>
      <body className="bg-primary fg-primary max-w-[100vw] overflow-x-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
