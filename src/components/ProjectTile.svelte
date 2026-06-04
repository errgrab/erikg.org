<script>
  let { project } = $props();

  const isDev =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname === '0.0.0.0');

  function resolveLink(input) {
    if (!input || !isDev) {
      return { href: input, target: '_blank', rel: 'noreferrer' };
    }

    try {
      const url = new URL(input);
      if (url.hostname === 'gallery.erikg.org') {
        return { href: '/gallery', target: undefined, rel: undefined };
      }
      if (url.hostname === 'ai.erikg.org') {
        return { href: '/ai', target: undefined, rel: undefined };
      }
      if (url.hostname === 'me.erikg.org') {
        return { href: '/me', target: undefined, rel: undefined };
      }
    } catch (e) {
      // ignore invalid URL
    }

    return { href: input, target: '_blank', rel: 'noreferrer' };
  }
</script>

{#if project.href}
  {@const link = resolveLink(project.href)}
  <a class="tile" href={link.href} target={link.target} rel={link.rel}>
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
