# Astro Migration Plan

Migration plan for rebuilding the site from Next.js 14 + Contentlayer to Astro + Astro Content Collections.

## Decisions

| Area                | Decision                                   |
| ------------------- | ------------------------------------------ |
| Framework           | Astro (latest)                             |
| Content             | Astro Content Collections with MDX         |
| Rendering           | Fully static (SSG)                         |
| Deployment target   | Cloudflare Pages                           |
| Styling             | Tailwind 4 + plain CSS (no SCSS)           |
| Interactive islands | Svelte (via `@astrojs/svelte`)             |
| Theme toggle        | Vanilla JS inline script                   |
| Typing animation    | Hand-rolled Svelte component               |
| Copy-to-clipboard   | Vanilla JS                                 |
| Share button        | Vanilla JS                                 |
| Relative time       | Vanilla JS                                 |
| OG images           | Build-time generation with satori + sharp  |
| Fonts (browser)     | Fontsource (`@fontsource/inter`)           |
| Fonts (OG)          | Raw TTF files read by satori at build time |
| Analytics           | Cloudflare Web Analytics (script tag)      |
| RSS                 | `@astrojs/rss`                             |
| URL structure       | Preserve existing paths exactly            |
| Comments            | Out of scope — revisit later               |

## Phase 1 — Project Scaffold

Start from a clean orphan branch in the same repository. Only install dependencies as they are needed in each phase.

### Steps

1. Create an orphan branch (`astro`) with no history
2. Initialise a new Astro project with only the dependencies needed for this phase:
   - `astro`
   - `tailwindcss` (v4)
   - `@tailwindcss/typography`
   - `@tailwindcss/vite`
   - `@fontsource/inter`
3. Copy over and update tooling configs to their latest versions:
   - `.editorconfig` — copy as-is
   - Prettier: upgrade to latest, use flat config (`prettier.config.mjs`), add `prettier-plugin-astro` and `prettier-plugin-tailwindcss`. Note: plugin ordering matters — list `prettier-plugin-astro` before `prettier-plugin-tailwindcss`
   - ESLint: upgrade to v9 flat config (`eslint.config.mjs`), add `eslint-plugin-astro` and `typescript-eslint`
   - `.prettierignore` — adapt for Astro (ignore `dist/`, `.astro/` instead of `.next/`)
4. Configure TypeScript (`tsconfig.json`):
   - Extend Astro's strict preset
   - Set up `~/` path alias mapping to `./src/`
5. Set up `astro.config.mjs`:
   - Output: `static`
   - `site`: set to the production URL (needed from Phase 4 onwards for canonical URLs, share buttons, metadata)
   - Tailwind 4 via Vite plugin (`vite.plugins` array, not an Astro integration)
   - Other integrations added in later phases as needed
6. Set up Tailwind 4:
   - CSS-first configuration
   - Migrate custom theme values (accent colour CSS variable, Inter font family)
   - The current accent colour uses Tailwind v3's space-separated RGB pattern (`223 53 84`) for opacity modifier support (`bg-accent/80`). Tailwind 4 handles custom colours and opacity modifiers differently — this needs reworking, not just copying across
   - Replace the custom grid layout templates with flexbox-based max-width centring (e.g. `max-w-5xl mx-auto`)
7. Create global CSS file (replaces `global.scss`, `_base.scss`):
   - Tailwind 4 imports
   - CSS custom properties (`--color-accent` for light/dark)
   - Smooth scrolling with `prefers-reduced-motion`
   - Text rendering optimisation
   - Font imports via Fontsource

### Outputs

- Clean Astro project that builds with `pnpm build`
- Tailwind 4 working with the accent colour
- Tooling (ESLint, Prettier) on latest versions with Astro support
- No pages yet — just the scaffold

---

## Phase 2 — Layout & Chrome

Build the site shell: layout, header, footer, theme toggle.

### Steps

1. Create the base layout (`src/layouts/BaseLayout.astro`):
   - `<html>` with `lang="en"` and `class` attribute for dark mode
   - `<head>` with meta tags, Fontsource import, Cloudflare Analytics script, global CSS
   - Flexbox column layout (`min-h-dvh`, `flex-grow` on main) with sticky header and footer
2. Port the header (`src/components/Header.astro`):
   - Navigation links
   - Theme toggle button with sun/moon/display icons
   - Scroll-based transparency (vanilla JS inline script)
3. Port the footer (`src/components/Footer.astro`):
   - Social links (GitHub, Medium, Twitter/X, LinkedIn)
   - Copyright year
4. Implement theme toggle (vanilla JS inline script in `BaseLayout.astro`):
   - Three states: device / light / dark
   - Persist to cookie
   - Apply `dark` class to `<html>` based on preference + system media query
   - Script in `<head>` to avoid flash of wrong theme
5. Port SVG icon components to Astro components (`src/components/icons/`)
6. Copy over static assets to `public/`:
   - Favicon (`favicon.ico`)
   - PWA-style icon files (`icon-96x96.png`, `icon-144x144.png`, `icon-256x256.png`, `icon-512x512.png`)
   - Font files for OG generation (`assets/fonts/Inter-Bold.ttf`, `Inter-SemiBold.ttf`)
   - Post images and memes (`images/`)
7. Set up SEO defaults in the layout:
   - Title template: `%s | <DanielWoodward />`
   - Default meta description, author, keywords
   - OG and Twitter card defaults
   - Canonical URL
   - Reference icon assets in `<head>`

### Outputs

- Navigable site shell with header, footer, and working theme toggle
- No content pages yet

---

## Phase 3 — Content Collections & MDX Pipeline

Migrate content from Contentlayer to Astro Content Collections.

### Dependencies to install

- `@astrojs/mdx`
- `remark-gfm`
- `remark-unwrap-images`
- `rehype-slug`
- `rehype-autolink-headings`
- `hastscript`

Not needed: `rehype-pretty-code` and `shiki` — Astro has Shiki built-in and configurable directly in `astro.config.mjs`.

### Steps

#### 3a — Content collections setup `[commit]`

1. Install dependencies and add MDX integration to `astro.config.mjs`
2. Define content collection schemas in `src/content.config.ts`:
   - **Posts** collection:
     - `title` (string)
     - `summary` (string)
     - `publishedDate` (date)
     - `topic` (string)
     - `tags` (string array)
     - `recommendedPosts` (string array, optional)
   - **Pages** collection:
     - `title` (string)
     - `description` (string)
3. Copy MDX files into Astro's content directory structure:
   - `src/content/posts/{topic}/{slug}.mdx` — drop the `YYYYMMDD-` prefix from filenames (date lives in frontmatter, prefix would leak into the URL otherwise)
   - `src/content/pages/{slug}.mdx`
   - Note: `react/hooks/useEventListener.mdx` is three levels deep — verify the collection glob picks it up and the slug resolves correctly
4. Update frontmatter in MDX files if needed (Astro Content Collections validates against the schema)

#### 3b — Remark/rehype plugins and Shiki `[commit]`

5. Configure remark/rehype plugins and Shiki in `astro.config.mjs`:
   - `remark-gfm` — GitHub Flavoured Markdown
   - `remark-unwrap-images` — remove `<p>` wrapper from images
   - `rehype-slug` — add IDs to headings
   - `rehype-autolink-headings` — anchor links on headings (with same SVG icon config)
   - Shiki syntax highlighting (built-in, no plugin needed):
     - Dual themes: `github-light` / `github-dark`

#### 3c — Utilities `[commit]`

6. Create helper utilities (`src/lib/`):
   - `getFormattedDateTime()` — port date formatting logic
   - `getReadingTime()` — calculate reading time (words / 200)
   - `getSortedPosts()` — fetch and sort posts by date

#### 3d — Custom MDX components `[commit]`

7. Build custom MDX components as Astro components:
   - `CodeBlock.astro` — wraps `<pre>` with copy-to-clipboard button (vanilla JS)
   - `Figure.astro` — image handling with caption support. The current site uses a JSON-in-alt-text pattern (`![{"width": 497, "alt": "...", "caption": "..."}](/images/...)`) to pass metadata. Many images are GIFs in `public/` marked `unoptimized: true`, which Astro's `<Image>` doesn't handle — use standard `<img>` for these and Astro `<Image>` only where optimisation applies
   - `TableOfContents.astro` — collapsible TOC
   - `CalloutPanel.astro` — styled callout boxes (info/note/success/warning/error)
   - Link handling — internal links vs external links (open in new tab)
   - Note: Astro MDX does not support global component overrides like Next.js/Contentlayer. Components are passed at the page level when rendering MDX content.

#### 3e — Prose and syntax highlighting styles `[commit]`

8. Port `@tailwindcss/typography` prose styles and customisations (dark mode, link colours, heading styles). Tailwind 4 uses CSS-first configuration for prose — expect differences from v3's JS-based customisation.
9. Write syntax highlighting CSS against Astro's Shiki output. Note: Astro's built-in Shiki produces different HTML structure (class names, `data-` attributes, dual-theme handling) than `rehype-pretty-code` — these styles need to be written fresh, not ported line-for-line.
   - Heading anchor link styles
   - Shiki dual-theme styles (light/dark)
   - Code block line numbers
   - Adjacent code block styling
   - Code block titles: `rehype-pretty-code` renders these as `<figcaption>` elements — Astro's built-in Shiki does not. If any posts use code block titles, an alternative approach is needed (e.g. a rehype plugin or wrapper component)

#### 3f — Verification `[commit]`

10. Create a temporary test page to verify MDX rendering, custom components, prose styles, and syntax highlighting. Remove in Phase 4 when real pages exist.

### Outputs

- Content collections with validated schemas
- All MDX files building and rendering correctly on the test page
- Custom components working in MDX
- Prose and syntax highlighting styles verified

---

## Phase 4 — Pages & Routing

Build all the pages, preserving the existing URL structure.

### Steps

1. **Homepage** (`src/pages/index.astro`):
   - Hero section with static placeholder text (replaced with Svelte typing animation in Phase 5)
   - Latest 3 posts section using `PostCard` component
   - Projects section with GitHub links
2. **Posts index** (`src/pages/posts/index.astro`):
   - All posts sorted by date (newest first)
   - `PostCard` component for each
3. **Individual post pages** (`src/pages/posts/[...slug].astro`):
   - Use `getStaticPaths()` to generate routes matching `/posts/{topic}/{slug}`
   - Post header: title, reading time, published date, tags
   - MDX content rendering with custom components
   - Post footer: share button, feedback message, recommended posts
4. **Static pages** (`src/pages/[...slug].astro`):
   - Use `getStaticPaths()` for pages collection
   - Currently only `/about`
5. **404 page** (`src/pages/404.astro`):
   - Custom 404 with icon
6. Create shared page components:
   - `PostCard.astro` — with compact/superCompact variants (conditional Tailwind classes)
   - `PostHeader.astro` — title, reading time, date, tags
   - `PostFooter.astro` — share button, recommended posts
   - `PostTags.astro` — tag badges
   - `PostPublished.astro` — published date with relative time (vanilla JS for the updating interval)
   - `ShareButton.astro` — `navigator.share` with fallback (vanilla JS)
7. Set up per-page metadata:
   - Posts: `type: article`, `publishedTime`, canonical URL
   - Pages: `type: article`, canonical URL
   - Pass to `BaseLayout.astro` via props for `<head>` rendering
   - OG image meta tags will reference paths like `/og/posts/csharp/my-post.png` — these won't resolve until Phase 6, which is fine during development

### Outputs

- All pages rendering with correct URLs
- Navigation between pages works
- Metadata and SEO tags correct on every page (OG images pending Phase 6)

---

## Phase 5 — Interactive Islands

Build the Svelte components for anything that needs client-side interactivity.

### Dependencies to install

- `@astrojs/svelte`
- `svelte`

### Steps

1. Install dependencies and add Svelte integration to `astro.config.mjs`
2. **Typing animation** (`src/components/TypingAnimation.svelte`):
   - Replace the static placeholder from Phase 4 with the Svelte island
   - Hand-rolled component that types out strings character by character
   - Cursor blinking effect
   - Match current behaviour of `react-typist-component` usage on homepage
   - Hydrate with `client:visible` directive
3. Verify all vanilla JS interactions are working:
   - Theme toggle (already done in Phase 2)
   - Copy-to-clipboard on code blocks
   - Share button
   - Relative time updates on `PostPublished`

### Outputs

- Typing animation working on homepage
- All interactive elements functional
- Minimal client-side JS shipped

---

## Phase 6 — OG Image Generation

Generate OG images at build time for all pages.

### Dependencies to install

- `satori`
- `sharp`

### Steps

1. Install dependencies
2. Create an OG image generation utility (`src/lib/og-image.ts`):
   - Use `satori` to render HTML/CSS to SVG
   - Use `sharp` to convert SVG to PNG
   - Load `Inter-Bold.ttf` from `public/assets/fonts/`
   - Match current design: 1200x630px, accent colour (#E93554), centred layout
   - Note: satori uses inline styles, not Tailwind — this is a separate styling context
   - satori expects a virtual DOM tree, not real JSX. Use satori's `html` tagged template literal helper to define the layout, or use `React.createElement`-style objects. Astro `.ts` endpoints don't support JSX natively
3. Create Astro endpoint at `src/pages/og/[...slug].png.ts`:
   - Use `getStaticPaths()` to generate an image for every post and page
   - Astro handles this as part of the normal build — no separate script needed
4. Reference generated OG images in page metadata (e.g. `/og/posts/csharp/my-post.png`)

### Outputs

- OG image generated for every page at build time
- Metadata references the correct OG image URL on each page

---

## Phase 7 — RSS, Sitemap & Robots

### Dependencies to install

- `@astrojs/rss`
- `@astrojs/sitemap`

### Steps

1. Install dependencies and add Sitemap integration to `astro.config.mjs`
2. **RSS feed** (`src/pages/rss.xml.ts`):
   - Use `@astrojs/rss`
   - Include all posts with title, summary, date, and link
   - Add `<link>` tag to RSS feed in `<head>`
3. **Sitemap**:
   - `@astrojs/sitemap` integration handles this automatically
   - Configure in `astro.config.mjs` with `site` URL
4. **Robots.txt** (`public/robots.txt`):
   - Allow all routes
   - Reference sitemap URL

### Outputs

- RSS feed at `/rss.xml`
- Sitemap at `/sitemap-index.xml`
- Robots.txt referencing sitemap

---

## Phase 8 — Polish & Verification

### Steps

1. Cross-reference every page against the current live site:
   - Visual comparison of homepage, posts index, individual posts, about page, 404
   - Check dark mode on all pages
   - Check mobile responsiveness
2. Verify all URLs match the current site exactly
3. Test all interactive features:
   - Theme toggle (3 states, persistence, no flash)
   - Code block copy-to-clipboard
   - Share button
   - Typing animation
   - Relative time updates
4. Validate metadata and SEO:
   - OG images rendering correctly when shared
   - Canonical URLs correct
   - Sitemap includes all pages
   - RSS feed validates
5. Run Lighthouse audit
6. Test the build output:
   - `pnpm build` succeeds
   - All pages generated as static HTML
   - No unexpected client-side JS bundles

### Outputs

- Fully functional static site matching current site
- All features verified

---

## Phase 9 — Cloudflare Pages Deployment

### Steps

1. Connect repository to Cloudflare Pages
2. Configure build settings:
   - Build command: `pnpm build`
   - Output directory: `dist/`
3. Set up custom domain
4. Add Cloudflare Web Analytics
5. Verify site is live and analytics are reporting

### Outputs

- Site deployed to Cloudflare Pages
- Custom domain configured
- Analytics active

---

## Dependency Summary

### Production

| Package             | Purpose                           |
| ------------------- | --------------------------------- |
| `astro`             | Framework                         |
| `@astrojs/mdx`      | MDX support                       |
| `@astrojs/svelte`   | Svelte island support             |
| `@astrojs/sitemap`  | Sitemap generation                |
| `@astrojs/rss`      | RSS feed                          |
| `svelte`            | Interactive components            |
| `@fontsource/inter` | Self-hosted Inter font            |
| `satori`            | OG image generation (HTML to SVG) |
| `sharp`             | OG image generation (SVG to PNG)  |

### MDX Plugins

| Package                    | Purpose                                        |
| -------------------------- | ---------------------------------------------- |
| `remark-gfm`               | GitHub Flavoured Markdown                      |
| `remark-unwrap-images`     | Remove `<p>` wrapper from images               |
| `rehype-slug`              | Add IDs to headings                            |
| `rehype-autolink-headings` | Anchor links on headings                       |
| `hastscript`               | HTML AST construction (for heading link icons) |

### Dev

| Package                       | Purpose                |
| ----------------------------- | ---------------------- |
| `typescript`                  | Type checking          |
| `prettier`                    | Formatting             |
| `prettier-plugin-astro`       | Astro file formatting  |
| `prettier-plugin-tailwindcss` | Tailwind class sorting |
| `eslint`                      | Linting                |
| `eslint-plugin-astro`         | Astro linting rules    |
| `@tailwindcss/typography`     | Prose styling          |
| `tailwindcss`                 | Tailwind 4             |

### Removed (no longer needed)

| Package                             | Reason                                           |
| ----------------------------------- | ------------------------------------------------ |
| `next`                              | Replaced by Astro                                |
| `react`, `react-dom`                | Replaced by Svelte for islands, Astro for static |
| `contentlayer`, `next-contentlayer` | Replaced by Astro Content Collections            |
| `rehype-pretty-code`, `shiki`       | Replaced by Astro's built-in Shiki               |
| `react-typist-component`            | Replaced by hand-rolled Svelte component         |
| `grapheme-splitter`                 | Used by typist component, no longer needed       |
| `js-cookie`                         | Cookie handling done with vanilla JS             |
| `@vercel/og`                        | Replaced by satori + sharp at build time         |
| `@vercel/analytics`                 | Replaced by Cloudflare Web Analytics             |
| `@vercel/speed-insights`            | No equivalent needed                             |
| `class-variance-authority`          | Conditional Tailwind classes are sufficient      |
| `sass`                              | Replaced by plain CSS                            |
| `next-sitemap`                      | Replaced by `@astrojs/sitemap`                   |

---

## File Structure

```
public/
├── assets/
│   └── fonts/
│       ├── Inter-Bold.ttf          # For OG image generation
│       └── Inter-SemiBold.ttf
├── favicon.ico
├── images/                         # Post images, memes, etc.
src/
├── components/
│   ├── icons/
│   │   ├── Check.astro
│   │   ├── ChevronDown.astro
│   │   ├── Copy.astro
│   │   ├── Copyright.astro
│   │   ├── Display.astro
│   │   ├── GitHub.astro
│   │   ├── LinkedIn.astro
│   │   ├── Medium.astro
│   │   ├── Moon.astro
│   │   ├── NotDef.astro
│   │   ├── Share.astro
│   │   ├── Sun.astro
│   │   └── Twitter.astro
│   ├── markdown/
│   │   ├── CodeBlock.astro
│   │   ├── Figure.astro
│   │   ├── TableOfContents.astro
│   │   └── CalloutPanel.astro
│   ├── post/
│   │   ├── PostCard.astro
│   │   ├── PostFooter.astro
│   │   ├── PostHeader.astro
│   │   ├── PostPublished.astro
│   │   ├── PostTags.astro
│   │   └── ShareButton.astro
│   ├── Header.astro
│   ├── Footer.astro
│   ├── TypingAnimation.svelte
│   ├── WelcomeHeroSection.astro
│   ├── WelcomePostsSection.astro
│   └── WelcomeProjectsSection.astro
├── content/
│   ├── posts/
│   │   ├── csharp/
│   │   │   ├── csharp-11-static-abstract-members-in-interfaces.mdx
│   │   │   └── how-to-efficiently-read-ndjson-in-dotnet-with-pipes.mdx
│   │   ├── nextjs/
│   │   │   ├── how-i-built-my-personal-blog-with-nextjs-13-vercel-and-contentlayer-post-1.mdx
│   │   │   ├── how-i-built-my-personal-blog-with-nextjs-13-vercel-and-contentlayer-post-2.mdx
│   │   │   └── how-i-built-my-personal-blog-with-nextjs-13-vercel-and-contentlayer-post-3.mdx
│   │   └── react/
│   │       └── hooks/
│   │           └── useEventListener.mdx
│   └── pages/
│       └── about.mdx
├── content.config.ts
├── layouts/
│   └── BaseLayout.astro
├── lib/
│   ├── date-formatting.ts
│   ├── og-image.ts
│   └── posts.ts
├── pages/
│   ├── posts/
│   │   ├── [...slug].astro
│   │   └── index.astro
│   ├── og/
│   │   └── [...slug].png.ts
│   ├── [...slug].astro
│   ├── 404.astro
│   ├── index.astro
│   └── rss.xml.ts
└── styles/
    └── global.css
```

---

## Migration Order

The phases are designed to be worked through sequentially. Each phase builds on the previous one and produces a testable output. Within each phase, steps should be completed in order.

The branch can be merged to `main` once Phase 8 is complete and verified. Phase 9 (Cloudflare deployment) can happen after the merge.
