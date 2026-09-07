-- ============================================================================
-- Rotate a project's public share token (invalidates any previously shared link).
-- Runs as the caller (authenticated already has UPDATE on public.projects via
-- RLS + the grants in 0002), so no SECURITY DEFINER needed.
-- Safe to re-run.
-- ============================================================================

create or replace function public.regenerate_public_token(p_project_id uuid)
returns text
language sql
security invoker
set search_path = public, extensions
as $$
  update public.projects
  set public_token = encode(gen_random_bytes(12), 'hex')
  where id = p_project_id
  returning public_token;
$$;

revoke all on function public.regenerate_public_token(uuid) from public;
grant execute on function public.regenerate_public_token(uuid) to authenticated;
