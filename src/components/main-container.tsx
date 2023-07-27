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
            className="sticky top-0 serif text-5xl mx-auto my-0 h-0 w-4 tracking-wide"
            style={{
              transform: `translateX(${
                width / 2 + 3.5
              }rem) translateY(1rem) rotate(90deg)`,
            }}
          >
            JOINEMM
          </p>
        </Media>
        <div
          className={'flex-grow mt-2 ' + (props.classname ? props.classname : '')}
        >
          {props.children}
        </div>
        <Footer />
      </article>
    </>
  );
};

export default MainContainer;
