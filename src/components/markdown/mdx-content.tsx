'use client';

import { cx } from 'class-variance-authority';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { MdxComponents } from './mdx-components';

type Props = {
  code: string;
};

export function MdxContent({ code }: Props) {
  const Component = useMDXComponent(code);

  return (
    <section
      className={cx(
        'prose max-w-none pb-4 pt-8 text-pretty',
        'prose-base md:prose-lg lg:prose-xl xl:prose-2xl',
        'prose-zinc dark:prose-invert',
        'prose-headings:drop-shadow-sm',
        'prose-a:text-accent prose-a:no-underline hover:prose-a:text-accent/80 hover:prose-a:underline',
        'prose-hr:my-8 prose-hr:border-zinc-300 dark:prose-hr:border-zinc-700',
        'prose-blockquote:border-l-zinc-300 dark:prose-blockquote:border-l-zinc-700',
        'prose-ul:my-4 prose-li:my-0 prose-li:marker:text-zinc-300 dark:prose-li:marker:text-zinc-400',
      )}
    >
      <Component components={MdxComponents} />
    </section>
  );
}
