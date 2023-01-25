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
    <pre className="group relative my-4 rounded-lg bg-[var(--code-background)] p-4">
      <div className="absolute top-0 right-4 -translate-y-full rounded-t-md bg-inherit px-1 lowercase">
        .{language}
      </div>
      <button
        className="absolute right-4 opacity-0 transition-opacity hover:!opacity-100 group-hover:opacity-70"
        onClick={copyCode}
      >
        <MdContentCopy size={20} />
      </button>
      {cloneElement(prettyCode as ReactElement, { ref: codeRef })}
    </pre>
  );
};

export default CodeBlock;
