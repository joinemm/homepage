import Header from './header';
import { Media } from '../util/media-context';
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

        <Media greaterThanOrEqual="fullwidth" className="my-auto">
          <p
            className="serif sticky top-0 mx-auto my-0 h-0 w-4 text-5xl tracking-wide"
            style={{
              transform: `translateX(${
                width / 2 + 3.5
              }rem) translateY(1rem) rotate(90deg)`,
            }}
          >
            JOINEMM
          </p>
        </Media>
        <div className={'mt-2 flex-grow ' + (props.classname ? props.classname : '')}>
          {props.children}
        </div>
        <Footer />
      </article>
    </>
  );
};

export default MainContainer;
