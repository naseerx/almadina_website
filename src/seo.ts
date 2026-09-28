// Single source for per-page SEO metadata. Used by:
//   - scripts/prerender.mjs (via entry-server.tsx) to write <head> tags into
//     each pre-rendered HTML file and to generate dist/sitemap.xml
//   - RouteTitle in App.tsx to keep document.title right during client-side
//     navigation
// To add an indexable page: add it here AND render it in scripts/prerender.mjs.

export const SITE = {
  name: "Al-Madina Al-Munawara Builders",
  url: "https://www.almadinabuilders.com",
  locale: "en_PK",
  /** 1200×630 share image in public/ (template: scripts/brand/og.html). */
  image: { path: "/og-image.png", width: 1200, height: 630 },
};

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  /** Last meaningful content change (YYYY-MM-DD), used in the sitemap. */
  lastmod?: string;
  noindex?: boolean;
  /** schema.org nodes, emitted as one JSON-LD @graph in <head>. */
  jsonLd?: object[];
}

// Business facts for JSON-LD. Only real, published data (same as the Contact
// section) — leave a field out rather than guess. Missing, to add when known:
// sameAs (Facebook/Instagram/YouTube/Google Business Profile), postalCode, geo.
const BUSINESS = {
  alternateName: "Al-Madina Constructions",
  telephone: "+923339221258",
  email: "almadinaconstructions260@gmail.com",
  streetAddress: "Darmangi Garden Street 1, Warsak Road",
  addressLocality: "Peshawar",
  addressRegion: "Khyber Pakhtunkhwa",
  addressCountry: "PK",
  foundingDate: "2001",
  openingDays: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
  opens: "09:00",
  closes: "18:00",
};

const HOME_DESCRIPTION =
  "Peshawar construction company since 2001: homes, commercial plazas and mosques — design, grey structure, finishing, renovation and site supervision.";

const BUSINESS_ID = `${SITE.url}/#business`;

const HOME_JSON_LD: object[] = [
  {
    "@type": "GeneralContractor",
    "@id": BUSINESS_ID,
    name: SITE.name,
    alternateName: BUSINESS.alternateName,
    url: `${SITE.url}/`,
    logo: `${SITE.url}/icon-512.png`,
    image: `${SITE.url}${SITE.image.path}`,
    description: HOME_DESCRIPTION,
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    foundingDate: BUSINESS.foundingDate,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.streetAddress,
      addressLocality: BUSINESS.addressLocality,
      addressRegion: BUSINESS.addressRegion,
      addressCountry: BUSINESS.addressCountry,
    },
    areaServed: { "@type": "City", name: "Peshawar" },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: BUSINESS.openingDays,
      opens: BUSINESS.opens,
      closes: BUSINESS.closes,
    },
  },
  {
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: SITE.name,
    url: `${SITE.url}/`,
    inLanguage: "en",
    publisher: { "@id": BUSINESS_ID },
  },
];

export const PAGES: PageMeta[] = [
  {
    path: "/",
    title: "Al-Madina Al-Munawara Builders — Construction in Peshawar",
    description: HOME_DESCRIPTION,
    lastmod: "2026-09-28",
    jsonLd: HOME_JSON_LD,
  },
  {
    path: "/projects",
    title: "Our Projects in Peshawar — Al-Madina Al-Munawara Builders",
    description:
      "Homes, commercial plazas, streets and mosques built by Al-Madina Al-Munawara Builders in Peshawar — Sabz Ali Town, Executive Lodges, Khwaja Town and more.",
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
  const image = SITE.url + SITE.image.path;
  const imageAlt = escapeAttr(`${SITE.name} logo — construction company in Peshawar`);
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
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="${SITE.image.width}" />`,
    `<meta property="og:image:height" content="${SITE.image.height}" />`,
    `<meta property="og:image:alt" content="${imageAlt}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  );
  if (meta.jsonLd) {
    // Escape "<" so the JSON can never close the <script> element early.
    const json = JSON.stringify({ "@context": "https://schema.org", "@graph": meta.jsonLd }).replace(/</g, "\\u003c");
    tags.push(`<script type="application/ld+json">${json}</script>`);
  }
  return tags.join("\n    ");
}
