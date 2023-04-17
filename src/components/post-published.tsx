'use client';

import { useEffect, useState } from 'react';
import { getFormattedDateTime } from '~/lib';

type Props = {
  publishedDate: string;
  className: string;
};

export const PostPublished = ({ publishedDate, className }: Props) => {
  const [{ iso, date, relativeToNow }, setFormattedDateTime] = useState(getFormattedDateTime(publishedDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setFormattedDateTime(getFormattedDateTime(publishedDate));
    }, 60000);

    return () => clearInterval(interval);
  }, [publishedDate]);

  return (
    <div className={className}>
      <span>Published </span>
      <time dateTime={iso}>{date} </time>
      <span className="inline-block text-zinc-500 dark:text-zinc-400"> · {relativeToNow}</span>
    </div>
  );
};
