/* eslint-disable react/jsx-key */
import { MdContentCopy } from 'react-icons/md';
import type { ReactElement } from 'react';
import { useRef, cloneElement } from 'react';

const SHOWLANG = false;

const CodeBlock = ({ language, prettyCode }) => {
  const codeRef = useRef<HTMLElement>(null);

  const copyCode = () => {
    navigator.clipboard.writeText(
      codeRef.current?.textContent ?? 'You tried to copy something but it failed :(',
    );
    // TODO: toast notification: Copied code to clipboard!
  };

  return (
    <pre className="dark:muted-border group relative my-4 mt-8 overflow-visible rounded-lg dark:border">
      {SHOWLANG && language && (
        <div className="dark:muted-border dark:fg-primary absolute right-4 top-0 z-20 -translate-y-full rounded-t-md bg-[var(--tw-prose-pre-bg)] px-2 lowercase text-white dark:border-x dark:border-t dark:bg-[#0d0d13]">
          {language}
        </div>
      )}
      <button
        className="absolute right-3 top-3 opacity-0 transition-opacity hover:!opacity-100 group-hover:opacity-70"
        onClick={copyCode}
      >
        <MdContentCopy size={20} />
      </button>
      <div className="overflow-scroll py-3 pl-4">
        {cloneElement(prettyCode as ReactElement, { ref: codeRef })}
      </div>
    </pre>
  );
};

export default CodeBlock;
