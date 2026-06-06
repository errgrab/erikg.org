<script>
  const aiPages = [
    { name: 'git fame', file: 'git-fame', desc: 'repo visualizer for git fame output' },
    { name: 'todo', file: 'todo', desc: 'todo app' },
    { name: 'todos', file: 'todos', desc: 'todos management' },
    { name: 'admin', file: 'admin', desc: 'admin panel' },
    { name: 'brand', file: 'brand', desc: 'brand guidelines' },
    { name: 'chatgpt notes', file: 'chatgpt-notes', desc: 'notes from chatgpt' },
    { name: 'escala', file: 'escala', desc: 'escala tool' },
    { name: 'kah', file: 'kah', desc: 'kah tool' },
    { name: 'modern ui guidelines', file: 'modern-ui-guidelines', desc: 'modern ui guidelines' },
    { name: 'pomodoro', file: 'pomodoro', desc: 'pomodoro timer' },
    { name: 'ui guidelines', file: 'ui-guidelines', desc: 'ui guidelines' },
  ];
</script>

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
    <a class="ai-card" href={`/ai-pages/${page.file}`}>
      <span class="ai-name">{page.name}</span>
      <span class="ai-desc">{page.desc}</span>
    </a>
  {/each}
</div>
