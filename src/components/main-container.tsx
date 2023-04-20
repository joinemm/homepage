import Header from './header';
import { PAGE_WIDTH } from '../util/constants';

const MainContainer = (props) => {
  return (
    <>
      <article className="m-auto p-4" style={{ maxWidth: PAGE_WIDTH }}>
        <Header />
        {props.children}
      </article>
    </>
  );
};

export default MainContainer;
