import { serialize } from 'next-mdx-remote/serialize';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeImgSize from 'rehype-img-size';

import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
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
  return await serialize(content, {
    mdxOptions: {
      development: false,
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [
        [rehypePrettyCode, prettyCodeOptions],
        // idk why but ts likes to complain that this aint right even though it is
        // @ts-ignore
        [rehypeImgSize, { dir: 'public' }],
        rehypeKatex,
      ],
    },
  });
}

export async function getMdxContent(filename: string) {
  const file = fs.readFileSync(join(process.cwd(), 'content/', filename), 'utf8');
  const mdx = await mdxSerialize(file);
  return mdx;
}
