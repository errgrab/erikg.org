import adapter from '@sveltejs/adapter-cloudflare';
import { sveltekit } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';
import { createHighlighter } from '@svelte-dev/pretty-code';
import { defineConfig } from 'vite';

const mdsvexOptions = {
  extensions: ['.svx', '.md'],
  highlight: {
    highlighter: await createHighlighter({
      theme: 'github-dark',
      keepBackground: false
    })
  }
};

export default defineConfig({
  plugins: [
    sveltekit({
      adapter: adapter(),
      extensions: ['.svelte', '.svx', '.md'],
      preprocess: [mdsvex(mdsvexOptions)]
    })
    // UnoCSS()
  ]
});

