import Link from 'next/link';
import { Heading } from '../util/extract-headings';

type Props = {
  node: Heading;
  visibleHeadings: Set<string>;
  itemSize: number;
};

const TOCLink = ({ node, visibleHeadings, itemSize }: Props) => {
  const styles = [
    {},
    {},
    {},
    { marginLeft: `${itemSize}px`, fontSize: '0.875rem' },
    { marginLeft: `${itemSize * 2}px`, fontSize: '0.875rem' },
  ];
  const highlighted = visibleHeadings.has(node.id);
  return (
    <li style={styles[node.rank]}>
      <Link
        href={'#' + node.id}
        style={{ lineHeight: `${itemSize}px` }}
        className={
          'toc-heading fg-muted ml-3 no-underline transition-all hover:underline' +
          (highlighted ? ' active-heading highlight pl-1' : '')
        }
      >
        {node.title}
      </Link>
    </li>
  );
};

export default TOCLink;
