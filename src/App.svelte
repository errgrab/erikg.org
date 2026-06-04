<script>
  import "./styles/shared.css";
  import ProjectTile from "./components/ProjectTile.svelte";
  import SiteFooter from "./components/SiteFooter.svelte";
  import SiteHeader from "./components/SiteHeader.svelte";
  import { projects } from "./data/projects.js";
  import Me from "./pages/Me.svelte";
  import Gallery from "./pages/Gallery.svelte";
  import Ai from "./pages/Ai.svelte";

  // simple client-side routing by pathname
  let route = window.location.pathname || "/";

  function navigate(path) {
    if (path === route) return;
    history.pushState({}, '', path);
    route = path;
    window.scrollTo(0,0);
  }

  window.addEventListener('popstate', () => {
    route = window.location.pathname;
  });
</script>

<SiteHeader {navigate} />
<hr />

{#if route === '/me'}
  <Me />
{:else if route === '/gallery'}
  <Gallery />
{:else if route === '/ai'}
  <Ai />
{:else}
  <main>
    <h2 class="section-label">projects</h2>
    <div class="grid">
      {#each projects as project}
        <ProjectTile {project} />
      {/each}
    </div>
  </main>
{/if}

<SiteFooter />
