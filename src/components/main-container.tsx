import Header from './header';

const MainContainer = (props) => {
  return (
    <article className="m-auto mt-12 max-w-2xl p-4">
      <Header />
      {props.children}
    </article>
  );
};

export default MainContainer;
