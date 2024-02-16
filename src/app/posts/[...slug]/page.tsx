import { allPosts } from 'contentlayer/generated';
import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MdxContent } from '~/components/markdown/mdx-content';
import { PostFooter } from '~/components/post/post-footer';
import { PostHeader } from '~/components/post/post-header';

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

  const ogImage = `og?title=${title}&blog=true`;
  const description = summary ?? 'Post Not Found';

  return {
    title,
    description,
    openGraph: {
      type: 'article',
      url,
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
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}${url}`
    }
  };
}

export default function Page({ params }: Props) {
  const post = allPosts.find(({ slug }) => slug === params.slug.join('/'));

  if (!post) {
    notFound();
  }

  return (
    <article className="h-full px-8 pt-8">
      <PostHeader title={post.title} readingTime={post.readingTime} publishedDate={post.publishedDate} tags={post.tags} />
      <MdxContent code={post.body.code} />
      <PostFooter post={post} />
    </article>
  );
}
