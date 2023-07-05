import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import MdxImage from './mdx-image';
import CodeBlock from './codeblock';
import Aside from './aside';
import Note from './note';
import Email from './encoded-email';

type Props = {
  source: MDXRemoteSerializeResult;
};

const components = {
  pre: (props) => {
    if (props.children?.type === 'code') {
      return (
        <CodeBlock
          language={props['data-language']}
          prettyCode={props.children}
        />
      );
    } else {
      return <pre {...props} />;
    }
  },
  // extract images out of the p tags into their own component
  p: (props) => {
    if (props.children?.type === 'img') {
      return <MdxImage {...props.children.props} />;
    } else {
      return <p {...props} />;
    }
  },
  Aside: Aside,
  Note: Note,
  Email: Email,
};

const MdxRenderer = ({ source }: Props) => {
  return (
    <div className="markdown">
      <MDXRemote {...source} components={components} />
    </div>
  );
};

export default MdxRenderer;
