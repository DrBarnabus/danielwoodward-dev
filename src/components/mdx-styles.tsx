import { cx } from 'class-variance-authority';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export function MdxStyles({ children }: Props) {
  return (
    <section
      className={cx(
        'prose prose-base prose-zinc max-w-none py-8 dark:prose-invert',
        'prose-headings:drop-shadow-sm',
        'prose-a:text-accent prose-a:no-underline hover:prose-a:text-accent/80 hover:prose-a:underline',
        'prose-hr:border-zinc-300 dark:prose-hr:border-zinc-700',
        'prose-blockquote:border-l-zinc-300 dark:prose-blockquote:border-l-zinc-700',
        'prose-ul:my-4 prose-li:my-0 prose-li:marker:text-zinc-300 dark:prose-li:marker:text-zinc-400'
      )}
    >
      {children}
    </section>
  );
}
