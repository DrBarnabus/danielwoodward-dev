import { cx } from 'class-variance-authority';

type Props = {
  tags: string[];
};

export const PostTags = ({ tags }: Props) => {
  return (
    <div
      className={cx(
        'flex flex-row flex-wrap gap-2 whitespace-nowrap text-zinc-50 ',
        'text-base md:text-lg lg:text-xl xl:text-2xl',
      )}
    >
      {tags.map((tag) => (
        <span key={tag} className="w-fit rounded-md bg-zinc-500 px-2 py-1 dark:bg-zinc-700">
          {tag}
        </span>
      ))}
    </div>
  );
};
