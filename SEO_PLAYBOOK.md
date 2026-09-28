# SEO Playbook — personal website

A step-by-step checklist to take a website from zero SEO to a solid setup.
Written from the LoopStudio (loopstudio.ch) rollout; adapted for a **personal site**.
Work top to bottom. Each step says **who** does it: 🤖 = Claude Code, 👤 = you (accounts,
DNS approvals, personal data), 🤝 = together (Claude drives the browser, you approve).

Track progress in `TODO_SEO.md` (Claude creates it in Phase 0).

---

## Phase 0 — Audit (🤖, read-only, no changes)

Before touching anything, find out what exists:

- [ ] Framework / build tool / hosting (Vite, Next.js, Astro, plain HTML… · Netlify, Vercel, GitHub Pages…)
- [ ] Is the page text in the HTML, or only after JavaScript runs? (`curl -s <url> | sed 's/<[^>]*>//g'` — any real text?)
- [ ] Live URL(s) and domain; `dig +short NS <domain>` → **who really runs DNS** (registrar ≠ DNS host is common)
- [ ] Existing: `robots.txt`, `sitemap.xml`, `<title>`, meta description, canonical, Open Graph tags, favicon set, JSON-LD
- [ ] Languages: one or several? Separate URLs per language, or switched in the browser?
- [ ] Pages / routes that exist; which should be indexed
- [ ] External services loaded (fonts, images, analytics, embeds) — needed for the privacy policy and speed
- [ ] Forms: do they actually send anything?
- [ ] Legal pages present? (Impressum / privacy policy)

Output: `TODO_SEO.md` with **Done / Remaining** lists, filled from this audit.

---

## Phase 1 — Search engines (🤝 / 👤)

1. [ ] **Google Search Console** → Add property → **Domain** property (covers `www`, `http/https`, all subdomains).
   - Google shows a `google-site-verification=…` TXT value.
   - 👤/🤖 Add it as a **TXT record on the apex (`@`)** at the **actual DNS host** found in Phase 0
     (e.g. Netlify DNS via `netlify api createDnsRecord`, Cloudflare, registrar panel).
     Adding it at the registrar when DNS runs elsewhere silently does nothing.
   - Check it's live: `dig +short TXT <domain> @<one of the NS>` → then click **Verify**.
   - **Never delete this TXT record** later (verification is re-checked).
2. [ ] **Submit sitemap** in Search Console → Sitemaps → `https://<domain>/sitemap.xml` (after Phase 2).
3. [ ] **Request indexing** (URL Inspection → Request indexing) for the home page (+ each language home).
4. [ ] **Bing Webmaster Tools** → sign in (👤) → **Import from Google Search Console** → approve the
   Google permission (👤) → import. If the sitemap doesn't come along, submit it manually.
   (Bing also powers DuckDuckGo, Yahoo, ChatGPT search.)

---

## Phase 2 — Crawlability (🤖)

- [ ] `robots.txt` at the site root:
  ```
  User-agent: *
  Allow: /

  Sitemap: https://<domain>/sitemap.xml
  ```
- [ ] `sitemap.xml` listing every indexable URL (with `<lastmod>`; with `xhtml:link hreflang` alternates if multilingual).
  Leave out `noindex` pages (legal pages, thank-you pages).
- [ ] **Text in the HTML.** If the site is a client-rendered SPA (empty `<div id="root">`), pre-render at build time:
  - Next.js / Astro / SvelteKit: use static generation (SSG) — usually built in.
  - Vite + React: second build `vite build --ssr src/entry-server.jsx --outDir dist-ssr`, then a small
    Node script that calls `renderToString(<App/>)` per URL and writes it into `<div id="root">` of each
    `dist/**/index.html`. Pass the route in as a prop (no `window` at build time). Browser code can keep
    `createRoot` (no hydration mismatch risk). No new packages needed.
  - Verify: `curl -s <url>` contains the headline text.
- [ ] One `<h1>` per page; headings in order (`h1` → `h2` → `h3`).
- [ ] Meaningful `alt` on every content image; empty `alt=""` on decorative ones.
- [ ] Clean, stable URLs; trailing-slash style consistent; no duplicate pages without canonical.

---

## Phase 3 — Head tags per page (🤖)

Every indexable page gets:
- [ ] `<html lang="…">`
- [ ] Unique `<title>` (≈ 50–60 chars: *Name — what you do*) and `<meta name="description">` (≈ 140–160 chars)
- [ ] `<link rel="canonical" href="https://<domain>/<path>">`
- [ ] Open Graph: `og:type`, `og:site_name`, `og:url`, `og:title`, `og:description`, `og:locale`,
  `og:image` (+ `og:image:width/height`) and `<meta name="twitter:card" content="summary_large_image">`
- [ ] **Multilingual only:** one URL per language (e.g. `/`, `/de/`, `/fr/`), `hreflang` link for every
  language + `x-default`, on every language version. Don't auto-redirect by browser language on
  indexable URLs — each URL must always serve the same language.

Tip: generate these at build time from one source (per-language `meta: { title, description }`),
so HTML files, sitemap and switcher can't drift apart.

---

## Phase 4 — Brand assets (🤖, 👤 picks the design)

- [ ] Favicon as SVG (`/favicon.svg`) + `apple-touch-icon.png` (180×180, no transparency) + `icon-512.png`
- [ ] Share image `og-image.png` 1200×630 (name + role + domain, readable at small size)
- [ ] Linked in `<head>`: `rel="icon"` (svg + png) and `rel="apple-touch-icon"`
- [ ] PNGs can be rendered from HTML/SVG with headless Chrome (no new package):
  `"<Chrome>" --headless=new --screenshot=<abs path>.png --window-size=W,H "data:text/html,<…>"`
  (use a `data:` URL — headless Chrome may not read files from temp folders; `%23` for `#`).
- [ ] Name spelled **exactly the same** everywhere (title, logo, OG, JSON-LD, footer).

---

## Phase 5 — Structured data (JSON-LD) (🤖, 👤 provides facts)

For a personal site use **`Person`** (+ `WebSite`), not `Organization`:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://<domain>/#person",
      "name": "<Full Name>",
      "url": "https://<domain>/",
      "image": "https://<domain>/<portrait>.jpg",
      "jobTitle": "<Role>",
      "description": "<one sentence>",
      "email": "mailto:<email>",
      "address": { "@type": "PostalAddress", "addressLocality": "<City>", "addressCountry": "<CC>" },
      "knowsAbout": ["<skill>", "<skill>"],
      "knowsLanguage": ["en", "…"],
      "sameAs": ["https://github.com/…", "https://www.linkedin.com/in/…", "https://instagram.com/…"]
    },
    {
      "@type": "WebSite",
      "@id": "https://<domain>/#website",
      "name": "<Full Name>",
      "url": "https://<domain>/",
      "publisher": { "@id": "https://<domain>/#person" }
    }
  ]
}
```

- [ ] In `<head>` as `<script type="application/ld+json">` (escape `<` as `<`).
- [ ] **Only real data.** Never put placeholder addresses/phones into JSON-LD — Google stores them.
  Leave a field out until it's real.
- [ ] `sameAs` = your real profiles (GitHub, LinkedIn, X, Instagram, Dribbble…) — this links your identity.
- [ ] Projects/blog: `CreativeWork` / `BlogPosting` on their own pages if you have them.
- [ ] Validate: https://search.google.com/test/rich-results?url=<url> (after deploy).

---

## Phase 6 — Legal pages (🤖 drafts, 👤 provides data)

Depends on where you live / who you target:
- **Switzerland / Germany / Austria:** Impressum (name, address, contact) is expected even for personal
  sites with any business intent (freelance, portfolio for clients).
- **Everywhere:** a privacy policy if you collect anything (contact form, analytics) or load third-party
  services (Google Fonts, embeds, CDNs → visitor IP goes to them).

- [ ] Privacy policy lists **only services the site really uses** (from the Phase 0 audit).
- [ ] `noindex, follow` on legal pages; linked from the footer; not in the sitemap.
- [ ] Mark placeholder data clearly in one place (a `CONTACT`/`PERSON` object) until it's real.

---

## Phase 7 — Speed / Core Web Vitals (🤖)

- [ ] PageSpeed Insights (mobile) on the home page → record scores in `TODO_SEO.md`.
- [ ] JS bundle: split / lazy-load below-the-fold parts if > ~500 kB.
- [ ] Self-host fonts (woff2, `font-display: swap`, preload the main one) — faster, and no Google in the privacy policy.
- [ ] Images: modern formats (WebP/AVIF), explicit `width`/`height`, `loading="lazy"` below the fold, hero image preloaded.
- [ ] Don't hide the main content behind long intro animations (hurts LCP).

---

## Phase 8 — Content & authority (🤝 / 👤)

- [ ] One page per important topic you want to be found for (services, each major project/case study).
- [ ] Blog / notes with real expertise (write what people search for in your field).
- [ ] Link the site from every profile you own (GitHub, LinkedIn, Instagram bio, app store pages, talks).
- [ ] Google Business Profile — only if you offer services locally.
- [ ] Get listed where your field lists people (communities, directories, conference speaker pages).

---

## Phase 9 — Monitoring (👤, ~15 min)

- [ ] After ~1 week: Search Console → Pages (indexed?), Sitemaps (URLs discovered), Enhancements.
- [ ] After ~1 week: Bing Webmaster Tools → sitemap processed.
- [ ] Monthly: Search Console → Performance (queries, clicks, CTR) and Core Web Vitals.

---

## Rules for Claude Code while doing this

- Audit first; propose a phase plan; wait for approval before code changes.
- One phase at a time → build passes → report done / not verified → ask before the next phase.
- **Never** deploy, touch DNS, or submit anything in Search Console / Bing without explicit permission in that message.
- Never create accounts, type passwords, or approve OAuth/consent screens — hand those to the user.
- Verify on the live site after deploy (`curl` for tags/text, Rich Results Test for JSON-LD).
- Keep `TODO_SEO.md` updated after every phase (Done / Remaining / Where things live).
