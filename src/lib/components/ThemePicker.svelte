<script>
    import { onMount, onDestroy } from "svelte";
    import { applyRootTheme, resolveTheme } from "../themes.js";

    let preference = "device"; // "device" | "black" | "white"
    let currentResolved = "black"; // "black" | "white"
    let pickerOpen = false;
    let wrapper;
    let removeListener;

    onMount(() => {
        const saved = localStorage.getItem("theme");
        preference =
            saved === "black" || saved === "white" || saved === "device"
                ? saved
                : "device";
        currentResolved = resolveTheme(preference);
        applyRootTheme(preference);

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handler = (e) => {
            if (preference === "device") {
                currentResolved = e.matches ? "black" : "white";
                applyRootTheme("device");
            }
        };

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener("change", handler);
            removeListener = () =>
                mediaQuery.removeEventListener("change", handler);
        } else if (mediaQuery.addListener) {
            mediaQuery.addListener(handler);
            removeListener = () => mediaQuery.removeListener(handler);
        }
    });

    onDestroy(() => {
        removeListener?.();
    });

    function selectTheme(pref) {
        preference = pref;
        if (pref === "device") {
            localStorage.removeItem("theme");
        } else {
            localStorage.setItem("theme", pref);
        }
        currentResolved = resolveTheme(pref);
        applyRootTheme(pref);
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
        class="swatch"
        class:swatch-device={preference === "device"}
        class:swatch-black={preference === "black"}
        class:swatch-white={preference === "white"}
        class:picker-active={pickerOpen}
        type="button"
        aria-label={`Change theme (current: ${preference})`}
        title={`Theme: ${preference}`}
        onclick={() => (pickerOpen = !pickerOpen)}
    >
    </button>

    <div class:open={pickerOpen} class="theme-dropdown">
        <button
            class="swatch swatch-device"
            class:active={preference === "device"}
            type="button"
            title="Device (auto)"
            aria-label="Device theme (auto detect)"
            onclick={() => selectTheme("device")}
        ></button>

        <button
            class="swatch swatch-black"
            class:active={preference === "black"}
            type="button"
            title="Black"
            aria-label="Black theme (black background, white text)"
            onclick={() => selectTheme("black")}
        ></button>

        <button
            class="swatch swatch-white"
            class:active={preference === "white"}
            type="button"
            title="White"
            aria-label="White theme (white background, black text)"
            onclick={() => selectTheme("white")}
        ></button>
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
        width: 32px;
        height: 32px;
        border: 1px solid var(--fg);
        border-radius: 25%;
        cursor: pointer;
        padding: 0;
        transition:
            transform var(--transition-fast),
            outline-color var(--transition-fast);
    }

    .swatch:hover {
        z-index: 10;
        transform: scale(1.12);
    }

    .swatch.picker-active {
        outline: 2px solid var(--fg);
        outline-offset: 2px;
    }

    .swatch.active {
        outline: 2px solid var(--fg);
        outline-offset: 2px;
    }

    .swatch-device {
        background: linear-gradient(135deg, black 50%, white 50%);
    }

    .swatch-black {
        background: black;
    }

    .swatch-white {
        background: white;
    }

    .theme-dropdown {
        position: absolute;
        top: calc(100% + 15px);
        right: 0;
        z-index: var(--z-dropdown);
        display: flex;
        flex-direction: row;
        gap: var(--space-4);
        padding: 0.85rem;
        background: var(--sur);
        border: 1px solid var(--fg);
        border-radius: var(--radius-xl);
        box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.8);
        opacity: 1;
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
        right: 12px;
        width: 10px;
        height: 10px;
        background: var(--sur);
        border-top: 1px solid var(--fg);
        border-left: 1px solid var(--fg);
        transform: rotate(45deg);
    }

    @media (max-width: 480px) {
        .theme-dropdown {
            right: -0.5rem;
        }

        .theme-dropdown::before {
            right: 1.25rem;
        }
    }
</style>
