'use client';

import { type Post } from 'contentlayer/generated';
import Link from 'next/link';
import { getFormattedDateTime } from '~/lib';
import { PostTags } from './post-tags';
import { PostPublished } from './post-published';
import { useState } from 'react';
import Balancer from 'react-wrap-balancer';
import { cx } from 'class-variance-authority';

type Props = {
  post: Post;
  compact?: boolean;
};

export const PostCard = ({ post, compact = false }: Props) => {
  const { url, title, summary, tags, publishedDate } = post;
  const [isFresh, setIsFresh] = useState(getFormattedDateTime(publishedDate).isFresh);

  return (
    <Link
      href={url}
      className="group relative flex transition-transform duration-300 ease-in-out hover:scale-[1.02]"
      aria-label={title}
    >
      <article className="transition-padding m-0.5 flex w-full flex-col space-y-4 rounded-md bg-zinc-100 p-4 pl-8 shadow-lg duration-300 ease-in-out hover:shadow-xl group-hover:pl-12 dark:bg-zinc-800">
        <div className="flex flex-col space-y-2">
          <h2
            className={cx(
              'text-zinc-800 dark:text-zinc-50',
              compact ? 'text-xl font-semibold sm:text-2xl' : 'text-2xl font-bold sm:text-3xl'
            )}
          >
            <Balancer>
              {title}
              {isFresh && !compact ? (
                <div className="ml-2 inline-block text-base font-semibold text-accent motion-safe:animate-bounce">
                  New
                </div>
              ) : null}
            </Balancer>
          </h2>

          <p className="text-zinc-700 dark:text-zinc-200">
            <Balancer>{summary}</Balancer>
          </p>

          {!compact ? (
            <>
              <PostPublished
                publishedDate={publishedDate}
                className="text-xs text-zinc-600 dark:text-zinc-300"
                onFormattedDateTimeUpdated={({ isFresh }) => setIsFresh(isFresh)}
              />
              <PostTags tags={tags} />
            </>
          ) : null}
        </div>
      </article>
      <div
        className={cx(
          'transition-[width, height] absolute inset-0 z-20 my-auto h-[calc(100%_-_0.25rem)] rounded-l bg-accent duration-300 ease-in-out group-hover:h-[calc(80%_-_0.25rem)]',
          compact ? 'w-1 group-hover:w-3' : 'w-3 group-hover:w-6'
        )}
      />
    </Link>
  );
};
