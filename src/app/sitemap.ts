import { allPosts } from 'contentlayer/generated';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = allPosts.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());

  return [
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/posts`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...posts.map((post) => ({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}${post.url}`,
      changeFrequency: 'monthly',
      priority: 0.7,
    } as const)),
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]  as const;
}
