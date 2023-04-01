import Header from './header';

const MainContainer = (props) => {
  return (
    <article className="m-auto max-w-[768px] p-4">
      <Header />
      {props.children}
    </article>
  );
};

export default MainContainer;
