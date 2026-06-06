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

  let lightboxOpen = $state(false);
  let current = $state(null);

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

<div class="gallery-intro">
  <p class="section-label">about</p>
  <p>
    A collection of art worth preserving. Wallpapers, ascii art, 3D renders,
    animated gifs, icons. Not masterpieces, but they deserve a place to live.
  </p>
</div>

<br />

<p class="section-label">gallery</p>
<div class="icon-grid" id="iconGrid">
  {#each images as img}
    <button type="button" class="icon-card" onclick={() => openLightbox(img)}>
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

<div class={lightboxOpen ? 'lightbox open' : 'lightbox'} role="dialog" tabindex="0" onclick={closeLightbox} onkeydown={(e) => e.key === 'Escape' && closeLightbox()}>
  {#if current}
    <img src={`/gallery/${current}`} alt={current} />
    <div class="lightbox-meta">
      <div class="lightbox-name">{current}</div>
      <div class="lightbox-desc"></div>
    </div>
  {/if}
</div>
