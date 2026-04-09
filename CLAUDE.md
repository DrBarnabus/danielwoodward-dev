# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal tech blog built with Astro 6 (static SSG), Astro Content Collections with MDX, Tailwind 4, and Svelte for interactive islands. Deploying to Cloudflare Pages.

## Commands

- `pnpm dev` — start dev server
- `pnpm build` — production build (static output to `dist/`)
- `pnpm preview` — preview production build
- `pnpm check` — type check (astro check)
- `pnpm lint` — ESLint
- `pnpm format` — fix formatting with Prettier
- `pnpm format:check` — check formatting

Package manager is **pnpm** (10.33.0).

## Architecture

**Content pipeline:** MDX files in `src/content/` → Astro Content Collections (schema in `src/content.config.ts`) → two collections: `posts` and `pages`. Posts at `src/content/posts/{topic}/{slug}.mdx`, pages at `src/content/pages/{slug}.mdx`.

**Routing:** Astro pages in `src/pages/`. Dynamic post pages at `/posts/[...slug]` via `getStaticPaths`. Catch-all `/[...slug]` for static pages. OG images generated at build time via `/og/[...slug].png.ts`.

**MDX rendering:** Custom components passed at the page level via `mdxComponents` from `src/lib/mdx.ts`. Includes `CodeBlock`, `Figure`, `TableOfContents`, `CalloutPanel`, and link handling.

**Styling:** Tailwind 4 (CSS-first config) with `@tailwindcss/typography`. Dark mode via `class` strategy. Accent colour via CSS custom property `--color-accent`.

**Interactive islands:** Svelte components hydrated with `client:visible` (e.g. `TypingAnimation.svelte`). Theme toggle, copy-to-clipboard, share button, and relative time use vanilla JS.

**Path alias:** `~/` maps to `./src/` (configured in tsconfig).

## Conventions

- TypeScript `strictest` preset (extends Astro's — includes `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`)
- ESLint enforces `consistent-type-imports` (use `import type` where possible)
- Prettier with single quotes, semicolons, and Tailwind class sorting plugin
- Kebab-case file names for Astro/TS (`post-card.astro`, `date-formatting.ts`), PascalCase for Svelte (`TypingAnimation.svelte`)
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
