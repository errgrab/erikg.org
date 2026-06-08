<script>
    let { project } = $props();

    function getLink(project) {
        return project.href ?? project.link ?? null;
    }

    function getDescription(project) {
        return project.desc ?? project.description ?? "";
    }

    function resolveLink(input) {
        if (!input) {
            return { href: null, target: undefined, rel: undefined };
        }

        if (input.startsWith("/")) {
            return { href: input, target: undefined, rel: undefined };
        }

        return { href: input, target: "_blank", rel: "noreferrer" };
    }
</script>

{#if getLink(project)}
    {@const link = resolveLink(getLink(project))}
    <a class="tile" href={link.href} target={link.target} rel={link.rel}>
        <span class="name">{project.name}</span>
        <span class="desc">{getDescription(project)}</span>
        {#if project.tag}
            <span class="tag">{project.tag}</span>
        {/if}
    </a>
{:else}
    <div class="tile muted">
        <span class="name">{project.name}</span>
        <span class="desc">{getDescription(project)}</span>
        {#if project.tag}
            <span class="tag">{project.tag}</span>
        {/if}
    </div>
{/if}
