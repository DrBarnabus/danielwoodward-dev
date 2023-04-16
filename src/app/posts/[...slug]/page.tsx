import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allPosts } from 'contentlayer/generated';
import { MdxContent } from '~/components/mdx-content';
import { PostHeader } from '~/components/post-header';

const baseUrl = `https://${process.env.VERCEL_URL ?? 'localhost:3000'}`;

type Props = {
  params: {
    slug: string[];
  };
};

export async function generateStaticParams(): Promise<Props['params'][]> {
  return allPosts.map(({ slug }) => ({
    slug: slug.split('/'),
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const { url, title, summary, publishedDate } = allPosts.find(({ slug }) => slug === params.slug.join('/')) || {
    title: 'Post Not Found',
    summary: undefined,
    url: '/posts',
    publishedDate: new Date().toISOString(),
  };

  const ogImage = `${baseUrl}/og?title=${title}&subtitle=${summary ?? ''}&blog=true`;
  const description = summary ?? 'Post Not Found';

  return {
    title,
    description,
    openGraph: {
      type: 'article',
      url: `${baseUrl}/${url}`,
      title,
      description,
      publishedTime: publishedDate,
      images: [ogImage],
    },
    twitter: {
      title,
      description,
      images: ogImage,
      card: 'summary_large_image',
    },
  };
}

export default function Page({ params }: Props) {
  const post = allPosts.find(({ slug }) => slug === params.slug.join('/'));

  if (!post) {
    notFound();
  }

  return (
    <article className="h-full px-8 pt-8">
      <PostHeader title={post.title} publishedDate={post.publishedDate} tags={post.tags} />
      <MdxContent code={post.body.code} />
    </article>
  );
}
