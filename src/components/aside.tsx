type Props = {
  children: any;
  title?: string;
};

const Aside = ({ children, title }: Props) => {
  return (
    <aside className="muted-border clear-both rounded-lg border-2 px-4 text-sm">
      {title && <p className="accent m-0 -mt-2">{title}</p>}
      {children}
    </aside>
  );
};

export default Aside;
