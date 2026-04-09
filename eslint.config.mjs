import { defineConfig } from 'eslint/config';
import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default defineConfig(
  tseslint.configs.recommended,
  eslintPluginAstro.configs.recommended,
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': 'warn',
    },
  },
  {
    ignores: ['dist/', '.astro/', 'node_modules/'],
  },
);
