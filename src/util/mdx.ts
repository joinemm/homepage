import { serialize } from 'next-mdx-remote/serialize';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeImgSize from 'rehype-img-size';

import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExtractHeadings from './extract-headings';
import sectionize from 'remark-sectionize';
import { join } from 'path';
import fs from 'fs';

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
        // idk why but ts likes to complain that this aint right even though it is
        // @ts-ignore
        [rehypeImgSize, { dir: 'public' }],
        rehypeSlug,
        rehypeAutolinkHeadings,
        rehypeKatex,
        [rehypeExtractHeadings, { rank: 4, headings }],
      ],
    },
  });
  return { content: result, toc: headings };
}

export async function getMdxContent(filename: string) {
  const file = fs.readFileSync(
    join(process.cwd(), 'content/', filename),
    'utf8',
  );
  const mdx = await mdxSerialize(file);
  return mdx;
}
