'use client';

import { cx } from 'class-variance-authority';
import { useState } from 'react';
import { ChevronDown } from './icons';

type Props = {
  children: React.ReactNode;
};

export const TableOfContents = ({ children }: Props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="my-5 flex w-full flex-col rounded bg-zinc-200/40 dark:bg-zinc-800 sm:w-2/5">
      <button
        className={cx(
          'flex flex-row items-center gap-6 rounded bg-zinc-200 px-4 py-2 font-bold text-zinc-700 dark:bg-zinc-700 dark:text-zinc-50',
          expanded ? 'rounded-b-none' : ''
        )}
        onClick={() => setExpanded((prev) => !prev)}
        aria-label="Expand Table of Contents"
      >
        <span>Table of Contents</span>
        <ChevronDown
          className={cx('ml-auto h-4 w-4 transition-transform duration-300 ease-in-out', expanded ? 'rotate-180' : '')}
        />
      </button>
      {expanded && <div className="p-2 prose-ul:my-1">{children}</div>}
    </div>
  );
};
