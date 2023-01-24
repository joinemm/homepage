/* eslint-disable react/jsx-key */
import React from 'react';
import { MdContentCopy } from 'react-icons/md';
import type { ReactElement } from 'react';
import { useRef, cloneElement } from 'react';

const CodeBlock = ({ language, prettyCode }) => {
  const codeRef = useRef<HTMLElement>(null);

  const copyCode = () => {
    navigator.clipboard.writeText(
      codeRef.current?.textContent ?? 'You tried to copy something but it failed :(',
    );
    // TODO: toast notification: Copied code to clipboard!
  };

  return (
    <pre className="bg-[var(--code-background)] rounded-lg p-4 my-4 relative group">
      <div className="bg-inherit absolute top-0 right-4 -translate-y-full lowercase rounded-t-md px-1">
        .{language}
      </div>
      <button
        className="right-4 absolute transition-opacity opacity-0 group-hover:opacity-70 hover:!opacity-100"
        onClick={copyCode}
      >
        <MdContentCopy size={20} />
      </button>
      {cloneElement(prettyCode as ReactElement, { ref: codeRef })}
    </pre>
  );
};

export default CodeBlock;
