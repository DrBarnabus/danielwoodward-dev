import { type Post } from 'contentlayer/generated';
import Link from 'next/link';
import { getFormattedDateTime } from '~/lib';
import { PostTags } from './post-tags';
import { PostPublished } from './post-published';

type Props = {
  post: Post;
};

export const PostCard = ({ post }: Props) => {
  const { url, title, summary, tags, publishedDate } = post;
  const { iso, date, relativeToNow, isFresh } = getFormattedDateTime(publishedDate);

  return (
    <Link
      href={url}
      className="group relative flex transition-transform duration-300 ease-in-out hover:scale-[1.02]"
      aria-label={title}
    >
      <article className="transition-padding m-0.5 flex w-full flex-col space-y-4 rounded-md bg-zinc-100 p-4 pl-8 shadow-lg duration-300 ease-in-out hover:shadow-xl group-hover:pl-12 dark:bg-zinc-800">
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-zinc-50 sm:text-3xl">
            {title}
            {isFresh ? (
              <div className="ml-2 inline-block text-base font-semibold text-accent motion-safe:animate-bounce">
                New
              </div>
            ) : null}
          </h2>
          <p className="text-slate-700 dark:text-zinc-200">{summary}</p>
          <PostPublished publishedDate={publishedDate} className="text-xs text-zinc-600 dark:text-zinc-300" />
          <PostTags tags={tags} />
        </div>
      </article>
      <div className="m transition-[width, height] group-hover:animate-border group-focus:animate-border-fast absolute inset-0 z-20 my-auto h-[calc(100%_-_0.25rem)] w-3 rounded-l bg-accent duration-300 ease-in-out group-hover:h-[calc(80%_-_0.25rem)] group-hover:w-6" />
    </Link>
  );
};
