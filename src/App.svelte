<script>
  import ProjectTile from "./components/ProjectTile.svelte";
  import SiteFooter from "./components/SiteFooter.svelte";
  import SiteHeader from "./components/SiteHeader.svelte";
  import { projects } from "./data/projects.js";
</script>

<SiteHeader />
<hr />

<main>
  <h2 class="section-label">projects</h2>
  <div class="grid">
    {#each projects as project}
      <ProjectTile {project} />
    {/each}
  </div>
</main>

<SiteFooter />
