<script>
    import Logo from "./Logo.svelte";

    let { title = "ErikG", href = "/site" } = $props();
</script>

<header>
    <Logo {title} {href} />
</header>

<style>
    header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }
</style>
