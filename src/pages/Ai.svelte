<script>
  const aiPages = [
    { name: 'git fame', file: 'git-fame.html', desc: 'repo visualizer for git fame output' },
    { name: 'todo', file: 'todo.html', desc: 'todo app' },
    { name: 'todos', file: 'todos.html', desc: 'todos management' },
    { name: 'admin', file: 'admin.html', desc: 'admin panel' },
    { name: 'brand', file: 'brand.html', desc: 'brand guidelines' },
    { name: 'chatgpt notes', file: 'chatgpt-notes.html', desc: 'notes from chatgpt' },
    { name: 'escala', file: 'escala.html', desc: 'escala tool' },
    { name: 'kah', file: 'kah.html', desc: 'kah tool' },
    { name: 'modern ui guidelines', file: 'modern-ui-guidelines.html', desc: 'modern ui guidelines' },
    { name: 'pomodoro', file: 'pomodoro.html', desc: 'pomodoro timer' },
    { name: 'ui guidelines', file: 'ui-guidelines.html', desc: 'ui guidelines' },
  ];
</script>

<main>
  <div class="ai-intro">
    <p class="section-label">about</p>
    <p>
      Pages created with AI assistance. Each links to a static HTML page
      that can be viewed directly.
    </p>
  </div>

  <br />

  <p class="section-label">ai pages</p>
  <div class="ai-grid">
    {#each aiPages as page}
      <a class="ai-card" href={`/ai/${page.file}`}>
        <span class="ai-name">{page.name}</span>
        <span class="ai-desc">{page.desc}</span>
      </a>
    {/each}
  </div>
</main>

<style>
.ai-intro {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.ai-intro p {
  font-size: 0.7rem;
  line-height: 1.7;
  opacity: 0.75;
  font-style: italic;
}

.ai-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.ai-card {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.8rem 1rem;
  border: 1px solid color-mix(in srgb, var(--fg) 15%, transparent);
  border-radius: 6px;
  text-decoration: none;
  transition:
    background 0.2s,
    border-color 0.2s;
}

.ai-card:hover {
  background: color-mix(in srgb, var(--fg) 2%, transparent);
  border-color: color-mix(in srgb, var(--fg) 40%, transparent);
}

.ai-name {
  font-size: 0.7rem;
  color: var(--fg);
  letter-spacing: 0.04em;
}

.ai-desc {
  font-size: 0.6rem;
  color: var(--fg);
  opacity: 0.6;
  font-style: italic;
}

@media (max-width: 600px) {
  .ai-grid {
    grid-template-columns: 1fr;
  }
}
</style>