<script>
    // import "uno.css";
    import "#lib/styles/shared.css";
    import SiteHeader from "#lib/components/SiteHeader.svelte";
    import SiteFooter from "#lib/components/SiteFooter.svelte";
    import { browser } from "$app/env";
    import { page } from "$app/state";
    let { children } = $props();
    let isNotRoot = $derived(page.url.pathname !== '/')

    if (browser) {
        const theme = localStorage.getItem("theme") || "device";
    }

</script>

{#if isNotRoot}
<SiteHeader />
{/if}

<hr />

<main>
    {@render children()}
</main>

{#if isNotRoot}
<SiteFooter />
{/if}
