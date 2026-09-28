// Runs after `vite build` + the SSR build of src/entry-server.tsx.
// Writes static HTML for the public routes into dist/ so search engines see
// the page text without running JavaScript. The browser still boots with
// createRoot (main.tsx), which simply replaces this markup.
//
// Output (served by Vercel with cleanUrls, see vercel.json):
//   dist/index.html     → /
//   dist/projects.html  → /projects
//   dist/404.html       → any unknown URL (served with HTTP 404)
//   dist/app.html       → empty, noindex shell for client-only routes
//                         (/admin*, /track/*, /new, /ongoing-project/*)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const PAGES = [
  { url: "/", file: "index.html" },
  { url: "/projects", file: "projects.html" },
  { url: "/__not-found__", file: "404.html", noindex: true },
];

const EMPTY_ROOT = '<div id="root"></div>';
const NOINDEX = '<meta name="robots" content="noindex" />';

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
if (!template.includes(EMPTY_ROOT)) {
  throw new Error(`prerender: ${EMPTY_ROOT} not found in dist/index.html`);
}

const withNoindex = (html) => html.replace("</head>", `  ${NOINDEX}\n  </head>`);

const { render } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);

fs.writeFileSync(path.join(dist, "app.html"), withNoindex(template));

for (const page of PAGES) {
  const body = render(page.url);
  let html = template.replace(EMPTY_ROOT, `<div id="root">${body}</div>`);
  if (page.noindex) html = withNoindex(html);
  fs.writeFileSync(path.join(dist, page.file), html);
  console.log(`prerender: ${page.url} → dist/${page.file} (${Math.round(body.length / 1024)} kB)`);
}

fs.rmSync(ssrDir, { recursive: true, force: true });
