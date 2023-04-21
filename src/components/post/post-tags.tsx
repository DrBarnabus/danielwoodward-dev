type Props = {
  tags: string[];
};

export const PostTags = ({ tags }: Props) => {
  return (
    <div className="flex flex-row flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="w-fit whitespace-nowrap rounded-md bg-zinc-500 px-2 py-1 text-sm text-zinc-50 dark:bg-zinc-700"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};
