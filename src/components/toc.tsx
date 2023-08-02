import { PAGE_WIDTH } from '../util/constants';
import { Heading } from '../util/extract-headings';
import TOCLink from './toc-link';
import { Line } from 'react-svg-path';
import { useEffect, useRef, useState } from 'react';

type Props = { headings: Heading[] };

const TOC = ({ headings }: Props) => {
  const tocContainerRef = useRef<HTMLDivElement>(null);
  const itemHeight = (tocContainerRef.current?.clientHeight || 0) / headings.length;
  // console.log(itemCount, itemHeight, tocRef);
  const [visibleHeadings, setVisibleHeadings] = useState(new Set<string>());

  useEffect(() => {
    const observer = new IntersectionObserver(callback);
    document.querySelectorAll('.toc-tracker').forEach((el) => {
      observer.observe(el);
    });
  }, []);

  const callback = (entries) => {
    const nowVisible = entries
      .filter((e) => e.isIntersecting)
      .map((e) => e.target.dataset.id);
    const nowHidden = entries
      .filter((e) => !e.isIntersecting)
      .map((e) => e.target.dataset.id);

    console.log('new visibles:', nowVisible);
    console.log('new hiddens:', nowHidden);

    nowVisible.forEach((id) => {
      visibleHeadings.add(id);
    });
    nowHidden.forEach((id) => {
      visibleHeadings.delete(id);
    });

    setVisibleHeadings(new Set(visibleHeadings));
  };

  let path: (string | number)[] = [];
  const indentAmount = itemHeight;
  let pathIndent = 0;
  let pathStart: null | number = null;
  let pathEnd: null | number = null;
  let pathLength = 0;
  let pathAddedHeadings = 0;
  headings.forEach((item, i) => {
    const x = (item.rank - 2) * indentAmount + 5;
    const y = i * itemHeight;

    let thisPathLength = 0;

    if (i == 0) {
      path.push('M', x, y, 'L', x, y + itemHeight);
      thisPathLength += itemHeight;
    } else {
      if (pathIndent != x) {
        path.push('L', pathIndent, y);
        thisPathLength += itemHeight;
      }
      path.push('L', x, y);
      path.push('L', x, y + itemHeight);
      thisPathLength += itemHeight;
    }
    if (pathStart === null && visibleHeadings.has(item.id)) pathStart = pathLength;
    if (
      pathEnd === null &&
      !visibleHeadings.has(item.id) &&
      pathAddedHeadings === visibleHeadings.size
    )
      pathEnd = pathLength;
    pathLength += thisPathLength;
    pathIndent = x;
    if (visibleHeadings.has(item.id)) pathAddedHeadings += 1;
  });

  if (pathStart === null) pathStart = 0;
  if (pathEnd === null) pathEnd = pathLength;

  console.log(pathStart, pathEnd);

  return (
    <div
      className="fixed top-1/2 ml-14"
      style={{
        transform: `translateX(${PAGE_WIDTH}rem) translateY(-50%)`,
      }}
      ref={tocContainerRef}
    >
      <svg
        className="absolute h-full toc-line"
        stroke="#ffffff"
        fill="#00000000"
        strokeWidth={4}
      >
        <path
          d={path.join(' ')}
          opacity={visibleHeadings.size > 0 ? '1' : '0'}
          strokeDashoffset="1"
          strokeDasharray={`1, ${pathStart}, ${pathEnd - pathStart}, ${pathLength}`}
        />
      </svg>
      <ul>
        {headings.map((heading, i) => (
          <TOCLink node={heading} key={heading.id} visibleHeadings={visibleHeadings} />
        ))}
      </ul>
    </div>
  );
};

export default TOC;
