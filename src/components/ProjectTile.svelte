<script>
  let { project } = $props();
</script>

{#if project.href}
  <a class="tile" href={project.href} target="_blank" rel="noreferrer">
    <span class="host">{project.host}</span>
    <span class="name">{project.name}</span>
    <span class="desc">{project.desc}</span>
    <span class="tag">{project.tag}</span>
  </a>
{:else}
  <div class="tile muted">
    <span class="host">{project.host}</span>
    <span class="name">{project.name}</span>
    <span class="desc">{project.desc}</span>
    <span class="tag">{project.tag}</span>
  </div>
{/if}
