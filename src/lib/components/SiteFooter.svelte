<footer>
    <hr />
    <div class="footer-inner">
        <span
            ><a href="/me" class="footer-name">ErikG</a> &middot; go slow and fix
            things</span
        >
        <nav>
            <a
                href="https://github.com/errgrab/"
                target="_blank"
                rel="noreferrer">github</a
            >
            <a href="mailto:contact@erikg.org">mail</a>
        </nav>
    </div>
</footer>

<style>
    footer {
        margin-top: auto;
        width: 100%;
    }

    .footer-inner {
        max-width: 980px;
        width: 100%;
        padding: 0 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    footer span,
    footer a {
        font-size: var(--text-sm);
        color: var(--fg-muted);
        text-decoration: none;
    }

    footer a:hover {
        color: var(--fg);
    }

    footer nav {
        display: flex;
        gap: 1.5rem;
    }

    .footer-name {
        color: inherit;
        text-decoration: none;
    }
</style>
