import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const container = document.getElementById("root")!;

// Pre-rendered pages (/, /projects, /privacy, 404 — see scripts/prerender.mjs)
// arrive with markup in #root: hydrate it so the browser keeps the existing
// DOM (no repaint of the hero, lazy <img> tags stay lazy). Client-only routes
// and the dev server start from an empty #root and render normally.
if (container.hasChildNodes()) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
