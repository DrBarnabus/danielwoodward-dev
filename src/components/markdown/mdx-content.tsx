'use client';

import { useMDXComponent } from 'next-contentlayer/hooks';
import { cx } from 'class-variance-authority';
import { MdxComponents } from './mdx-components';

type Props = {
  code: string;
};

export function MdxContent({ code }: Props) {
  const Component = useMDXComponent(code);

  return (
    <section
      className={cx(
        'prose prose-base prose-zinc max-w-none pb-4 pt-8 dark:prose-invert',
        'prose-headings:drop-shadow-sm',
        'prose-a:text-accent prose-a:no-underline hover:prose-a:text-accent/80 hover:prose-a:underline',
        'prose-hr:border-zinc-300 dark:prose-hr:border-zinc-700',
        'prose-blockquote:border-l-zinc-300 dark:prose-blockquote:border-l-zinc-700',
        'prose-ul:my-4 prose-li:my-0 prose-li:marker:text-zinc-300 dark:prose-li:marker:text-zinc-400'
      )}
    >
      <Component components={MdxComponents} />
    </section>
  );
}
