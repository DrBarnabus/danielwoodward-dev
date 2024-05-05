import { cx } from 'class-variance-authority';
import { allPosts, type Post } from 'contentlayer/generated';
import { PostCard } from './post-card';
import { ShareButton } from './share-button';

const RecommendedPosts = ({ posts }: { posts: Post[] }) => {
  return (
    <>
      <h3>If you liked this post, then you might also be interested in:</h3>
      <div className="not-prose">
        {posts.map((post) => (
          <PostCard key={post.url} post={post} compact />
        ))}
      </div>
    </>
  );
};

type Props = {
  post: Post;
};

export const PostFooter = ({ post }: Props) => {
  const recommendedPosts = allPosts
    .filter(({ slug }) => post.recommendedPosts && post.recommendedPosts?.indexOf(slug) !== -1)
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());

  return (
    <section>
      <div
        className={cx(
          'prose max-w-none pb-8 pt-4',
          'prose-base md:prose-lg lg:prose-xl xl:prose-2xl',
          'prose-zinc dark:prose-invert',
          'prose-a:text-accent prose-a:no-underline hover:prose-a:text-accent/80 hover:prose-a:underline',
          'prose-hr:mb-6 prose-hr:border-zinc-300 dark:prose-hr:border-zinc-700',
          recommendedPosts ? 'mb-2' : 'mb-8',
        )}
      >
        <hr />

        <div className="flex flex-col items-center justify-center sm:flex-row sm:gap-8">
          <p className="my-3 sm:my-1">
            Thanks for taking the time to read my post, I hope you enjoyed reading it! If you did I would greatly
            appreciate it if you shared it with your friends and colleagues.
          </p>
          <ShareButton url={post.url} title={post.title} />
        </div>

        <p className="my-3 sm:my-1">
          Whether you did or you didn&apos;t I would love to hear your feedback; what works, what doesn&apos;t, did I
          leave anything out? Unfortunately I haven&apos;t implemented comments yet, but my socials are linked in the
          footer of this page if you wish to contact me.
        </p>

        {recommendedPosts.length > 0 ? <RecommendedPosts posts={recommendedPosts} /> : null}
      </div>
    </section>
  );
};
