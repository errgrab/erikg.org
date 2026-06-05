<script>
  import ProjectTile from "../components/ProjectTile.svelte";
  import { projects } from "../data/projects.js";
</script>

<section class="hero">
  <div class="eyebrow">open to work · Porto, PT</div>
  <h2>builder of tools<br /><em>&amp; ecosystems.</em></h2>
  <p>
    I build things for the web from first principles. I care about
    infrastructure that lasts, systems that compose cleanly, and software
    with a clear point of view.
  </p>
  <div class="hero-links">
    <a href="mailto:contact@erikg.org" class="tag">contact@erikg.org</a>
    <a href="https://github.com/errgrab" target="_blank" class="tag">github ↗</a>
  </div>
</section>

<section id="projects">
  <h3 class="section-label">projects</h3>
  <div class="grid single">
    {#each projects as project}
      <ProjectTile {project} />
    {/each}
  </div>
</section>

<section id="skills">
  <h3 class="section-label">skills & tools</h3>
  <div class="grid">
    <div class="tile">
      <span class="host">stack</span>
      <span class="name">Languages</span>
      <ul>
        <li>JavaScript / TypeScript</li>
        <li>Python</li>
        <li>C / C++ / C#</li>
        <li>HTML / CSS</li>
      </ul>
    </div>
    <div class="tile">
      <span class="host">ops</span>
      <span class="name">Infrastructure</span>
      <ul>
        <li>Cloudflare Workers + KV</li>
        <li>GitHub Actions CI/CD</li>
        <li>Vite / Wrangler</li>
      </ul>
    </div>
  </div>
</section>

<section id="contact">
  <h3 class="section-label">get in touch</h3>
  <div class="grid">
    <a class="tile" href="mailto:contact@erikg.org">
      <span class="host">email</span>
      <span class="name" style="color: var(--acc)">contact@erikg.org</span>
    </a>
    <a class="tile" href="https://github.com/errgrab" target="_blank">
      <span class="host">github</span>
      <span class="name" style="color: var(--acc)">github.com/errgrab</span>
    </a>
  </div>
</section>

<!-- keep footer provided by App -->

<style>

section {
  margin-top: 3rem;
}

.hero {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.hero .eyebrow {
  font-size: 0.55rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--acc);
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.hero .eyebrow::before {
  content: "";
  display: block;
  width: 24px;
  height: 1px;
  background: var(--acc);
}

.hero h2 {
  font-size: 1.8rem;
  font-weight: 300;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.hero h2 em {
  color: var(--acc);
  font-style: italic;
}

.hero p {
  font-size: 0.85rem;
  opacity: 0.8;
  line-height: 1.75;
}

.hero-links {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

.tile .host {
  text-transform: uppercase;
}

.tile ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-top: 0.25rem;
}

.tile ul li {
  font-size: 0.7rem;
  opacity: 0.8;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.tile ul li::before {
  content: "\00b7";
  color: var(--acc);
  font-weight: bold;
}

</style>
