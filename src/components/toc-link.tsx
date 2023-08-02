import Link from 'next/link';
import { Heading } from '../util/extract-headings';

type Props = { node: Heading; visibleHeadings: Set<string> };

const styles = [
  {},
  {},
  {},
  { marginLeft: '38.5px' }, //, fontSize: '0.875rem' },
  { marginLeft: '77px' }, //, fontSize: '0.75rem' },
];

const TOCLink = ({ node, visibleHeadings }: Props) => {
  const inView = visibleHeadings.has(node.id);
  return (
    <li className="py-1 " style={styles[node.rank]}>
      <Link
        href={'#' + node.id}
        className={
          'toc-heading fg-muted mono ml-3 no-underline transition-all' +
          (inView ? ' active-heading highlight pl-1' : '')
        }
      >
        {node.title}
      </Link>
      {node.children && (
        <ul>
          {node.children.map((child) => (
            <TOCLink node={child} key={child.id} visibleHeadings={visibleHeadings} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TOCLink;
