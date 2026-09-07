-- ============================================================================
-- Fix: "Automatically expose new tables" was disabled at project creation, so
-- Postgres never granted base table privileges to `authenticated` — RLS
-- policies exist but are unreachable without these grants first.
-- Safe to re-run.
-- ============================================================================

grant usage on schema public to authenticated;

grant select, insert, update, delete on public.projects to authenticated;
grant select, insert, update, delete on public.stages   to authenticated;
grant select, insert, update, delete on public.media    to authenticated;
