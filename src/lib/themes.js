export const themes = {
  BlackG: {
    bg: "black",
    sur: "#222",
    fg: "white",
    acc: "white",
    mix: "white",
  },
  whiteG: {
    bg: "white",
    sur: "#ccc",
    fg: "black",
    acc: "black",
    mix: "black",
  },
  classic: {
    bg: "#0d0d0d",
    sur: "#1e1e1e",
    fg: "#e8e6e1",
    acc: "#c97d2e",
    mix: "white",
  },
  moss: {
    bg: "#080808",
    sur: "#181818",
    fg: "#f0f0ee",
    acc: "#7aaa6a",
    mix: "white",
  },
  forest: {
    bg: "#0d0f0e",
    sur: "#222822",
    fg: "#ddd9c8",
    acc: "#7cfc6e",
    mix: "white",
  },
  espresso: {
    bg: "#1c1210",
    sur: "#332620",
    fg: "#f0dfc8",
    acc: "#f59e0b",
    mix: "white",
  },
  void: {
    bg: "#080808",
    sur: "#1e1e1e",
    fg: "#eeeeee",
    acc: "#ff3c3c",
    mix: "white",
  },
  midnight: {
    bg: "#0a0e1a",
    sur: "#1a2540",
    fg: "#e2e8f0",
    acc: "#38bdf8",
    mix: "white",
  },
  graphite: {
    bg: "#1c1c1e",
    sur: "#363638",
    fg: "#f0f0f2",
    acc: "#ff9f0a",
    mix: "white",
  },
  dusk: {
    bg: "#12101a",
    sur: "#2a2540",
    fg: "#eae8f8",
    acc: "#d946b4",
    mix: "white",
  },
  chalk: {
    bg: "#f2efe6",
    sur: "#d5d0c2",
    fg: "#1a1e1c",
    acc: "#c0392b",
    mix: "black",
  },
  sage: {
    bg: "#f0f4f0",
    sur: "#d2e0d2",
    fg: "#1a2a1a",
    acc: "#3a7d44",
    mix: "black",
  },
  cobalt: {
    bg: "#eef2f8",
    sur: "#cdd8ea",
    fg: "#0e1830",
    acc: "#2563eb",
    mix: "black",
  },
  paper: {
    bg: "#f9f6ef",
    sur: "#e2ddd0",
    fg: "#221e1a",
    acc: "#7c5c2e",
    mix: "black",
  },
  vapor: {
    bg: "#f4f0ff",
    sur: "#d8d0f0",
    fg: "#120630",
    acc: "#7c3aed",
    mix: "black",
  },
};

export function applyRootTheme(name) {
  const theme = themes[name] || themes.classic;
  const root = document.documentElement.style;
  root.setProperty("--bg", theme.bg);
  root.setProperty("--sur", theme.sur);
  root.setProperty("--fg", theme.fg);
  root.setProperty("--acc", theme.acc);
  root.setProperty("--mix", theme.mix);
}
