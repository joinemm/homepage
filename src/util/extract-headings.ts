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
  biggest = 2,
  depth = 4,
  headings,
}: {
  biggest: number;
  depth: number;
  headings: Heading[];
}) => {
  return (tree) => {
    visit(tree, 'element', function (node) {
      const rank = headingRank(node);
      if (
        rank !== undefined &&
        biggest <= rank &&
        rank < depth &&
        hasProperty(node, 'id')
      ) {
        headings.push({
          rank: rank,
          title: toString(node),
          totalLength: 1,
          id: node.properties.id.toString(),
          children: [],
        });
      }
    });
  };
};

export default rehypeExtractHeadings;
