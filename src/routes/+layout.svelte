<script>
  import '$lib/styles/shared.css';
  import SiteHeader from '$lib/components/SiteHeader.svelte';
  import SiteFooter from '$lib/components/SiteFooter.svelte';
  import { browser } from '$app/environment';
  import { applyRootTheme } from '$lib/themes.js';

  if (browser) {
    const theme = localStorage.getItem('theme') || 'classic';
    applyRootTheme(theme);
  }
</script>

<SiteHeader />

<hr />

<main>
  <slot />
</main>

<SiteFooter />
