import { mdsvex } from 'mdsvex';
import { createHighlighter } from '@svelte-dev/pretty-code';
import adapter from '@sveltejs/adapter-cloudflare';

const mdsvexOptions = {
  extensions: ['.svx', '.md'],
  highlight: {
    highlighter: await createHighlighter({
      theme: 'github-dark',
      keepBackground: false
    })
  }
};

export default {
  extensions: ['.svelte', '.svx', '.md'],
  preprocess: [mdsvex(mdsvexOptions)],
  kit: {
    adapter: adapter()
  }
};