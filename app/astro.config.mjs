// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import bun from "@nurodev/astro-bun";

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  adapter: bun(),

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [svelte()]
});