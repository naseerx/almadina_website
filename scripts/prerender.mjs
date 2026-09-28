// Runs after `vite build` + the SSR build of src/entry-server.tsx.
// Writes static HTML for the public routes into dist/ so search engines see
// the page text and per-page <head> tags without running JavaScript. The
// browser still boots with createRoot (main.tsx), which simply replaces this
// markup. Page titles/descriptions come from src/seo.ts.
//
// Output (served by Vercel with cleanUrls, see vercel.json):
//   dist/index.html     → /
//   dist/projects.html  → /projects
//   dist/services.html, dist/services/<slug>.html → service pages
//   dist/404.html       → any unknown URL (served with HTTP 404)
//   dist/app.html       → empty, noindex shell for client-only routes
//                         (/admin*, /track/*, /new, /ongoing-project/*)
//   dist/sitemap.xml    → every indexable page in src/seo.ts
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const EMPTY_ROOT = '<div id="root"></div>';
const SEO_BLOCK = /<!-- seo:start[\s\S]*?<!-- seo:end -->/;

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
if (!template.includes(EMPTY_ROOT) || !SEO_BLOCK.test(template)) {
  throw new Error("prerender: dist/index.html is missing the #root div or the seo:start/seo:end markers");
}

const { render, SITE, PAGES, NOT_FOUND, APP_SHELL, renderHead } = await import(
  pathToFileURL(path.join(ssrDir, "entry-server.js")).href
);

const fileFor = (p) => (p === "/" ? "index.html" : `${p.slice(1)}.html`);

// The hero is a CSS background, which the browser only discovers after CSS
// and layout; preloading it lets the LCP image download straight away.
const BG_IMAGE = /background-image:url\(([^)]+)\)/;

const writePage = (meta, file, url) => {
  let head = renderHead(meta);
  let html = template;
  if (url) {
    const body = render(url);
    const hero = body.match(BG_IMAGE)?.[1];
    if (hero) head += `\n    <link rel="preload" as="image" href="${hero}" fetchpriority="high" />`;
    html = html.replace(EMPTY_ROOT, `<div id="root">${body}</div>`);
  }
  html = html.replace(SEO_BLOCK, head);
  fs.mkdirSync(path.dirname(path.join(dist, file)), { recursive: true });
  fs.writeFileSync(path.join(dist, file), html);
  console.log(`prerender: ${url ?? "(shell)"} → dist/${file}`);
};

writePage(APP_SHELL, "app.html");
for (const page of PAGES) writePage(page, fileFor(page.path), page.path);
writePage(NOT_FOUND, "404.html", "/__not-found__");

const urls = PAGES.filter((p) => !p.noindex).map(
  (p) =>
    `  <url>\n    <loc>${SITE.url}${p.path}</loc>\n` +
    (p.lastmod ? `    <lastmod>${p.lastmod}</lastmod>\n` : "") +
    `  </url>`,
);
fs.writeFileSync(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`,
);
console.log(`prerender: sitemap.xml (${urls.length} URLs)`);

fs.rmSync(ssrDir, { recursive: true, force: true });
