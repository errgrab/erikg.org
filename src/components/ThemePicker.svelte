<script>
  import { onMount } from "svelte";
  import { applyRootTheme, themes } from "../themes.js";

  let currentTheme = "classic";
  let pickerOpen = false;

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
    if (!event.target.closest(".theme-wrapper")) {
      closePicker();
    }
  }
</script>

<svelte:window onclick={handleWindowClick} onkeydown={(event) => event.key === "Escape" && closePicker()} />

<div class="theme-wrapper">
  <button
    class:active={pickerOpen}
    class="theme-btn"
    type="button"
    aria-label="Change theme"
    title="change theme"
    onclick={() => (pickerOpen = !pickerOpen)}
  >
    <div class="theme-btn-half" style={`background: ${themes[currentTheme]?.bg || themes.classic.bg}`}></div>
    <div class="theme-btn-half" style={`background: ${themes[currentTheme]?.acc || themes.classic.acc}`}></div>
  </button>

  <div class:open={pickerOpen} class="theme-dropdown">
    {#each Object.entries(themes) as [name, theme]}
      <button
        class:active={name === currentTheme}
        class="swatch"
        type="button"
        title={name}
        aria-label={`Select ${name} theme`}
        onclick={() => selectTheme(name)}
      >
        <span class="sh l" style={`background: ${theme.bg}`}></span>
        <span class="sh r" style={`background: ${theme.acc}`}></span>
      </button>
    {/each}
  </div>
</div>
