import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getSortedPosts } from '~/lib/posts';

export async function GET(context: APIContext) {
  const posts = await getSortedPosts();

  return rss({
    title: '<DanielWoodward />',
    description: 'My personal website and tech blog',
    site: context.site!.toString(),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.summary,
      pubDate: post.data.publishedDate,
      link: `/posts/${post.id}`,
    })),
  });
}
