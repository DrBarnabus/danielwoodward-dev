import { getFormattedDateTime } from '~/lib';
import { PostTags } from './post-tags';

type Props = {
  title: string;
  publishedDate: string;
  tags: string[];
};

export const PostHeader = ({ title, publishedDate, tags }: Props) => {
  const { iso, date, relativeToNow } = getFormattedDateTime(publishedDate);

  return (
    <section className="flex flex-col space-y-2">
      <h1 className="text-2xl font-bold text-zinc-900 drop-shadow-sm dark:text-zinc-50 sm:text-3xl md:text-5xl">
        {title}
      </h1>
      <div className="text-base text-zinc-700 dark:text-zinc-200 sm:text-lg">
        <span>Published </span>
        <time dateTime={iso}>{date} </time>
        <span className="inline-block text-zinc-500 dark:text-zinc-400"> · {relativeToNow}</span>
      </div>
      <PostTags tags={tags} />
    </section>
  );
};
