import Header from './header';
import { PAGE_WIDTH } from '../util/constants';
import Footer from './footer';
import { PropsWithChildren } from 'react';

type Props = {
  width?: number;
  classname?: string;
};

const MainContainer = (props: PropsWithChildren<Props>) => {
  const width = props.width ?? PAGE_WIDTH;
  return (
    <>
      <article
        className="m-auto flex min-h-screen flex-col px-2"
        style={{ maxWidth: width + 'rem' }}
      >
        <Header />
        <div className={'mt-2 flex-grow ' + (props.classname ? props.classname : '')}>
          {props.children}
        </div>
        <Footer />
      </article>
    </>
  );
};

export default MainContainer;
