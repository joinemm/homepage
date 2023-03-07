type Props = {
  children: any;
  title?: string;
};

const Aside = ({ children, title }: Props) => {
  return (
    <aside className="muted-border clear-both rounded-lg border-l-2 p-4 max-xl:border-2 xl:absolute xl:left-[calc(50%+336px)] xl:max-w-xs xl:-translate-y-full xl:rounded-none">
      {title && <p className="accent m-0 -mt-2">{title}</p>}
      {children}
    </aside>
  );
};

export default Aside;
