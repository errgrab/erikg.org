export const themes = {
  black: {
    bg: "black",
    sur: "#111111",
    fg: "white",
    acc: "white",
  },
  white: {
    bg: "white",
    sur: "#eeeeee",
    fg: "black",
    acc: "black",
  },
};

export function getSystemTheme() {
  if (typeof window === "undefined" || !window.matchMedia) return "black";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "black" : "white";
}

export function resolveTheme(preference) {
  if (preference === "black" || preference === "BlackG") return "black";
  if (preference === "white" || preference === "whiteG") return "white";
  return getSystemTheme();
}

export function applyRootTheme(name) {
  if (typeof document === "undefined") return;
  const resolved = resolveTheme(name);
  const theme = themes[resolved] || themes.black;
  const root = document.documentElement.style;
  root.setProperty("--bg", theme.bg);
  root.setProperty("--sur", theme.sur);
  root.setProperty("--fg", theme.fg);
  root.setProperty("--acc", theme.acc);
  document.documentElement.setAttribute("data-theme", resolved);
}
