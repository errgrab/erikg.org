<script>
  import { onMount } from 'svelte';
  let images = [
    'old-animated-wrong.gif', 'old-animated.gif', 'old-icon-black.png',
    'old-icon-chess.png', 'old-icon-diagonal-cut.png', 'old-icon-diagonal.png',
    'old-icon-fifty.png', 'old-icon-white.png', 'old-icon.png',
    'old-profile-picture.png', 'oldesticon-black.png', 'oldesticon.png',
    'other-eye.png', 'other-mask.png', 'other.png', 'plain-cube.png',
    'plan9-colors.png', 'planet.png', 'shatter.gif', 'star.png',
    'ascii-art.png', 'better.png', 'circles.gif', 'devine-colors.png',
    'dot-g.gif', 'effect-nicer.gif', 'effect.gif', 'geometric.png',
    'golden.png', 'icon-circles.png', 'icon-fdf.png', 'icon-glitch.gif',
    'icon-nice.png', 'iconbr.png', 'imagebw.png', 'imagewb.png',
    'lilith-outline.png', 'lilith.png', 'modern.png', 'moon-bw.gif',
    'moon.gif', 'my-first-icon-ever.png', 'need-fix.gif', 'nicecontrast.png',
    'nicest.png', 'plain.png', 'strange.png', 'the-white-cube-modern.png',
    'the-white-cube.png', 'the-white-cube1.png', 'time.gif', 'triangles.gif',
    'wallpaper-my-favorite-game.png', 'wallpaper-red.png', 'wallpaper.png',
    'yin.png'
  ];

  let lightboxOpen = false;
  let current = null;

  function openLightbox(src) {
    current = src;
    lightboxOpen = true;
  }

  function closeLightbox() {
    lightboxOpen = false;
    current = null;
  }

  onMount(() => {
    const handler = (e) => {
      if (e.key === 'Escape' && lightboxOpen) closeLightbox();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });
</script>

<main>
  <a class="back" href="/">← erikg.org</a>

  <div class="gallery-intro">
    <p class="section-label">about</p>
    <p>
      A collection of art worth preserving. Wallpapers, ascii art, 3D renders,
      animated gifs, icons. Not masterpieces, but they deserve a place to live.
    </p>
  </div>

  <p class="section-label">gallery</p>
  <div class="icon-grid" id="iconGrid">
    {#each images as img}
      <button type="button" class="icon-card" on click={() => openLightbox(img)}>
        <div class="icon-frame">
          <img src={`/gallery/${img}`} alt={img} />
        </div>
        <div class="icon-meta">
          <span class="icon-name">{img.replace(/[-.]/g, ' ')}</span>
          <span class="icon-desc"></span>
        </div>
      </button>
    {/each}
  </div>

  <div class={lightboxOpen ? 'lightbox open' : 'lightbox'} role="dialog" tabindex="0" on click={closeLightbox}>
    {#if current}
      <img src={`/gallery/${current}`} alt={current} />
      <div class="lightbox-meta">
        <div class="lightbox-name">{current}</div>
        <div class="lightbox-desc"></div>
      </div>
    {/if}
  </div>
</main>

<style>
/* Page-specific gallery styles (migrated from public/styles/gallery.css) */

.back {
  font-size: 0.6rem;
  color: var(--fg);
  opacity: 0.6;
  text-decoration: none;
  letter-spacing: 0.08em;
  transition:
    opacity 0.15s,
    color 0.15s;
}

.back:hover {
  color: var(--acc);
  opacity: 1;
}

.gallery-intro {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.gallery-intro p {
  font-size: 0.7rem;
  line-height: 1.7;
  opacity: 0.75;
  font-style: italic;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.icon-card {
  background: transparent;
  border: 1px solid color-mix(in srgb, var(--fg) 15%, transparent);
  border-radius: 6px;
  padding: 1.1rem 1rem 0.9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  overflow: hidden;
  transition:
    background 0.2s,
    border-color 0.2s;
  cursor: zoom-in;
}

.icon-card::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--acc);
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.2s ease;
}

.icon-card:hover {
  background: color-mix(in srgb, var(--fg) 2%, transparent);
  border-color: color-mix(in srgb, var(--fg) 40%, transparent);
}

.icon-card:hover::before {
  transform: scaleY(1);
}

.icon-frame {
  width: 128px;
  height: 128px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-frame img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  image-rendering: pixelated;
  pointer-events: none;
}

.icon-meta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  width: 100%;
  text-align: center;
}

.icon-name {
  font-size: 0.65rem;
  color: var(--fg);
  letter-spacing: 0.04em;
  line-height: 1.3;
}

.icon-desc {
  font-size: 0.55rem;
  color: var(--fg);
  opacity: 0.65;
  font-style: italic;
  line-height: 1.55;
}

.lightbox {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1.5rem;
  background: color-mix(in srgb, var(--bg) 88%, transparent);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.2s ease,
    visibility 0.2s ease;
  cursor: zoom-out;
}

.lightbox.open {
  opacity: 1;
  visibility: visible;
}

.lightbox img {
  max-width: min(80vw, 800px);
  max-height: 60vh;
  object-fit: contain;
  image-rendering: pixelated;
  border: 1px solid color-mix(in srgb, var(--fg) 20%, transparent);
  border-radius: 6px;
  transform: scale(0.92);
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
}

.lightbox.open img {
  transform: scale(1);
}

.lightbox-meta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  text-align: center;
  pointer-events: none;
}

.lightbox-name {
  font-size: 0.8rem;
  letter-spacing: 0.06em;
  color: var(--fg);
}

.lightbox-desc {
  font-size: 0.6rem;
  color: var(--fg);
  opacity: 0.6;
  font-style: italic;
}
@media (max-width: 600px) {
  .icon-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

</style>
