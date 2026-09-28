# TODO — SEO (almadinabuilders.com)

Tracks progress against `SEO_PLAYBOOK.md`. Updated after every phase.

> **Note:** the playbook is written for a *personal* site. This repo is a **company** site
> (Al-Madina Constructions, Peshawar), so Phase 5 uses a business type (`GeneralContractor` +
> `WebSite`) instead of `Person`, and Phase 6 follows Pakistani norms (no Impressum).

Last updated: 2026-09-28 — Phase 2 (crawlability) done locally, **not yet deployed**.

Decisions: this repo is the target (not naseer.pk). `/ongoing-project/:id` and `/new` → `noindex`, not in sitemap (defaults; revisit if the ongoing section comes back).

---

## Audit findings (Phase 0)

| Item | Finding |
|---|---|
| Framework | Vite 5 + React 18 + TS, React Router v6 (`BrowserRouter`), client-side only (`createRoot`). Lovable-scaffolded. |
| Hosting | Vercel, project `almadina-website` (team `naseerxs-projects`). SPA rewrite `/(.*) → /index.html` in `vercel.json`. |
| Live URL | **https://www.almadinabuilders.com** (canonical host). `almadinabuilders.com` and `http://` → **308** → `https://www.` ✅ |
| Registrar / DNS | Registrar **Hostinger**; DNS also **Hostinger** (`ns1/ns2.dns-parking.com`, SOA `dns.hostinger.com`). Edit records in Hostinger hPanel → DNS Zone. Apex A → `216.198.79.1` (Vercel), `www` CNAME → Vercel. |
| Existing TXT | `google-site-verification=HumjCYqr…` **already on the apex** → a Search Console Domain property was probably already created/verified. Also SPF for Hostinger mail. **Do not delete either.** |
| Text in HTML? | **No.** `curl` returns an empty `<div id="root"></div>`; only the `<title>` is visible text. |
| `<html lang>` | `en` ✅ |
| `<title>` / description | Present, same on every URL (static `index.html`). Title 58 chars ✅; description 161 chars ✅. |
| Canonical | ❌ none |
| Open Graph | Partial: `og:title/description/type` ok; **`og:image` and `twitter:image` point to Lovable's placeholder image; `twitter:site` = `@Lovable`**. Missing `og:url`, `og:site_name`, `og:locale`, image size. |
| Favicon | `<link rel="icon">` → full wide logo PNG (863×275, hashed). `public/favicon.ico` is actually a 73×74 PNG. No SVG, no apple-touch-icon, no 512 icon. |
| JSON-LD | ❌ none |
| `robots.txt` | Exists (allows everything), **no `Sitemap:` line**, doesn't block `/admin` or `/track/`. |
| `sitemap.xml` | ❌ none — `/sitemap.xml` returns the SPA `index.html` with **HTTP 200**. |
| 404 handling | Every unknown URL returns **HTTP 200** + SPA shell (soft 404). |
| Languages | Public site is **English only** → no hreflang needed. Urdu (RTL) is used only in admin and the `/track/:token` client tracker (not indexable). |
| Headings | Home: one `<h1>` ("Building the Future of Peshawar") ✅, sections use h2/h3 ✅. **`/projects` has no `<h1>`** (starts at h2). |
| Images | Content images have `alt` ✅ (a few generic: "Project full view", "Full view"). No WebP/AVIF, only 1 `loading="lazy"`; `src/assets` is **231 MB** of JPG/PNG. |
| JS bundle | One chunk **~820 kB** (`dist/assets/index-*.js`), no code-splitting (admin code ships to visitors). |
| Fonts | Google Fonts: Inter (`index.html`), Noto Nastaliq Urdu (`src/index.css` `@import`, loaded on every page). |
| External services | Google Fonts, Google Maps embed (Contact + ongoing-project pages), YouTube embeds (ongoing-project pages), WhatsApp (`wa.me` links), Supabase (auth/data for admin + tracker), Cloudinary (tracker/admin media). No analytics. |
| Forms | Contact form sends **nothing to a server** — it opens WhatsApp (`wa.me/923339221258`) with the message prefilled. Quote dialog: check in Phase 6. |
| Legal pages | ❌ none (no privacy policy / terms). |
| Name consistency | ❌ Mixed: "Al-Madina Constructions" (title/OG), "Almadina" (logo alt, experimental home), "Al-Madina Al-Munawwara Constructions & Builders" (footer), "Al Madina Al Monawara real estate and builders" (address), domain "almadinabuilders". |

### Routes

| Route | Indexable? | Notes |
|---|---|---|
| `/` | ✅ yes | Main one-pager (About, Services, Team, Testimonials, Projects, Stats, Contact). |
| `/projects` | ✅ yes | All projects list. Needs its own title/description + `<h1>`. |
| `/ongoing-project/:id` | ⚠️ decide | Section is hidden from home ("Hide the ongoing project section"). Index only if you re-enable it. |
| `/new` | ❌ noindex | Experimental duplicate of home. |
| `/admin`, `/admin/*` | ❌ noindex + disallow | Admin panel. |
| `/track/:token` | ❌ noindex | Private per-client tracker links. Must never be indexed. |
| `*` (404) | ❌ | Currently HTTP 200 — should not be. |

Unrouted page files exist (`AboutPage`, `ServicesPage`, `TeamPage`, `ContactPage`, `TestimonialsPage`, `OngoingProjectsPage`) — dead code today, but candidates for Phase 8 topic pages.

---

## Done

- [x] Phase 0 — audit (this file)
- [x] HTTPS + single canonical host (`www`) with 308 redirects (already in place)
- [x] `<html lang="en">`, a sensible home `<title>` and meta description (already in place)
- [x] `robots.txt` exists and allows crawling (needs changes, see Phase 2)
- [x] Phase 2 (local, build passes):
  - `robots.txt`: single `User-agent: *`, `Disallow: /admin`, `Sitemap:` line
  - `public/sitemap.xml`: `/` and `/projects` with `<lastmod>`
  - Build-time pre-render: `src/entry-server.tsx` + `scripts/prerender.mjs` write real HTML for `/` (`dist/index.html`), `/projects` (`dist/projects.html`) and the 404 page (`dist/404.html`, noindex). Verified locally: headline text present in the HTML, 73/73 asset URLs resolve, app still boots in headless Chrome on `/`, `/projects`, `/admin`.
  - `vercel.json`: catch-all SPA rewrite removed → unknown URLs get Vercel's `404.html` with HTTP 404; `cleanUrls`; client-only routes (`/admin*`, `/track/*`, `/new`, `/ongoing-project/*`) rewrite to an empty `dist/app.html` shell with `<meta name="robots" content="noindex">` + `X-Robots-Tag: noindex` header
  - `/projects` now has an `<h1>` ("Our Projects")
  - Generic lightbox alts replaced with "<project title> — photo N" / "<project> — full view"
- [x] Google site-verification TXT exists on the apex (status in Search Console **not verified by me**)

## Remaining

### Phase 1 — Search engines (👤 / 🤝)
- [ ] 👤 Confirm whether Search Console already has a **Domain property** for `almadinabuilders.com` (the TXT record suggests yes). If yes → skip verification.
- [ ] Submit `https://www.almadinabuilders.com/sitemap.xml` (after Phase 2 is deployed).
- [ ] Request indexing for `/` and `/projects`.
- [ ] Bing Webmaster Tools → import from Search Console (👤 sign-in + Google consent).

### Phase 2 — Crawlability (🤖) — code done, awaiting deploy + live check
- [ ] 👤 OK to deploy (preview first), then verify live: `curl` text on `/` and `/projects`; `/foo` → 404; `/admin`, `/track/x`, `/new` → `X-Robots-Tag: noindex` and still load; `/projects.html` → 308 `/projects`; `/sitemap.xml` returns XML.

### Phase 3 — Head tags (🤖)
- [ ] Per-route `<title>` + description (`/`, `/projects`), generated at build time from one source.
- [ ] `<link rel="canonical">` → `https://www.almadinabuilders.com/…`
- [ ] Full OG set (`og:url`, `og:site_name`, `og:locale=en_PK`, own `og:image` 1200×630 + size) and Twitter card; **remove `@Lovable` / Lovable image**.
- [ ] ~~hreflang~~ — not applicable (English only).

### Phase 4 — Brand assets (🤖, 👤 picks design)
- [ ] `favicon.svg` (square mark, not the wide logo), `apple-touch-icon.png` 180×180, `icon-512.png`, real `favicon.ico`.
- [ ] `og-image.png` 1200×630.
- [ ] One company name used everywhere (👤 to choose).

### Phase 5 — Structured data (🤖, 👤 confirms facts)
- [ ] JSON-LD `@graph`: `GeneralContractor` (LocalBusiness) + `WebSite`. Candidate facts **already on the site** (to be confirmed by 👤): phone `+92 333 9221258`, email `almadinaconstructions260@gmail.com`, address "Darmangi Garden Street 1, Warsak Road, Peshawar", hours Sat–Thu 09:00–18:00, founded 2001, area served Peshawar.
- [ ] Missing / unconfirmed — **leave out until provided**: exact geo coordinates, postal code, logo URL decision, `sameAs` profiles (Facebook / Instagram / YouTube / TikTok / Google Business Profile), founder name.
- [ ] Validate with Rich Results Test after deploy.

### Phase 6 — Legal (🤖 drafts, 👤 provides data)
- [ ] Privacy policy (recommended): Google Fonts, Google Maps, YouTube, WhatsApp hand-off, Supabase/Cloudinary (tracker only). `noindex, follow`, footer link, not in sitemap.
- [ ] ~~Impressum~~ — not required (Pakistan).

### Phase 7 — Speed (🤖)
- [ ] PageSpeed Insights mobile score for `/` → record here.
- [ ] Split admin/tracker routes with `React.lazy` (bundle ~820 kB).
- [ ] Self-host Inter; load Noto Nastaliq only on Urdu pages (not the public home).
- [ ] Convert/resize images to WebP/AVIF, `width`/`height`, `loading="lazy"` below the fold, preload hero image.

### Phase 8 — Content & authority (🤝 / 👤)
- [ ] Separate pages per service / key project (reuse the unrouted `*Page.tsx` files?).
- [ ] **Google Business Profile** — high value for a local Peshawar contractor.
- [ ] Link the site from Facebook / Instagram / YouTube / WhatsApp Business profile.
- [ ] Local directories (Zameen.com, Graana, OLX business listings, etc.).

### Phase 9 — Monitoring (👤)
- [ ] After ~1 week: Search Console Pages / Sitemaps; Bing sitemap processed.
- [ ] Monthly: Performance + Core Web Vitals.

---

## Where things live

| What | File |
|---|---|
| Global head tags (title, description, OG, favicon link, fonts) | `index.html` |
| Urdu font `@import`, theme tokens | `src/index.css` |
| Routes | `src/App.tsx` |
| Browser entry | `src/main.tsx` |
| Shared providers + route table (`AppProviders`, `AppRoutes`) | `src/App.tsx` |
| Build-time render entry | `src/entry-server.tsx` |
| Pre-render script (writes `dist/*.html`) — Phase 3 per-page head tags go here | `scripts/prerender.mjs` |
| Build pipeline | `package.json` → `build` |
| Sitemap | `public/sitemap.xml` (add new indexable pages here + in `PAGES` in `scripts/prerender.mjs`) |
| robots.txt / static root files | `public/` (`robots.txt`, `favicon.ico`) |
| Hosting config (cleanUrls, SPA rewrites for client-only routes, noindex headers) | `vercel.json` |
| Build config / `@` alias | `vite.config.ts` |
| Home page composition | `src/pages/Index.tsx` |
| Hero / `<h1>` | `src/components/Hero.tsx` |
| Contact data (address, phone, email, hours) + contact form (→ WhatsApp) + Maps embed | `src/components/Contact.tsx` |
| Footer (name, tagline "since 2001", links) | `src/components/Footer.tsx` |
| WhatsApp floating button | `src/components/WhatsAppButton.tsx` |
| Projects list (`/projects`) | `src/pages/AllProjects.tsx`, `src/components/AllProjectsList.tsx` |
| Home projects section | `src/components/HomeProjects.tsx` |
| Ongoing projects data (YouTube, coordinates) | `src/data/ongoingProjects.ts` |
| Logo | `src/assets/logo-rm.png` |
| 404 page | `src/pages/NotFound.tsx` |
| DNS records | Hostinger hPanel → Domains → almadinabuilders.com → DNS Zone |
| Deploys / domains | Vercel project `almadina-website` |
