// Single source for per-page SEO metadata. Used by:
//   - scripts/prerender.mjs (via entry-server.tsx) to write <head> tags into
//     each pre-rendered HTML file and to generate dist/sitemap.xml
//   - RouteTitle in App.tsx to keep document.title right during client-side
//     navigation
// To add an indexable page: add it here AND render it in scripts/prerender.mjs.

export const SITE = {
  name: "Al-Madina Constructions",
  url: "https://www.almadinabuilders.com",
  locale: "en_PK",
};

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  /** Last meaningful content change (YYYY-MM-DD), used in the sitemap. */
  lastmod?: string;
  noindex?: boolean;
}

export const PAGES: PageMeta[] = [
  {
    path: "/",
    title: "Al-Madina Constructions — Construction Company in Peshawar",
    description:
      "Peshawar construction company since 2001: homes, commercial plazas and mosques — design, grey structure, finishing, renovation and site supervision.",
    lastmod: "2026-09-28",
  },
  {
    path: "/projects",
    title: "Our Projects in Peshawar — Al-Madina Constructions",
    description:
      "Homes, commercial plazas, streets and mosques built by Al-Madina Constructions in Peshawar — Sabz Ali Town, Executive Lodges, Khwaja Town and more.",
    lastmod: "2026-09-28",
  },
];

export const NOT_FOUND: PageMeta = {
  path: "/404",
  title: `Page not found — ${SITE.name}`,
  description: "This page does not exist.",
  noindex: true,
};

/** Shell for client-only routes (admin, tracker links, previews). */
export const APP_SHELL: PageMeta = {
  path: "/app",
  title: SITE.name,
  description: PAGES[0].description,
  noindex: true,
};

export const findPage = (pathname: string) => {
  const path = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  return PAGES.find((p) => p.path === path);
};

const escapeAttr = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** <head> tags for one page, as an HTML string. */
export function renderHead(meta: PageMeta): string {
  const url = SITE.url + (meta.path === "/" ? "/" : meta.path);
  const title = escapeAttr(meta.title);
  const description = escapeAttr(meta.description);
  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
  ];
  if (meta.noindex) {
    tags.push(`<meta name="robots" content="noindex" />`);
  } else {
    tags.push(
      `<link rel="canonical" href="${url}" />`,
      `<meta property="og:url" content="${url}" />`,
    );
  }
  tags.push(
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeAttr(SITE.name)}" />`,
    `<meta property="og:locale" content="${SITE.locale}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    // TODO(SEO phase 4): add og:image (1200×630) + width/height and switch to summary_large_image
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
  );
  return tags.join("\n    ");
}
