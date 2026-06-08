<script>
    let { title = "Erik", accent = "G", subtitle = "", href = "/" } = $props();
</script>

<a class="header-left" {href}>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-8 -8 16 16"
        width="32"
        aria-hidden="true"
    >
        <g
            transform="scale(3) rotate(45 0 0) translate(-1.5 -1.5)"
            stroke-linecap="round"
            stroke-width="0.5"
            stroke-linejoin="round"
        >
            <path d="m1 2h1v-1h1v2h-2z" fill="var(--acc)" stroke="var(--acc)" />
            <path d="m0 0h2v2h-2z" fill="none" stroke="var(--fg)" />
        </g>
    </svg>
    <div>
        <h1>{title}<span style="color: var(--acc)">{accent}</span></h1>
        {#if subtitle}
            <p class="subtitle">{subtitle}</p>
        {/if}
    </div>
</a>

<style>
    .header-left {
        display: flex;
        align-items: center;
        gap: var(--space-5);
        text-decoration: none;
        color: inherit;
    }

    .header-left h1 {
        font:
            700 var(--text-xl) "DM Mono",
            monospace;
        color: var(--fg);
    }

    .subtitle {
        margin-top: var(--space-1);
        font-size: var(--text-base);
        color: var(--fg);
        opacity: 0.6;
    }
</style>
