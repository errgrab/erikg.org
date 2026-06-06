export const themes = {
  BlackG: {
    bg: "black",
    sur: "#111",
    fg: "white",
    acc: "white",
  },
  whiteG: {
    bg: "white",
    sur: "#eee",
    fg: "black",
    acc: "black",
  },
  classic: {
    bg: "#0d0d0d",
    sur: "#141414",
    fg: "#e8e6e1",
    acc: "#c97d2e",
  },
  moss: {
    bg: "#080808",
    sur: "#111",
    fg: "#f0f0ee",
    acc: "#7aaa6a",
  },
  forest: {
    bg: "#0d0f0e",
    sur: "#131d18",
    fg: "#ddd9c8",
    acc: "#7cfc6e",
  },
  espresso: {
    bg: "#1c1210",
    sur: "#2a1c18",
    fg: "#f0dfc8",
    acc: "#f59e0b",
  },
  void: {
    bg: "#080808",
    sur: "#141414",
    fg: "#eeeeee",
    acc: "#ff3c3c",
  },
  midnight: {
    bg: "#0a0e1a",
    sur: "#111827",
    fg: "#e2e8f0",
    acc: "#38bdf8",
  },
  graphite: {
    bg: "#1c1c1e",
    sur: "#2c2c2e",
    fg: "#f0f0f2",
    acc: "#ff9f0a",
  },
  dusk: {
    bg: "#12101a",
    sur: "#1e1b2e",
    fg: "#eae8f8",
    acc: "#d946b4",
  },
  chalk: {
    bg: "#f2efe6",
    sur: "#d5d0c2",
    fg: "#1a1e1c",
    acc: "#c0392b",
  },
  sage: {
    bg: "#f0f4f0",
    sur: "#d2e0d2",
    fg: "#1a2a1a",
    acc: "#3a7d44",
  },
  cobalt: {
    bg: "#eef2f8",
    sur: "#cdd8ea",
    fg: "#0e1830",
    acc: "#2563eb",
  },
  paper: {
    bg: "#f9f6ef",
    sur: "#e2ddd0",
    fg: "#221e1a",
    acc: "#7c5c2e",
  },
  vapor: {
    bg: "#f4f0ff",
    sur: "#d8d0f0",
    fg: "#120630",
    acc: "#7c3aed",
  },
};

export function applyRootTheme(name) {
  const theme = themes[name] || themes.classic;
  const root = document.documentElement.style;
  root.setProperty("--bg", theme.bg);
  root.setProperty("--sur", theme.sur);
  root.setProperty("--fg", theme.fg);
  root.setProperty("--acc", theme.acc);
}
