import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://danielwoodward.dev',
  vite: {
    plugins: [tailwindcss()],
  },
});
