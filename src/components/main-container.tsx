import Header from './header';

const MainContainer = (props) => {
  return (
    <article className="m-auto max-w-2xl p-4 md:mt-12">
      <Header />
      {props.children}
    </article>
  );
};

export default MainContainer;
