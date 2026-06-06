export const themes = {
  BlackG: {
    bg: "black",
    sur: "black",
    fg: "white",
    acc: "white",
  },
  whiteG: {
    bg: "white",
    sur: "white",
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
    sur: "#111111",
    fg: "#f0f0ee",
    acc: "#7aaa6a",
  },
  forest: {
    bg: "#0d0f0e",
    sur: "#1a1f1d",
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
    sur: "#e8e4d8",
    fg: "#1a1e1c",
    acc: "#c0392b",
  },
  sage: {
    bg: "#f0f4f0",
    sur: "#e2ebe2",
    fg: "#1a2a1a",
    acc: "#3a7d44",
  },
  cobalt: {
    bg: "#eef2f8",
    sur: "#dce5f0",
    fg: "#0e1830",
    acc: "#2563eb",
  },
  paper: {
    bg: "#f9f6ef",
    sur: "#eeeadf",
    fg: "#221e1a",
    acc: "#7c5c2e",
  },
  vapor: {
    bg: "#f4f0ff",
    sur: "#ece6ff",
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
