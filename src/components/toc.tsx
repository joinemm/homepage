import { PAGE_WIDTH } from '../util/constants';
import { Heading } from '../util/extract-headings';
import TOCLink from './toc-link';
import { useEffect, useState } from 'react';

type PathCommand = [string, number, number];

type Props = { headings: Heading[] };

const TOC = ({ headings }: Props) => {
  const [visibleHeadings, setVisibleHeadings] = useState(new Set<string>());

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const id = (e.target as HTMLElement).dataset.id;
        if (id !== undefined) {
          e.isIntersecting ? visibleHeadings.add(id) : visibleHeadings.delete(id);
        }
      });
      setVisibleHeadings(new Set(visibleHeadings));
    });
    document.querySelectorAll('.toc-tracker').forEach((el) => {
      observer.observe(el);
    });
  }, []);

  const itemSize = 35;
  const xOffSet = 5;

  // begin path
  let path: PathCommand[] = [['M', xOffSet, 0]];

  let visiblePathStart: null | number = null;
  let visiblePathEnd: null | number = null;
  let pathTotalLength = 0;
  let currentIndent = xOffSet;

  headings.forEach((item, i) => {
    const x = (item.rank - 2) * itemSize + xOffSet;
    const y = i * itemSize;
    let itemPathLength = 0;

    // if going down an indent level, draw horizontal line
    if (currentIndent !== x) {
      path.push(['L', currentIndent, y]);
      itemPathLength += itemSize;
    }
    // draw line from top to bottom of item
    path.push(['L', x, y], ['L', x, y + itemSize]);
    itemPathLength += itemSize;

    // start or end visible path portion
    if (visibleHeadings.size > 0) {
      if (visibleHeadings.has(item.id)) {
        if (visiblePathStart === null) visiblePathStart = pathTotalLength;
      } else if (visiblePathEnd === null && visiblePathStart !== null) {
        visiblePathEnd = pathTotalLength;
      }
    }

    pathTotalLength += itemPathLength;
    currentIndent = x;
  });

  // fix top and bottom of the list
  if (visiblePathStart !== null && visiblePathEnd === null) {
    visiblePathEnd = pathTotalLength;
  } else if (visiblePathEnd !== null && visiblePathStart === null) {
    visiblePathStart = 0;
  }

  return (
    <div
      className="fixed top-1/2 ml-14"
      style={{
        transform: `translateX(${PAGE_WIDTH}rem) translateY(-50%)`,
      }}
    >
      <svg
        className="toc-line pointer-events-none absolute h-full"
        stroke="#ffffff"
        fill="#00000000"
        strokeWidth={4}
      >
        {visiblePathStart !== null && visiblePathEnd !== null && (
          <path
            d={path.flat().join(' ')}
            opacity={visibleHeadings.size > 0 ? '1' : '0'}
            strokeDashoffset="1"
            strokeDasharray={`1, ${visiblePathStart}, ${
              visiblePathEnd - visiblePathStart
            }, ${pathTotalLength}`}
          />
        )}
      </svg>
      <ul>
        {headings.map((heading) => (
          <TOCLink
            node={heading}
            key={heading.id}
            itemSize={itemSize}
            visibleHeadings={visibleHeadings}
          />
        ))}
      </ul>
    </div>
  );
};

export default TOC;
