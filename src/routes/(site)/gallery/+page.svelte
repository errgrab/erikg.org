<script>
    import { onMount } from "svelte";
    let images = [
        "old-animated-wrong.gif",
        "old-animated.gif",
        "old-icon-black.png",
        "old-icon-chess.png",
        "old-icon-diagonal-cut.png",
        "old-icon-diagonal.png",
        "old-icon-fifty.png",
        "old-icon-white.png",
        "old-icon.png",
        "old-profile-picture.png",
        "oldesticon-black.png",
        "oldesticon.png",
        "other-eye.png",
        "other-mask.png",
        "other.png",
        "plain-cube.png",
        "plan9-colors.png",
        "planet.png",
        "shatter.gif",
        "star.png",
        "ascii-art.png",
        "better.png",
        "circles.gif",
        "devine-colors.png",
        "dot-g.gif",
        "effect-nicer.gif",
        "effect.gif",
        "geometric.png",
        "golden.png",
        "icon-circles.png",
        "icon-fdf.png",
        "icon-glitch.gif",
        "icon-nice.png",
        "iconbr.png",
        "imagebw.png",
        "imagewb.png",
        "lilith-outline.png",
        "lilith.png",
        "modern.png",
        "moon-bw.gif",
        "moon.gif",
        "my-first-icon-ever.png",
        "need-fix.gif",
        "nicecontrast.png",
        "nicest.png",
        "plain.png",
        "strange.png",
        "the-white-cube-modern.png",
        "the-white-cube.png",
        "the-white-cube1.png",
        "time.gif",
        "triangles.gif",
        "wallpaper-my-favorite-game.png",
        "wallpaper-red.png",
        "wallpaper.png",
        "yin.png",
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
            if (e.key === "Escape" && lightboxOpen) closeLightbox();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    });
</script>

<div class="intro-block">
    <p class="section-label">about</p>
    <p>
        A collection of art worth preserving. Wallpapers, ascii art, 3D renders,
        animated gifs, icons. Not masterpieces, but they deserve a place to
        live.
    </p>
</div>

<br />

<p class="section-label">gallery</p>
<div class="icon-grid" id="iconGrid">
    {#each images as img}
        <button
            type="button"
            class="card card-accent icon-card"
            onclick={() => openLightbox(img)}
        >
            <div class="icon-frame">
                <img src={`/gallery/${img}`} alt={img} />
            </div>
            <div class="icon-meta">
                <span class="icon-name">{img.replace(/[-.]/g, " ")}</span>
                <span class="icon-desc"></span>
            </div>
        </button>
    {/each}
</div>

<div
    class={lightboxOpen ? "lightbox open" : "lightbox"}
    role="dialog"
    tabindex="0"
    onclick={closeLightbox}
    onkeydown={(e) => e.key === "Escape" && closeLightbox()}
>
    {#if current}
        <img src={`/gallery/${current}`} alt={current} />
        <div class="lightbox-meta">
            <div class="lightbox-name">{current}</div>
            <div class="lightbox-desc"></div>
        </div>
    {/if}
</div>

<style>
    .icon-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--space-7);
    }

    .icon-card {
        padding: 1.1rem 1rem 0.9rem;
        align-items: center;
        gap: var(--space-5);
        cursor: zoom-in;
        border: none;
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
        gap: var(--space-2);
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
        font-size: var(--text-xs);
        color: var(--fg);
        opacity: 0.65;
        font-style: italic;
        line-height: 1.55;
    }

    /* Lightbox */
    .lightbox {
        position: fixed;
        inset: 0;
        z-index: var(--z-overlay);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: var(--space-8);
        background: var(--bg-overlay);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        opacity: 0;
        visibility: hidden;
        transition:
            opacity var(--transition-base),
            visibility var(--transition-base);
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
        border-radius: var(--radius-md);
        transform: scale(0.92);
        transition: transform var(--transition-smooth);
        pointer-events: none;
    }

    .lightbox.open img {
        transform: scale(1);
    }

    .lightbox-meta {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--space-3);
        text-align: center;
        pointer-events: none;
    }

    .lightbox-name {
        font-size: 0.8rem;
        letter-spacing: 0.06em;
        color: var(--fg);
    }

    .lightbox-desc {
        font-size: var(--text-sm);
        color: var(--fg);
        opacity: 0.6;
        font-style: italic;
    }

    @media (max-width: 600px) {
        .icon-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 400px) {
        .icon-grid {
            grid-template-columns: repeat(1, 1fr);
        }
    }
</style>
