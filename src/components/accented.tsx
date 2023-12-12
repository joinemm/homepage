type Props = {
  text: string;
};

const Accented = ({ text }: Props) => {
  return <span className="accent">{text}</span>;
};

export default Accented;
