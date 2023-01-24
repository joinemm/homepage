/* eslint-disable react/jsx-key */
import React from 'react';
import { MdContentCopy } from 'react-icons/md';
import type { ReactElement } from 'react';
import { useRef, cloneElement } from 'react';

const CodeBlock = ({ language, prettyCode }) => {
  const codeRef = useRef<HTMLElement>(null);
  return (
    <pre className="codeblock">
      <div className="code-language">{language}</div>
      <button
        className="code-copy-button"
        onClick={() =>
          navigator.clipboard.writeText(
            codeRef.current?.textContent ?? 'You tried to copy something but it failed :(',
          )
        }
      >
        <MdContentCopy size={20} />
      </button>
      {cloneElement(prettyCode as ReactElement, { ref: codeRef })}
    </pre>
  );
};

export default CodeBlock;
