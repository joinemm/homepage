import { Html, Head, Main, NextScript } from 'next/document';
import { mediaStyles } from '../util/media-context';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <style type="text/css" dangerouslySetInnerHTML={{ __html: mediaStyles }} />
      </Head>
      <body className="bg-primary fg-primary max-w-[100vw] overflow-x-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
