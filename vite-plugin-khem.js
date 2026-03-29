// vite-plugin-khem.js
// Processes <script type="text/khem"> tags in HTML files during Vite build
import { processScriptTags } from "khem";

export default function khemPlugin() {
  return {
    name: "vite-plugin-khem",
    transformIndexHtml(html) {
      return processScriptTags(html);
    },
  };
}
