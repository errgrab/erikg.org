import { defineConfig } from "vite";
import khemPlugin from "./vite-plugin-khem.js";

export default defineConfig({
  plugins: [khemPlugin()],
  build: {
    outDir: "dist",
  },
});
