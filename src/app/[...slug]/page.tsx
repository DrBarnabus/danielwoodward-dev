import { allPages } from 'contentlayer/generated';
import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MdxContent } from '~/components/markdown/mdx-content';

type Props = {
  params: {
    slug: string[];
  };
};

export async function generateStaticParams(): Promise<Props['params'][]> {
  return allPages.map(({ slug }) => ({
    slug: slug.split('/'),
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const {
    url,
    title,
    description = 'Page Not Found',
  } = allPages.find(({ slug }) => slug === params.slug.join('/')) || {
    title: 'Post Not Found',
    summary: undefined,
    url: '/posts',
  };

  const ogImage = `og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      type: 'article',
      url,
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
}

export default function Page({ params }: Props) {
  const page = allPages.find(({ slug }) => slug === params.slug.join('/'));

  if (!page) {
    notFound();
  }

  return (
    <div className="h-full px-8">
      <MdxContent code={page.body.code} />
    </div>
  );
}
