# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing + project-tracker single-page app for **Al-Madina Constructions** (المدینہ کنسٹرکشنز), a Peshawar-based construction company. Public marketing site plus a client-facing project tracker and an admin area for managing projects/stages. Much of the UI is bilingual (English + Urdu); Urdu content uses RTL Nastaliq styling. Originally scaffolded by [Lovable](https://lovable.dev); pushes to this repo sync back to Lovable.

## Commands

```sh
npm run dev        # Vite dev server on http://localhost:8080 (host "::")
npm run build      # production build
npm run build:dev  # build in development mode (keeps lovable-tagger)
npm run lint       # eslint over the repo
npm run preview    # preview a production build
```

There is **no test runner and no test files** in this project. Do not assume `npm test` exists.

Both `package-lock.json` (npm) and `bun.lockb` (bun) are committed; npm is the primary workflow per the README.

### Environment / Supabase setup

Copy `.env.example` to `.env.local` and fill in `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` (Supabase dashboard → Project Settings → API). `src/lib/supabase.ts` throws at import time if either is missing, so the app won't boot without them. The anon key is safe to expose — table access is locked down by RLS (see below). Schema lives in `supabase/migrations/`; apply with `supabase db push` or by pasting into the Supabase SQL Editor.

## Architecture

- **Stack:** Vite + React 18 + TypeScript, React Router v6, TanStack Query, Tailwind CSS, shadcn/ui (Radix primitives), `lucide-react` icons, `sonner` + Radix toaster for notifications, Supabase (`@supabase/supabase-js`) for auth + data.
- **Routing:** all routes are defined centrally in `src/App.tsx`. Custom routes must go **above** the catch-all `"*"` → `NotFound` route. Route groups:
  - Public marketing: `/` (`Index`), `/new` (`IndexExperimental`, an experimental home variant), `/projects`, `/ongoing-project/:id`.
  - Client tracker: `/track/:token` (`ProjectTracker`) — a shareable per-project status link, publicly readable.
  - Admin: `/admin` (login, `AdminLogin`) → `/admin/dashboard`, `/admin/projects/new`, `/admin/projects/:id`, `/admin/projects/:id/stage/:stageId`. Every admin route except the login itself is wrapped in `RequireAuth` (`src/components/RequireAuth.tsx`), which redirects to `/admin` when there's no Supabase session.
- **Pages vs. components:** `src/pages/` holds route-level screens; `src/components/` holds marketing sections (`Hero`, `Services`, `Projects`, `Team`, `Testimonial`, `Contact`, `Footer`, etc.) composed by `Index`. `src/components/ui/` is the shadcn primitive library — treat it as generated/vendored and avoid hand-editing.
- **Backend: Supabase, not mocks.** Real auth and data live in Supabase; `src/data/ongoingProjects.ts` (typed `OngoingProject[]`, images imported from `src/assets/`) is the one remaining static dataset, used by the public marketing "ongoing projects" pages only.
  - **Auth:** `src/hooks/useAuth.tsx` wraps the app (`AuthProvider` in `App.tsx`) and exposes `session`/`loading`/`signIn`/`signOut` via `useAuth()`, backed by `supabase.auth`. `AdminLogin` calls `signIn` for real — this is not a fake `setTimeout` anymore.
  - **Data layer:** `src/api/` is the only place that talks to Supabase for admin/tracker data — `projects.ts`, `stages.ts`, `media.ts`, `tracker.ts`, plus shared camelCase domain types in `types.ts`. Each module maps Postgres's snake_case rows to/from the camelCase types in `types.ts`; pages should call these functions rather than querying `supabase` directly.
  - **Schema:** `supabase/migrations/0001_init.sql` defines `projects`, `stages`, `media` tables, enums for status fields, and RLS policies — `authenticated` (admin) has full table access, `anon` has none directly. The public `/track/:token` page reads exclusively through a `SECURITY DEFINER` RPC (`get_project_by_token`) that checks the token and `is_public` before returning a single project's nested JSON, so anonymous users can never query the tables themselves.
- **Assets:** many project photos live directly in `src/assets/` (numbered `*.jpg`) and `src/assets/ongoing/<project>/`, imported as ES modules for Vite hashing rather than referenced from `public/`.

## Conventions

- **Path alias:** `@/` → `src/` (configured in both `vite.config.ts` and `tsconfig`). Import as `@/components/...`, `@/lib/utils`, `@/api/...`, `@/hooks/...`.
- **shadcn/ui** is configured via `components.json` (style "default", base color slate, CSS variables). Add primitives with the shadcn CLI rather than writing them by hand.
- **Styling:** Tailwind with CSS-variable theme tokens (`hsl(var(--primary))`, etc.) defined in `src/index.css`. Use `cn()` from `@/lib/utils` to merge classes.
- **Urdu / RTL:** apply the `urdu` class to switch a subtree to RTL Nastaliq. `src/index.css` bumps up small font sizes because Nastaliq is unreadable at `text-xs`/`text-sm`; keep that in mind when adding Urdu UI. The Nastaliq font is loaded via a Google Fonts `@import` at the top of `index.css`.
- **TypeScript is intentionally loose:** `tsconfig` disables `strictNullChecks`, `noImplicitAny`, and unused-var checks. Don't rely on the compiler to catch null/undefined issues.
- The `lovable-tagger` Vite plugin runs only in development mode (component tagging for the Lovable editor); it is stripped from production builds.

## Knowledge graph (code-review-graph MCP)

Per the user's global `CLAUDE.md`, prefer the `code-review-graph` MCP tools over Grep/Glob/Read for exploration, impact analysis, and review. Note the graph is currently sparse for this repo (few communities/flows), so fall back to file tools when it returns little.
