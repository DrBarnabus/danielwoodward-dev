import { allPosts } from 'contentlayer/generated';
import Link from 'next/link';
import { PostCard } from '~/components/post/post-card';

export function WelcomePostsSection() {
  const latestPosts = allPosts
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    .slice(0, 3);

  return (
    <section className="flex flex-col space-y-2 text-zinc-900 dark:text-zinc-50">
      <h2 className="inline-flex items-center justify-between border-b text-xl font-semibold dark:border-zinc-700 sm:text-2xl">
        Latest Posts{' '}
        <Link
          href="/posts"
          className="cursor-pointer text-base text-accent no-underline hover:text-accent/80 hover:underline"
        >
          All
        </Link>
      </h2>

      {latestPosts.map((post) => (
        <PostCard key={post._id} post={post} superCompact />
      ))}
    </section>
  );
}
