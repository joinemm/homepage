import { hasProperty } from 'hast-util-has-property';
import { headingRank } from 'hast-util-heading-rank';
import { toString } from 'hast-util-to-string';
import { visit } from 'unist-util-visit';

export type Heading = {
  rank: number;
  title: string;
  totalLength: number;
  id: string;
  children: Heading[];
};

const rehypeExtractHeadings = ({
  depth = 4,
  headings,
}: {
  depth: number;
  headings: Heading[];
}) => {
  return (tree) => {
    visit(tree, 'element', function (node) {
      const rank = headingRank(node);
      if (rank !== null && rank <= depth && hasProperty(node, 'id')) {
        const thisHeading = {
          rank: rank,
          title: toString(node),
          totalLength: 1,
          id: node.properties.id.toString(),
          children: [],
        };
        // if (rank == 2) {
          headings.push(thisHeading);
        // } else {
        //   // we must find the parent
        //   // just assume it's the most recent heading with higher rank
        //   const parent = headings.filter((h) => h.rank < rank).at(-1);
        //   if (parent !== undefined) {
        //     parent.children = [...parent.children, thisHeading];
        //     parent.totalLength += 1;
        //   }
        // }
      }
    });
  };
};

export default rehypeExtractHeadings;
