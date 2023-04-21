import { type Metadata } from 'next/types';
import { allPosts } from 'contentlayer/generated';
import { PostCard } from '~/components/post-card';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
const title = 'Posts';
const description = `All of my blog posts are available here. At the moment I mainly write about dotnet/C# and NextJS.`;
const ogImage = `${baseUrl}/og?title=${title}&blog=true`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    type: 'website',
    url: `${baseUrl}/posts`,
    title,
    description,
    images: [ogImage],
  },
  twitter: {
    title,
    description,
    images: ogImage,
    card: 'summary_large_image',
  },
};

export default function Page() {
  const posts = allPosts.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());

  return (
    <section className="flex h-full flex-col space-y-4 px-8 pb-8">
      <div className="flex flex-col space-y-4">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
}
