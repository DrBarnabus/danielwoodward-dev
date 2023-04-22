'use client';

import { cx } from 'class-variance-authority';
import { useEffect, useMemo, useState } from 'react';
import { Share } from '../icons';

type Props = { url: string; title: string };

export const ShareButton = ({ url, title }: Props) => {
  const [canShare, setCanShare] = useState(false);

  const shareData = useMemo(
    () => ({
      url,
      title,
    }),
    [url, title]
  );

  useEffect(() => {
    setCanShare(
      typeof navigator !== 'undefined' && typeof navigator.canShare === 'function' && navigator.canShare(shareData)
    );
  }, [shareData]);

  const handleClick = async () => {
    await navigator.share(shareData);
  };

  if (!canShare) {
    return null;
  }

  return (
    <button
      className={cx(
        'flex min-w-full flex-row items-center justify-center gap-4 px-4 py-2 sm:min-w-[12rem]',
        'transform transition duration-300 ease-in-out',
        'rounded-md bg-accent font-bold text-white shadow-lg outline-none focus:outline-2 focus:outline-offset-1 focus:outline-accent contrast-more:text-black',
        'hover:scale-[1.03] hover:bg-accent/90 hover:shadow-xl'
      )}
      onClick={handleClick}
    >
      Share <Share className="h-5 w-5" />
    </button>
  );
};
