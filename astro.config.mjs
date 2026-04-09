import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://danielwoodward.dev',
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
