import { PostTags } from './post-tags';
import { PostPublished } from './post-published';
import Balancer from 'react-wrap-balancer';

type Props = {
  title: string;
  readingTime: number;
  publishedDate: string;
  tags: string[];
};

export const PostHeader = ({ title, readingTime, publishedDate, tags }: Props) => {
  return (
    <section className="flex flex-col space-y-2">
      <h1 className="text-2xl font-bold text-zinc-900 drop-shadow-sm dark:text-zinc-50 sm:text-3xl md:text-5xl">
        <Balancer>{title}</Balancer>
      </h1>
      <div className="flex flex-col sm:flex-row sm:items-center">
        <div className="text-base text-zinc-700 dark:text-zinc-200 sm:text-lg mr-2">{readingTime} min read · </div>
        <PostPublished publishedDate={publishedDate} className="text-base text-zinc-700 dark:text-zinc-200 sm:text-lg" />
      </div>
      <PostTags tags={tags} />
    </section>
  );
};
