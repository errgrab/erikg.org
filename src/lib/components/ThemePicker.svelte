<script>
    import { onMount } from "svelte";
    import { applyRootTheme, themes } from "../themes.js";

    let currentTheme = "classic";
    let pickerOpen = false;
    let wrapper;

    onMount(() => {
        currentTheme = localStorage.getItem("theme") || "classic";
        applyRootTheme(currentTheme);
    });

    function selectTheme(name) {
        currentTheme = name;
        localStorage.setItem("theme", name);
        applyRootTheme(name);
        pickerOpen = false;
    }

    function closePicker() {
        pickerOpen = false;
    }

    function handleWindowClick(event) {
        if (wrapper && !event.target.closest(`#${wrapper.id}`)) {
            closePicker();
        }
    }
</script>

<svelte:window
    onclick={handleWindowClick}
    onkeydown={(event) => event.key === "Escape" && closePicker()}
/>

<div class="theme-wrapper" id="theme-picker" bind:this={wrapper}>
    <button
        class:active={pickerOpen}
        class="swatch"
        type="button"
        aria-label="Change theme"
        title="change theme"
        style={`--swatch-bg: ${themes[currentTheme]?.acc || themes.classic.acc}`}
        onclick={() => (pickerOpen = !pickerOpen)}
    >
        <span
            class="theme-icon"
            style={`--swatch-bg: ${themes[currentTheme]?.bg || themes.classic.bg}`}
        ></span>
    </button>

    <div class:open={pickerOpen} class="theme-dropdown">
        {#each Object.entries(themes) as [name, theme]}
            <button
                class:active={name === currentTheme}
                class="swatch"
                type="button"
                title={name}
                aria-label={`Select ${name} theme`}
                style={`--swatch-bg: ${theme.acc}`}
                onclick={() => selectTheme(name)}
            >
                <span class="theme-icon" style={`--swatch-bg: ${theme.bg}`}
                ></span>
            </button>
        {/each}
    </div>
</div>

<style>
    .theme-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .swatch {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        background: var(--swatch-bg);
        border: 2px solid transparent;
        border-radius: 25%;
        cursor: pointer;
        transition:
            transform var(--transition-fast),
            border-color var(--transition-fast);
    }

    .swatch:hover {
        z-index: 10;
        transform: scale(1.12);
    }

    .swatch.active::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        background: var(--acc);
        border-radius: 3px;
        transform: translate(-50%, -50%);
    }

    .theme-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background: var(--swatch-bg);
        border-radius: 25%;
    }

    .theme-dropdown {
        position: absolute;
        top: calc(100% + 15px);
        right: 0;
        z-index: var(--z-dropdown);
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: var(--space-4);
        padding: 1rem;
        background: var(--sur);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-xl);
        box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.8);
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: all var(--transition-smooth);
    }

    .theme-dropdown.open {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }

    .theme-dropdown::before {
        content: "";
        position: absolute;
        top: -6px;
        right: 14px;
        width: 10px;
        height: 10px;
        background: var(--sur);
        border-top: 1px solid var(--border-subtle);
        border-left: 1px solid var(--border-subtle);
        transform: rotate(45deg);
    }

    @media (max-width: 480px) {
        .theme-dropdown {
            right: -1rem;
        }

        .theme-dropdown::before {
            right: 1.5rem;
        }
    }
</style>
