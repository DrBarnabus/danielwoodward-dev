'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { Check, Copy } from '../icons';

const getClipboardTextFromChildren = (element: React.ReactElement | string): string => {
  if (typeof element === 'string') return element;
  if (typeof element.props.children === 'string') return element.props.children;

  if (Array.isArray(element.props.children)) {
    return element.props.children
      .map((child: React.ReactElement | string) => getClipboardTextFromChildren(child))
      .join('');
  }

  if (typeof element.props.children === 'object') {
    return getClipboardTextFromChildren(element.props.children);
  }

  return '';
};

type Props = {
  children: React.ReactNode;
};

export const CodeBlock = ({ children }: Props) => {
  const ref = useRef<HTMLPreElement>(null);
  const [focusWithin, setFocusWithin] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(getClipboardTextFromChildren(children as React.ReactElement));

    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 3000);
  };

  useLayoutEffect(() => {
    ref.current?.parentElement?.classList.add('not-prose');
  }, [ref]);

  return (
    <pre
      ref={ref}
      className="relative"
      onMouseEnter={() => setFocusWithin(true)}
      onMouseLeave={() => setFocusWithin(false)}
      onFocus={() => setFocusWithin(true)}
      onBlur={() => setFocusWithin(false)}
    >
      {(focusWithin || hasCopied) && (
        <button
          className="group absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded bg-white dark:bg-zinc-700"
          onClick={handleCopy}
          disabled={hasCopied}
          aria-label={hasCopied ? 'Copied' : 'Copy code'}
        >
          {hasCopied ? (
            <Check className="h-6 w-6 animate-pulse text-green-500" />
          ) : (
            <Copy className="h-6 w-6 text-zinc-700 group-hover:text-accent dark:text-zinc-100 dark:group-hover:text-accent" />
          )}
        </button>
      )}
      {children}
    </pre>
  );
};
