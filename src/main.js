import { mount } from "svelte";
import App from "./App.svelte";
import { applyRootTheme } from "./themes.js";

// apply persisted theme as early as possible
const currentTheme = typeof localStorage !== 'undefined' ? localStorage.getItem('theme') || 'classic' : 'classic';
applyRootTheme(currentTheme);

mount(App, {
  target: document.getElementById("app"),
});
