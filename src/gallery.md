---
layout: layouts/base.njk
title: Gallery
permalink: /gallery/
script: /js/gallery.js
images:
  - old-animated-wrong.gif
  - old-animated.gif
  - old-icon-black.png
  - old-icon-chess.png
  - old-icon-diagonal-cut.png
  - old-icon-diagonal.png
  - old-icon-fifty.png
  - old-icon-white.png
  - old-icon.png
  - old-profile-picture.png
  - oldesticon-black.png
  - oldesticon.png
  - other-eye.png
  - other-mask.png
  - other.png
  - plain-cube.png
  - plan9-colors.png
  - planet.png
  - shatter.gif
  - star.png
  - ascii-art.png
  - better.png
  - circles.gif
  - devine-colors.png
  - dot-g.gif
  - effect-nicer.gif
  - effect.gif
  - geometric.png
  - golden.png
  - icon-circles.png
  - icon-fdf.png
  - icon-glitch.gif
  - icon-nice.png
  - iconbr.png
  - imagebw.png
  - imagewb.png
  - lilith-outline.png
  - lilith.png
  - modern.png
  - moon-bw.gif
  - moon.gif
  - my-first-icon-ever.png
  - need-fix.gif
  - nicecontrast.png
  - nicest.png
  - plain.png
  - strange.png
  - the-white-cube-modern.png
  - the-white-cube.png
  - the-white-cube1.png
  - time.gif
  - triangles.gif
  - wallpaper-my-favorite-game.png
  - wallpaper-red.png
  - wallpaper.png
  - yin.png
---

<div class="intro-block">
    <p class="section-label">about</p>
    <p>A collection of art worth preserving. Wallpapers, ascii art, 3D renders, animated gifs, icons. Not masterpieces, but they deserve a place to live.</p>
</div>

<br />
<p class="section-label">gallery</p>
<div class="icon-grid" id="iconGrid">
{% for image in images %}
    <button type="button" class="card card-accent icon-card">
        <div class="icon-frame"><img src="/gallery/{{ image }}" alt="{{ image }}" /></div>
        <div class="icon-meta"><span class="icon-name">{{ image | replace('-', ' ') | replace('.', ' ') }}</span><span class="icon-desc"></span></div>
    </button>
{% endfor %}
</div>

<div class="lightbox" id="gallery-lightbox" role="dialog" aria-hidden="true" tabindex="0">
    <img src="" alt="" />
    <div class="lightbox-meta"><div class="lightbox-name"></div><div class="lightbox-desc"></div></div>
</div>

<style>
.icon-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-7); }
.icon-card { padding: 1.1rem 1rem .9rem; align-items: center; gap: var(--space-5); cursor: zoom-in; border: none; }
.icon-frame { width: 128px; height: 128px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.icon-frame img { max-width: 100%; max-height: 100%; object-fit: contain; image-rendering: pixelated; pointer-events: none; }
.icon-meta { display: flex; flex-direction: column; align-items: center; gap: var(--space-2); width: 100%; text-align: center; }
.icon-name { font-size: .65rem; color: var(--fg); letter-spacing: .04em; line-height: 1.3; }
.lightbox { position: fixed; inset: 0; z-index: var(--z-overlay); display: flex; align-items: center; justify-content: center; flex-direction: column; gap: var(--space-8); background: var(--bg); opacity: 0; visibility: hidden; transition: opacity var(--transition-base), visibility var(--transition-base); cursor: zoom-out; }
.lightbox.open { opacity: 1; visibility: visible; }
.lightbox img { max-width: min(80vw, 800px); max-height: 60vh; object-fit: contain; image-rendering: pixelated; border: 1px solid var(--sur); border-radius: var(--radius-md); pointer-events: none; }
.lightbox-meta { display: flex; flex-direction: column; align-items: center; gap: var(--space-3); text-align: center; pointer-events: none; }
.lightbox-name { font-size: .8rem; letter-spacing: .06em; color: var(--fg); }
@media (max-width: 600px) { .icon-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 400px) { .icon-grid { grid-template-columns: 1fr; } }
</style>
