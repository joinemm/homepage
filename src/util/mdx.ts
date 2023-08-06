import { serialize } from 'next-mdx-remote/serialize';
import rehypePrettyCode from 'rehype-pretty-code';

import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExtractHeadings from './extract-headings';
import sectionize from 'remark-sectionize';

const prettyCodeOptions = {
  theme: 'one-dark-pro',
  onVisitLine(node: any) {
    // Prevent lines from collapsing in `display: grid` mode, and
    // allow empty lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }];
    }
  },
  onVisitHighlightedLine(node: any) {
    node.properties.className.push('highlighted');
  },
  onVisitHighlightedWord(node: any) {
    node.properties.className = ['word'];
  },
};

export async function mdxSerialize(content: string) {
  let headings = [];
  const result = await serialize(content, {
    mdxOptions: {
      development: process.env.NODE_ENV === 'development',
      remarkPlugins: [remarkGfm, remarkMath, sectionize],
      rehypePlugins: [
        [rehypePrettyCode, prettyCodeOptions],
        rehypeSlug,
        rehypeAutolinkHeadings,
        rehypeKatex,
        [rehypeExtractHeadings, { rank: 4, headings }],
      ],
    },
  });
  return { content: result, toc: headings };
}
