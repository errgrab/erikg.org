<script>
    let { title = "Erik", accent = "G", subtitle = "", href = "/" } = $props();
</script>

<a class="header-left" {href}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-8 -8 16 16" width="32" aria-hidden="true">
        <g
            transform="scale(3) rotate(45 0 0) translate(-1.5 -1.5)"
            stroke-linecap="round"
            stroke-width="0.5"
            stroke-linejoin="round"
        >
            <path d="m1 2h1v-1h1v2h-2z" fill="CanvasText" stroke="CanvasText" />
            <path d="m0 0h2v2h-2z" fill="none" stroke="CanvasText" />
        </g>
    </svg>
    <h1>ErikG</h1>
</a>

<style>
    .header-left {
        display: flex;
        align-items: center;
        text-decoration: none;
    }

    .header-left h1 {
        font: 700 1.6rem "DM Mono", monospace;
        padding: 0 5px;
    }

    .header-left:hover path {
        fill: Canvas;
        stroke: Canvas;
    }

    .header-left:hover path:last-child {
        fill: none;
    }
</style>
