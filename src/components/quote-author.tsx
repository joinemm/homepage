type Props = {
  name: string;
};

const QuoteAuthor = ({ name }: Props) => {
  return (
    <p className="m-0 pl-8 text-[var(--tw-prose-quotes)]">
      — <cite>{name}</cite>
    </p>
  );
};

export default QuoteAuthor;
