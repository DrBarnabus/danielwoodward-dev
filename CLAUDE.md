# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal tech blog built with Next.js 14 (App Router), Contentlayer for MDX content management, and Tailwind CSS. Deployed on Vercel.

## Commands

- `pnpm dev` — start dev server
- `pnpm build` — production build (runs Contentlayer build then Next.js build)
- `pnpm lint` — ESLint via Next.js
- `pnpm style` — check formatting with Prettier
- `pnpm style:fix` — fix formatting
- `pnpm cl` — regenerate Contentlayer content in watch mode
- `pnpm cl:build` — one-off Contentlayer build

Package manager is **pnpm** (8.15.8).

## Architecture

**Content pipeline:** MDX files in `content/` → Contentlayer (defined in `contentlayer.config.ts`) → type-safe generated module at `contentlayer/generated`. Two document types: `Post` and `Page`. Posts live at `content/posts/{topic}/{YYYYMMDD}-{slug}.mdx`, pages at `content/pages/{slug}.mdx`.

**Routing:** Next.js App Router in `src/app/`. Dynamic post pages at `/posts/[...slug]` use SSG via `generateStaticParams`. Catch-all `/[...slug]` handles static pages. OG images generated at `/api/og`.

**MDX rendering:** Custom component overrides in `src/components/markdown/mdx-components.tsx` — internal links use Next.js `Link`, external links open in new tab, `<pre>` renders `CodeBlock` with copy-to-clipboard, plus `TableOfContents` and `CalloutPanel` components.

**Styling:** Tailwind with `class` dark mode strategy. Accent colour via CSS custom property `--color-accent`. Component variants use `class-variance-authority`. Custom grid layout columns defined in `tailwind.config.js`.

**Path alias:** `~/` maps to `./src/` (configured in tsconfig).

## Conventions

- TypeScript strict mode with `noUncheckedIndexedAccess`
- ESLint enforces `consistent-type-imports` (use `import type` where possible)
- Prettier with single quotes, semicolons, and Tailwind class sorting plugin
- Kebab-case file names (`post-card.tsx`, `use-theme.ts`)
- Named exports for components
- LF line endings, 2-space indent, max 120 char line length

## Post Frontmatter

```yaml
title: string
summary: string
publishedDate: ISO date string
topic: string # e.g. NextJS, CSharp, React
tags: string[]
recommendedPosts: string[] # slugs of related posts
```
