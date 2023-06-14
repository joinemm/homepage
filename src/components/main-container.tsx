import Header from './header';
import { PAGE_WIDTH } from '../util/constants';
import Footer from './footer';
import { PropsWithChildren } from 'react';

type Props = {
  width?: number;
};

const MainContainer = (props: PropsWithChildren<Props>) => {
    return (
    <>
      <article
        className="m-auto flex min-h-screen flex-col px-2"
        style={{ maxWidth: props.width ?? PAGE_WIDTH }}
      >
        <Header />
        <div className="flex-grow">{props.children}</div>
        <Footer />
      </article>
    </>
  );
};

export default MainContainer;
