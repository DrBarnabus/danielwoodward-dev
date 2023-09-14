import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import { s } from 'hastscript';
import rehypeAutolinkHeadings, { type Options as AutolinkOptions } from 'rehype-autolink-headings';
import rehypePrettyCode, { type Options as PrettyCodeOptions } from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

const resolveUrl = (flattenedPath: string, removeFirstElement: boolean) => {
  let pathParts = flattenedPath.split('/');
  if (removeFirstElement) {
    pathParts = pathParts.slice(1);
  }

  pathParts[pathParts.length - 1] = (pathParts[pathParts.length - 1] as string).slice(9);

  return pathParts.join('/');
};

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'posts/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'Title of the post',
      required: true,
    },
    summary: {
      type: 'string',
      description: 'Short summary of the post',
      required: true,
    },
    publishedDate: {
      type: 'date',
      description: 'Date that the post was published',
      required: true,
    },
    topic: {
      type: 'string',
      description: 'The topic the post should be organized under',
      required: true,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      description: 'A list of keywords that relate to the post',
      required: true,
    },
    recommendedPosts: {
      type: 'list',
      of: { type: 'string' },
      description: 'A list of recommended post slugs to recommend at the end of the post',
    },
  },
  computedFields: {
    url: {
      type: 'string',
      description: 'The url of the post, e.g. /posts/my-topic/my-post',
      resolve: (post) => `/${resolveUrl(post._raw.flattenedPath, false)}`,
    },
    slug: {
      type: 'string',
      description: 'The slug of the post, e.g. my-topic/my-post',
      resolve: (post) => resolveUrl(post._raw.flattenedPath, true),
    },
    readingTime: {
      type: 'number',
      description: 'The estimated time in minutes for the average person to read the post',
      resolve: (post) => {
        const regex = /\w+/g;
        const wordCount = post.body.raw.match(regex)?.length;
        return !wordCount ? undefined : Math.ceil(wordCount / 200);
      },
    },
  },
}));

export const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: 'pages/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'Title of the page',
      required: true,
    },
    description: {
      type: 'string',
      description: 'Short description of the page',
      required: true,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      description: 'The url of the post, e.g. /posts/my-topic/my-post',
      resolve: (page) => `/${page._raw.flattenedPath.split('/').splice(1).join('/')}`,
    },
    slug: {
      type: 'string',
      description: 'The slug of the post, e.g. my-topic/my-post',
      resolve: (page) => page._raw.flattenedPath.split('/').slice(1).join('/'),
    },
  },
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Page],
  disableImportAliasWarning: true,
  mdx: {
    remarkPlugins: [
      /** Add support for GitHub Flavoured Markdown */
      remarkGfm,
    ],
    rehypePlugins: [
      /** Add `id` attributes to headings */
      rehypeSlug,
      [
        /** Append auto-linking buttons after h1, h2, h3 heading tags */
        rehypeAutolinkHeadings,
        {
          behavior: 'prepend',
          test: ['h1', 'h2', 'h3'],
          content: s(
            'svg',
            {
              xmlns: 'http://www.w3.org/2000/svg',
              viewBox: '0 0 640 512',
              width: '20',
              height: '20',
              fill: 'currentColor',
              'aria-label': 'Anchor Link',
            },
            [
              s('path', {
                d: 'M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z',
              }),
            ],
          ),
        } satisfies Partial<AutolinkOptions>,
      ],
      [
        /** Code block syntax highlighting and enhancement */
        rehypePrettyCode,
        {
          theme: {
            light: 'github-light',
            dark: 'github-dark',
          },
          onVisitLine(node) {
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }];
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push('highlighted');
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ['word'];
          },
          tokensMap: {
            fn: 'entity.name',
            type: 'entity.name',
            prop: 'entity.name',
            const: 'variable.other.constant',
          },
        } satisfies Partial<PrettyCodeOptions>,
      ],
    ],
  },
});
