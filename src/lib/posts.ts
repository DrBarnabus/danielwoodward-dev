import { getCollection } from 'astro:content';

export const getReadingTime = (content: string) => {
  const words = content.match(/\w+/g)?.length ?? 0;
  return Math.ceil(words / 200);
};

export const getSortedPosts = async () => {
  const posts = await getCollection('posts');
  return posts.sort(
    (a, b) => b.data.publishedDate.getTime() - a.data.publishedDate.getTime(),
  );
};
