import { PostTags } from './post-tags';
import { PostPublished } from './post-published';
import Balancer from 'react-wrap-balancer';

type Props = {
  title: string;
  publishedDate: string;
  tags: string[];
};

export const PostHeader = ({ title, publishedDate, tags }: Props) => {
  return (
    <section className="flex flex-col space-y-2">
      <h1 className="text-2xl font-bold text-zinc-900 drop-shadow-sm dark:text-zinc-50 sm:text-3xl md:text-5xl">
      <Balancer>{title}</Balancer>
      </h1>
      <PostPublished publishedDate={publishedDate} className="text-base text-zinc-700 dark:text-zinc-200 sm:text-lg" />
      <PostTags tags={tags} />
    </section>
  );
};
