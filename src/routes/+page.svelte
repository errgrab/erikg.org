<script>
  import ProjectTile from '$lib/components/ProjectTile.svelte';
  import { projects } from '$lib/data/projects.js';
</script>

<h2 class="section-label">projects</h2>
<div class="grid">
  {#each projects as project}
    <ProjectTile {project} />
  {/each}
</div>
