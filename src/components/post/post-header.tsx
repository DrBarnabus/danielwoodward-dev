import { cx } from 'class-variance-authority';
import { PostPublished } from './post-published';
import { PostTags } from './post-tags';

type Props = {
  title: string;
  readingTime: number;
  publishedDate: string;
  tags: string[];
};

export const PostHeader = ({ title, readingTime, publishedDate, tags }: Props) => {
  return (
    <section className="flex flex-col space-y-2">
      <h1
        className={cx(
          'text-balance font-extrabold text-zinc-900 drop-shadow-sm dark:text-zinc-50',
          'text-4xl md:text-5xl lg:text-6xl xl:text-7xl',
        )}
      >
        {title}
      </h1>
      <div className={cx(
        'flex flex-col text-zinc-700 dark:text-zinc-200 sm:flex-row sm:items-center',
        'text-base md:text-lg lg:text-xl xl:text-2xl'
      )}>
        <div className="mr-2">{readingTime} min read · </div>
        <PostPublished publishedDate={publishedDate} />
      </div>
      <PostTags tags={tags} />
    </section>
  );
};
