'use client';

import { useLayoutEffect, useRef } from 'react';

type Props = {
  children: React.ReactNode;
};

export const CodeBlock = ({ children }: Props) => {
  const ref = useRef<HTMLPreElement>(null);

  useLayoutEffect(() => {
    ref.current?.parentElement?.classList.add('not-prose');
  }, [ref]);

  return (
    <pre ref={ref} className="relative">
      {children}
    </pre>
  );
};
