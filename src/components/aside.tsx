type Props = {
  children: any;
  title?: string;
};

const Aside = ({ children, title }: Props) => {
  return (
    <aside className="accent-border clear-both rounded-lg border-l-2 p-4 max-xl:border-2 xl:absolute xl:left-[calc(50%+336px)] xl:max-w-xs xl:-translate-y-full xl:rounded-none">
      {title && <p className="accent m-0 -mt-2">{title}</p>}
      {children}
    </aside>
  );
};

export default Aside;

// @media (max-width: 1279px) {
//   aside {
//     padding: 1rem;
//     border-radius: 0.5rem;
//     border: 1px solid var(--accent-color);
//     font-size: 0.9rem;
//     margin-bottom: 1rem;
//     text-align: left;
//   }
// }

// @media (min-width: 1280px) {
//   aside {
//     position: absolute;
//     left: calc(50% + 400px);
//     transform: translateY(calc(-100% - 1rem));
//     border-left: 3px solid var(--accent-color);
//     border-bottom: 3px solid var(--accent-color);
//     padding-bottom: 1rem;
//     padding-left: 1rem;
//     margin-right: 0.5rem;
//     max-width: 300px;
//     text-align: left;
//     clear: both;
//   }
// }

// aside::before {
//   content: 'Note [' attr(note) ']:';
//   display: block;
//   color: var(--accent-color);
//   margin-bottom: 0.5em;
// }
