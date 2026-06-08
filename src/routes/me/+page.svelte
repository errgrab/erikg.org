<script>
    import ProjectTile from "$lib/components/ProjectTile.svelte";
    import { projects } from "$lib/data/projects.js";
</script>

<section class="hero">
    <div class="eyebrow">open to work · Porto, PT</div>
    <h2>Developer<br /><em>&amp; artist.</em></h2>
    <p>
        I like to build things from scratch. Learning, understanding, creating
        and finally sharing with the world. Sometimes I don't fully know where
        my creations are going or whether they're a good idea. But that
        uncertainty and willingness to fail is part of what makes it enjoyable.
        <br /><br />
        I like low-level, game-dev, VR, compilers, virtual machines, programming languages,
        operating systems, and most things related to tech. I also like to learn about
        new things, even when they're unrelated to my area of expertise.
    </p>
</section>

<section id="skills">
    <h3 class="section-label">skills & tools</h3>
    <div class="grid">
        <div class="tile">
            <span class="host">stack</span>
            <span class="name">Languages</span>
            <ul>
                <li>C / C++ / C#</li>
                <li>Python</li>
                <li>JavaScript / TypeScript</li>
                <li>Rust</li>
                <li>Lua</li>
                <li>HTML / CSS</li>
            </ul>
        </div>
        <div class="tile">
            <span class="host">tools</span>
            <span class="name">Environments</span>
            <ul>
                <li>Godot / Unity</li>
                <li>Bash / Zsh / Fish / PowerShell</li>
                <li>Vite / React / Svelte / Wrangler</li>
                <li>Git / Fossil</li>
                <li>VSCode / NeoVim / Emacs</li>
                <li>Arch / Void / NixOS / MacOS</li>
            </ul>
        </div>
    </div>
</section>

<section id="contact">
    <h3 class="section-label">get in touch</h3>
    <div class="grid">
        <a class="tile" href="mailto:contact@erikg.org">
            <span class="host">email</span>
            <span class="name" style="color: var(--acc)">contact@erikg.org</span
            >
        </a>
        <a class="tile" href="https://github.com/errgrab" target="_blank">
            <span class="host">github</span>
            <span class="name" style="color: var(--acc)"
                >github.com/errgrab</span
            >
        </a>
    </div>
</section>

<section id="projects">
    <h3 class="section-label">projects</h3>
    <div class="grid single">
        <ProjectTile
            project={{
                name: "This website",
                desc: "built and deployed my own site from scratch, using Svelte frontend, Cloudflare Workers backend, KV storage, automated deploys.",
                tag: "online",
                href: "https://github.com/errgrab/erikg.org",
            }}
        />
        {#each projects as project}
            <ProjectTile {project} />
        {/each}
    </div>
</section>

<style>
    section {
        margin-top: 3rem;
    }

    .hero {
        display: flex;
        flex-direction: column;
        gap: var(--space-7);
    }

    .hero .eyebrow {
        font-size: var(--text-xs);
        letter-spacing: 0.28em;
        text-transform: uppercase;
        color: var(--acc);
        display: flex;
        align-items: center;
        gap: var(--space-5);
    }

    .hero .eyebrow::before {
        content: "";
        display: block;
        width: 24px;
        height: 1px;
        background: var(--acc);
    }

    .hero h2 {
        font-size: var(--text-2xl);
        font-weight: 300;
        line-height: var(--leading-snug);
        letter-spacing: var(--tracking-tight);
    }

    .hero h2 em {
        color: var(--acc);
        font-style: italic;
    }

    .hero p {
        font-size: var(--text-md);
        opacity: 0.8;
        line-height: var(--leading-relaxed-xl);
    }
</style>
