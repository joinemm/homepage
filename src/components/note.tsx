type Props = {
  title: string;
};

const Note = ({ title }: Props) => {
  return <span className="accent font-bold">{title}</span>;
};

export default Note;
