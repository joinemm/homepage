type Props = {
  name: string;
};

const Quote = (props) => {
  return (
    <blockquote className="mt-10">
      <span className="absolute -translate-y-7 -translate-x-5 text-7xl tracking-[-0.15em]">“</span>
      {props.children}
    </blockquote>
  );
};

export default Quote;
