import Link from 'next/link';
import { Heading } from '../util/extract-headings';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

type Props = { node: Heading };

const styles = [
  {},
  {},
  {},
  { marginLeft: '1rem', fontSize: '0.875rem' },
  { marginLeft: '2rem', fontSize: '0.75rem' },
];

const TOCLink = ({ node }: Props) => {
  const { ref, inView } = useInView({});
  useEffect(() => {
    const trackedSection = document.querySelector(
      `.toc-tracker[data-id=${node.id}]`,
    );
    ref(trackedSection);
  }, [ref, node.id]);
  return (
    <li className="py-1" style={styles[node.rank]}>
      <Link
        href={'#' + node.id}
        className={
          'toc-heading no-underline ml-3 fg-muted mono' +
          (inView ? ' active-heading highlight' : '')
        }
      >
        {node.title}
      </Link>
      {node.children && (
        <ul>
          {node.children.map((child) => (
            <TOCLink node={child} key={child.id} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TOCLink;
