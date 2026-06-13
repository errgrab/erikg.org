<script>
    const modules = import.meta.glob("./pages/*.md", { eager: true });

    const entries = Object.entries(modules).map(([path, mod]) => ({
        slug: path.split("/").pop().replace(".md", ""),
        meta: mod.metadata, // frontmatter, if mdsvex configured for it
    }));
</script>

<div class="grid">
    {#each entries as { slug, meta }}
        <a href={`/garden/pages/${slug}`} target="" rel="" class="tile">
            <h3>{meta.title}</h3>
            <p>{meta.desc}</p>
            <div class="tags">
                {#each meta.tags as tag}
                    <span class="tag">{tag}</span>
                {/each}
            </div>
        </a>
    {/each}
</div>

<style>
    .tags {
        display: flex;
        gap: 0.5rem;
        margin-top: 0.5rem;
    }
</style>
