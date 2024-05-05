'use client';

import { useEffect, useState } from 'react';
import { getFormattedDateTime, type FormattedDateTime } from '~/lib';

type Props = {
  publishedDate: string;
  onFormattedDateTimeUpdated?: (newValues: FormattedDateTime) => void;
  className?: string;
};

export const PostPublished = ({
  publishedDate,
  onFormattedDateTimeUpdated: onFormattedDateUpdated,
  className,
}: Props) => {
  const [{ iso, date, relativeToNow }, setFormattedDateTime] = useState(getFormattedDateTime(publishedDate));

  useEffect(() => {
    const onInterval = () => {
      const formattedDateTime = getFormattedDateTime(publishedDate);
      setFormattedDateTime(formattedDateTime);
      onFormattedDateUpdated?.(formattedDateTime);
    }

    onInterval();
    const interval = setInterval(onInterval, 60000);

    return () => clearInterval(interval);
  }, [publishedDate, onFormattedDateUpdated]);

  return (
    <div className={className}>
      <span>Published </span>
      <time dateTime={iso}>{date} </time>
      <span className="inline-block text-zinc-500 dark:text-zinc-400"> · {relativeToNow}</span>
    </div>
  );
};
