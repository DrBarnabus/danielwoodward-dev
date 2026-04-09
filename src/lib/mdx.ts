import CalloutPanel from '~/components/markdown/CalloutPanel.astro';
import CodeBlock from '~/components/markdown/CodeBlock.astro';
import Figure from '~/components/markdown/Figure.astro';
import Link from '~/components/markdown/Link.astro';
import TableOfContents from '~/components/markdown/TableOfContents.astro';

export const mdxComponents = {
  a: Link,
  pre: CodeBlock,
  img: Figure,
  TableOfContents,
  CalloutPanel,
};

export const proseClasses = [
  'prose max-w-none pb-4 pt-8 text-pretty',
  'prose-base md:prose-lg lg:prose-xl xl:prose-2xl',
  'prose-zinc dark:prose-invert',
  'prose-headings:drop-shadow-sm',
  'prose-a:text-accent prose-a:no-underline hover:prose-a:underline hover:prose-a:text-accent/80',
  'prose-hr:my-8 prose-hr:border-zinc-300 dark:prose-hr:border-zinc-700',
  'prose-blockquote:border-l-zinc-300 dark:prose-blockquote:border-l-zinc-700',
  'prose-ul:my-4 prose-li:my-0 prose-li:marker:text-zinc-300 dark:prose-li:marker:text-zinc-400',
];
