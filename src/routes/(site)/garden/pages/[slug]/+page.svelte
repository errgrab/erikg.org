<script>
    export let data;
</script>

<a href="/garden" class="back-link"> ← back to garden</a>

<div class="prose">
    <svelte:component this={data.content} />
</div>

<style>
    .back-link {
        display: inline-block;
        font-size: 0.8rem;
        margin-bottom: 1rem;
        color: var(--fg-muted);
        text-decoration: none;
    }
    .back-link:hover {
        text-decoration: underline;
        color: var(--acc);
    }
    .prose :global(h1) {
        font-size: 1.8rem;
        margin-block: 1.5rem 0.5rem;
        color: var(--fg);
    }
    .prose :global(h2) {
        font-size: 1.4rem;
        margin-block: 1.25rem 0.5rem;
        color: var(--fg);
    }
    .prose :global(p) {
        line-height: 1.6;
        margin-block: 0.75rem;
        padding-bottom: 1rem;
        color: var(--fg);
    }
    .prose :global(ul),
    .prose :global(ol) {
        padding-left: 1.5rem;
        margin-block: 0.75rem;
    }
    .prose :global(li) {
        margin-block: 0.25rem;
    }
    .prose :global(a) {
        color: var(--acc);
        text-decoration: underline;
    }
    .prose :global(code) {
        background: var(--sur);
        padding: 0.15rem 0.35rem;
        border-radius: 4px;
        font-family: monospace;
        font-size: 0.9em;
    }
    .prose :global(pre) {
        background: var(--sur);
        padding: 1rem;
        border-radius: 8px;
        overflow-x: auto;
    }
    .prose :global(blockquote) {
        border-left: 3px solid var(--acc);
        padding-left: 1rem;
        margin-block: 0.75rem;
        opacity: 0.85;
    }
    .prose :global(strong) {
        font-weight: 700;
    }
    .prose :global(em) {
        font-style: italic;
    }
</style>
