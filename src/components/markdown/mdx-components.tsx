import Link from 'next/link';
import type { HTMLProps } from 'react';
import type { MDXComponents } from 'mdx/types';
import { cx } from 'class-variance-authority';
import { CodeBlock } from './code-block';
import { Figure } from './figure';
import { TableOfContents } from './table-of-contents';
import { CalloutPanel } from './callout-panel';

function a({ href, children }: HTMLProps<HTMLAnchorElement>) {
  if (href && href.startsWith('/')) {
    return <Link href={href}>{children}</Link>;
  }

  if (href && href.startsWith('#')) {
    return <a href={href}>{children}</a>;
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function p(props: React.HTMLProps<HTMLParagraphElement>) {
  return <div className={cx('my-5', props.className)} {...props}></div>;
}

function pre({ children }: React.HTMLProps<HTMLPreElement>) {
  return <CodeBlock>{children}</CodeBlock>;
}

function img({ src, alt }: React.HTMLProps<HTMLImageElement>) {
  return <Figure src={src} alt={alt} />;
}

export const MdxComponents: MDXComponents = { a, p, pre, img, TableOfContents, CalloutPanel };
