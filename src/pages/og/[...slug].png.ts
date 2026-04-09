import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { generateOgImage } from '~/lib/og-image';

export const getStaticPaths = (async () => {
  const posts = await getCollection('posts');
  const pages = await getCollection('pages');

  const postPaths = posts.map((post) => ({
    params: { slug: `posts/${post.id}` },
    props: { title: post.data.title, isBlog: true },
  }));

  const pagePaths = pages.map((page) => ({
    params: { slug: page.id },
    props: { title: page.data.title, isBlog: false },
  }));

  const staticPaths = [
    { params: { slug: 'index' }, props: { title: undefined, isBlog: false } },
    { params: { slug: 'posts' }, props: { title: 'Posts', isBlog: true } },
  ];

  return [...postPaths, ...pagePaths, ...staticPaths];
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const { title, isBlog } = props as { title?: string; isBlog: boolean };
  const png = await generateOgImage({ title, isBlog });

  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  });
};
