# TODO — SEO (almadinabuilders.com)

Tracks progress against `SEO_PLAYBOOK.md`. Updated after every phase.

> **Note:** the playbook is written for a *personal* site. This repo is a **company** site
> (Al-Madina Constructions, Peshawar), so Phase 5 uses a business type (`GeneralContractor` +
> `WebSite`) instead of `Person`, and Phase 6 follows Pakistani norms (no Impressum).

Last updated: 2026-09-28 — Phase 2 live + verified. Phase 3 (head tags) **live + verified**. Phase 4 (brand assets) **live + verified**. Phase 5 (JSON-LD + name) **live + validated**. Phase 7 (speed) **live + measured** (mobile 67 → 82). Phase 1 (Google) done; Bing pending. Phase 6 (privacy page) **live + verified**. Phase 7b (LCP) **live + measured** (Lighthouse mobile on live: 72 → 91).

Decisions: official name = **"Al-Madina Al-Munawara Builders"** (👤 2026-09-28); "Al-Madina Constructions" kept only as JSON-LD `alternateName`. This repo is the target (not naseer.pk). `/ongoing-project/:id` and `/new` → `noindex`, not in sitemap (defaults; revisit if the ongoing section comes back).

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
- [x] Phase 2 — deployed to production 2026-09-28 (`dpl_H7JcB5XqCMKjsqT2gXP4KNY9DPQD`, commit `ea0dc7b`) and verified live: `/` and `/projects` contain page text in raw HTML; `/foo` → 404; `/projects.html` → 308 `/projects`; `/admin*`, `/track/*`, `/new`, `/ongoing-project/*`, `/app` → 200 + `X-Robots-Tag: noindex` and still boot in Chrome; `robots.txt` and `sitemap.xml` (application/xml) served correctly.
  - `robots.txt`: single `User-agent: *`, `Disallow: /admin`, `Sitemap:` line
  - `public/sitemap.xml`: `/` and `/projects` with `<lastmod>`
  - Build-time pre-render: `src/entry-server.tsx` + `scripts/prerender.mjs` write real HTML for `/` (`dist/index.html`), `/projects` (`dist/projects.html`) and the 404 page (`dist/404.html`, noindex). Verified locally: headline text present in the HTML, 73/73 asset URLs resolve, app still boots in headless Chrome on `/`, `/projects`, `/admin`.
  - `vercel.json`: catch-all SPA rewrite removed → unknown URLs get Vercel's `404.html` with HTTP 404; `cleanUrls`; client-only routes (`/admin*`, `/track/*`, `/new`, `/ongoing-project/*`) rewrite to an empty `dist/app.html` shell with `<meta name="robots" content="noindex">` + `X-Robots-Tag: noindex` header
  - `/projects` now has an `<h1>` ("Our Projects")
  - Generic lightbox alts replaced with "<project title> — photo N" / "<project> — full view"
- [x] Phase 3 — live and verified with curl + headless Chrome (titles, descriptions, canonical, OG/Twitter on `/` and `/projects`; noindex on 404 and `/track`; sitemap from `PAGES`): per-page head tags generated from `src/seo.ts` by `scripts/prerender.mjs`
  - `/`: title "Al-Madina Constructions — Construction Company in Peshawar" (58), description 148 chars
  - `/projects`: title "Our Projects in Peshawar — Al-Madina Constructions" (50), description 147 chars
  - canonical + `og:url` (www, no trailing slash except `/`), `og:type/site_name/locale=en_PK/title/description`, `twitter:card/title/description`
  - 404 and app shell: `noindex`, no canonical
  - Lovable `og:image` / `twitter:site=@Lovable` removed (no `og:image` until Phase 4)
  - `sitemap.xml` now generated at build from `PAGES` (static `public/sitemap.xml` removed)
  - `RouteTitle` in `App.tsx` updates `document.title` on client-side navigation
  - hreflang: n/a (English only)
- [x] Phase 4 — live and verified (all 5 files 200 with correct types, live `og-image.png` byte-identical to repo, icon/OG tags on `/` and `/projects`) — logo crop, rendered with headless Chrome from `scripts/brand/*.html`:
  - `favicon.ico` (16/32/48, **house-only** crop — the calligraphy is unreadable at that size), rounded white tile
  - `apple-touch-icon.png` 180×180, `icon-192.png`, `icon-512.png` — **full mark** (house + calligraphy) on white, no transparency
  - `og-image.png` 1200×630 — full logo, "Construction Company in Peshawar · Since 2001", domain, brand bars
  - `<head>`: `rel=icon` (ico + 192 png), `rel=apple-touch-icon`; old link to the wide logo PNG removed
  - `og:image` + width/height/alt, `twitter:card=summary_large_image`, `twitter:image` on every page (`SITE.image` in `src/seo.ts`)
- [x] Phase 5 — live 2026-09-28; **Google Rich Results Test: 2 valid items (Local business + Organization)**, only optional warnings: missing `priceRange`, missing `postalCode`. Postal code **25000** added + deployed 2026-09-28 → re-test: Organization **0 issues**, Local business only optional `priceRange`:
  - Name **"Al-Madina Al-Munawara Builders"** applied to titles, OG, JSON-LD, `<meta name=author>`, About heading/story, footer tagline + ©, Contact address line + map title, logo alts (header/footer/tracker), tracker copy. Left as-is: short "Al-Madina" in prose, client testimonial quotes, street/project names, "Madina Munawwara" references, `/new` (noindex).
  - Titles: `/` "Al-Madina Al-Munawara Builders — Construction in Peshawar" (57), `/projects` "Our Projects in Peshawar — Al-Madina Al-Munawara Builders" (57)
  - JSON-LD `@graph` on `/` only: `GeneralContractor` (name, alternateName, url, logo, image, description, telephone, email, foundingDate, PostalAddress, areaServed Peshawar, opening hours Sat–Thu 09–18) + `WebSite` (publisher → business). `<` escaped. Parses as valid JSON.
- [x] Phase 7 — live 2026-09-28 (commit `ec9dd03`):
  - **After (PageSpeed mobile):** Performance **82** (was 67) · FCP **1.7 s** (was 3.2) · LCP **4.3 s** (was 17.3) · TBT 90 ms · Speed Index 4.3 s · Accessibility 91 · Best Practices 100 · SEO 100. Desktop: **100** (FCP 0.4 s, LCP 0.8 s).
  - Verified live: hero + font preloaded (hero 258 KB, font 48 KB), no Google Fonts on `/`, main JS 493 kB, 404 ok, `/admin` + `/admin/dashboard` (redirects to login) + `/track` + `/projects` load.
  - **Baseline (PageSpeed mobile, 2026-09-28, before):** Performance **67**, Accessibility 91, Best Practices 100, SEO 100 · FCP 3.2 s · **LCP 17.3 s** · TBT 90 ms · Speed Index 3.5 s
  - Images: 80 used photos resized from 4032×3024 to max 1600 px (JPEG q60; hero q40 — it sits under a dark overlay): 144 MB → 29 MB. Hero 2 MB+ → 252 KB. Originals remain in git history.
  - `loading="lazy"` + `decoding="async"` on team photos, home project cards, ongoing-project gallery; `/projects` keeps the first 3 cards eager. Home now loads ~0.4 MB of images up front (was 30.8 MB); `/projects` ~0.9 MB (was 115 MB).
  - Hero background preloaded with `fetchpriority="high"` (added by `scripts/prerender.mjs`).
  - JS: admin, tracker, `/new`, ongoing-project pages lazy-loaded; Supabase auth moved into a lazy `AdminLayout` → main bundle **833 kB → 493 kB** (gzip 235 → 152 kB).
  - Fonts: Inter self-hosted (`public/fonts/inter-latin.woff2`, 47 KB, preloaded); Google Fonts link removed from public pages. Noto Nastaliq Urdu now only loaded by the Urdu screens (`src/styles/urdu-font.css`).
- [x] Phase 1 (Google) — 2026-09-28:
  - Search Console **Domain property `almadinabuilders.com` already verified** — owned by a *different* Google account than muhammadnaseer.dev@gmail.com (Chrome account `/u/3/`); the existing TXT record belongs to it. Data since 22 Sep 2026.
  - Sitemap `https://www.almadinabuilders.com/sitemap.xml` **submitted** (first sitemap on the property).
  - URL Inspection: `/` was indexed (old empty-SPA version) → **re-indexing requested**; `/projects` was unknown to Google → **indexing requested** (live test passed). Both in Google's priority crawl queue.
- [x] Phase 6 — live 2026-09-28, verified (`/privacy` 200 with page text in HTML, `noindex, follow`, footer link on `/`, not in sitemap): `/privacy` page (`src/pages/PrivacyPage.tsx`), pre-rendered, `noindex, follow`, not in sitemap, linked in the footer next to ©. Lists only what the site really does: no cookies/analytics; contact form → WhatsApp (nothing stored); Vercel hosting logs; Google Maps embed; YouTube embeds on project pages; Inter self-hosted, Urdu font from Google Fonts on tracker/staff screens; tracker via Supabase + Cloudinary; staff login via Supabase (session in local storage). Contact details read from `BUSINESS` in `src/seo.ts`. No Impressum (not required in Pakistan). All noindex pages now use `noindex, follow`.
- [x] Phase 7b — live 2026-09-28 (commit `cfc0454`). **Lighthouse 12 mobile against live `/`: before 72 / LCP 21.5 s / 7.4 MB → after 91 / LCP 3.1 s / FCP 1.7 s / TBT 0 / CLS 0 / 453 KB, 3 images on load.** All routes verified live with 0 console errors. LCP fixes:
  - Diagnosis (Lighthouse on live `/`): LCP element = hero `<h1>`, ~20 s *render delay* in simulation; `createRoot` replaced the pre-rendered DOM, repainting the headline and re-creating every `<img>` with `src` set before `loading` → **all ~25 photos (7.4 MB) downloaded eagerly** despite `loading="lazy"`.
  - `src/main.tsx`: **`hydrateRoot`** when `#root` has pre-rendered markup, `createRoot` otherwise (app shell / dev). Checked all routes with Vercel-like rewrites: 0 console errors, no hydration mismatches.
  - `loading`/`decoding` now come before `src` on lazy `<img>`s (so client-side navigation stays lazy too).
  - Hero `<h1>`: removed the opacity-0 fade-in (it's the LCP element).
  - Display logo `src/assets/logo-sm.png` (480×153, 70 KB) instead of the 863×275 208 KB original in Header/Footer/Tracker; original `logo-rm.png` kept for `scripts/brand/` templates.
  - Hero photo re-encoded from the original: 1280 px, JPEG q35 → 149 KB (was 252 KB).
  - **Local Lighthouse (mobile, served like Vercel):** 83 → **91**; LCP 4.5 → **3.3 s**; FCP 1.8 s; TBT 0 ms; bytes on load **7.4 MB → 449 KB**. (Removing the hero preload made no difference, so it stays.)
- [x] Google site-verification TXT exists on the apex (status in Search Console **not verified by me**)

## Remaining

### Phase 1 — Search engines — remaining
- [ ] Re-check Search Console → Sitemaps in 1–2 days: status was **"Couldn't fetch"** right after submitting (usual first-submission state; the file returns 200 `application/xml`, valid XML, to a Googlebot user agent). If it still fails after 48 h, delete and re-submit it.
- [ ] 👤 **Bing Webmaster Tools** → sign in → Import from Google Search Console (approve Google consent yourself) — then Claude can check the import / submit the sitemap there.
- [ ] Optional: give `muhammadnaseer.dev@gmail.com` access (Search Console → Settings → Users and permissions) so both accounts can manage it.

### Phase 3 — Head tags (🤖) — remaining
- [ ] Check WhatsApp/Facebook link preview of `/` after Phase 4 deploy (FB Sharing Debugger / opengraph.xyz).

### Phase 4 — Brand assets — remaining
- [x] Official name chosen and applied (Phase 5).
- [ ] ~~`favicon.svg`~~ — skipped: there's no vector source of the logo (only `logo-rm.png`). Add one if you get an SVG/AI file from the designer.

### Phase 5 — Structured data — remaining
- [ ] 👤 Provide to add later (left out until real): **`priceRange`** (Google flags it as optional-missing; e.g. "PKR" range or omit), **`sameAs`** profile URLs (Facebook, Instagram, YouTube, TikTok, Google Business Profile), **geo coordinates**.
- [ ] Details used are the ones already published in the Contact section (phone, email, address, hours, founded 2001) — 👤 tell me if any is outdated.
- [ ] Nice-to-have: make `Contact.tsx` / `Footer.tsx` read phone/email/address from the same source as `BUSINESS` in `src/seo.ts` (currently duplicated).

### Phase 6 — Legal — remaining
- [ ] 👤 Read the policy text once — it's a factual draft of what the site does, not legal advice. Keep it in sync when adding analytics, a real form backend, new embeds, etc. (`src/pages/PrivacyPage.tsx`).

### Phase 7 — Speed — remaining
- [ ] Re-run PageSpeed Insights (pagespeed.web.dev, mobile) when convenient and record it — the PSI API daily quota was exhausted and the Chrome extension was disconnected on 2026-09-28, so the post-7b number below is from Lighthouse 12 run locally against the live site (same engine, not identical to PSI).
- [ ] LCP still 3.1 s in simulation (target < 2.5 s): remaining cost is the main JS (149 kB gz) + font + hero sharing the throttled connection. Next options: lazy-load the Contact form's zod/react-hook-form, AVIF hero via `image-set()`.
- [ ] 👤 Log in to `/admin` once to confirm login still works after the auth layout change (not testable by Claude).
- [ ] Optional next steps: AVIF/WebP versions with `<picture>` fallback (sips can write AVIF; no WebP encoder installed); smaller thumbnails for project cards (cards show ~400px, files are 1600px); lazy-load the Contact form (zod + react-hook-form ≈ 250 kB source in the main bundle); drop the 1 s fade-in on the hero headline.
- [ ] ~20 unused photos in `src/assets` (not shipped, only repo weight) — delete if you don't need them.

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
| Global head (fonts, favicon link, `seo:start/seo:end` markers replaced at build) | `index.html` |
| Inter `@font-face`, `.urdu` class, theme tokens | `src/index.css` |
| Urdu font (Google Fonts import, admin/tracker only) | `src/styles/urdu-font.css` |
| Self-hosted font file | `public/fonts/inter-latin.woff2` |
| Admin auth layout (lazy; keeps Supabase out of public bundle) | `src/pages/admin/AdminLayout.tsx` |
| Routes | `src/App.tsx` |
| Browser entry | `src/main.tsx` |
| Shared providers + route table (`AppProviders`, `AppRoutes`) | `src/App.tsx` |
| Build-time render entry | `src/entry-server.tsx` |
| Pre-render script (writes `dist/*.html`) — Phase 3 per-page head tags go here | `scripts/prerender.mjs` |
| Build pipeline | `package.json` → `build` |
| **Per-page titles/descriptions, site name/URL, sitemap source, JSON-LD business facts** | `src/seo.ts` (`SITE`, `BUSINESS`, `PAGES`) |
| Sitemap | generated into `dist/sitemap.xml` by `scripts/prerender.mjs` from `PAGES` |
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
| Logo (source for all icons / brand templates) | `src/assets/logo-rm.png` |
| Logo shown on the site (small copy) | `src/assets/logo-sm.png` |
| Hydrate vs render decision | `src/main.tsx` |
| Favicons, touch icon, share image | `public/` (`favicon.ico`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `og-image.png`) |
| Templates to regenerate them | `scripts/brand/` (`crop.html`, `og.html`, README) |
| 404 page | `src/pages/NotFound.tsx` |
| Privacy policy | `src/pages/PrivacyPage.tsx` (route `/privacy`, meta in `src/seo.ts`) |
| DNS records | Hostinger hPanel → Domains → almadinabuilders.com → DNS Zone |
| Deploys / domains | Vercel project `almadina-website` |
