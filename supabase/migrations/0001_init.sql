-- ============================================================================
-- Al-Madina Project Tracker — initial schema, RLS, public-tracker RPC, storage
-- Run this in Supabase → SQL Editor (or `supabase db push`).
-- Safe to re-run: guarded with IF NOT EXISTS / CREATE OR REPLACE / DROP POLICY.
-- ============================================================================

-- ── Enums ───────────────────────────────────────────────────────────────────
do $$ begin
  create type project_status as enum ('active', 'completed');
exception when duplicate_object then null; end $$;

do $$ begin
  create type stage_status as enum ('not_started', 'in_progress', 'completed');
exception when duplicate_object then null; end $$;

do $$ begin
  create type media_type as enum ('image', 'video_file', 'video_link');
exception when duplicate_object then null; end $$;

-- ── Tables ──────────────────────────────────────────────────────────────────
create table if not exists public.projects (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  client_name   text not null,
  address       text not null,
  type          text not null,
  status        project_status not null default 'active',
  is_public     boolean not null default false,
  -- Unguessable share token for the /track/:token public page.
  public_token  text not null unique default encode(gen_random_bytes(12), 'hex'),
  start_date    date not null,
  created_at    timestamptz not null default now()
);

create table if not exists public.stages (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid not null references public.projects(id) on delete cascade,
  "order"     int not null,
  name        text not null,
  status      stage_status not null default 'not_started',
  created_at  timestamptz not null default now()
);
create index if not exists stages_project_id_idx on public.stages(project_id);

create table if not exists public.media (
  id           uuid primary key default gen_random_uuid(),
  stage_id     uuid not null references public.stages(id) on delete cascade,
  type         media_type not null,
  url          text not null,
  -- Storage path (bucket-relative) for uploaded files, so we can delete them.
  storage_path text,
  caption      text not null default '',
  uploaded_at  date not null default current_date,
  created_at   timestamptz not null default now()
);
create index if not exists media_stage_id_idx on public.media(stage_id);

-- ── Row Level Security ──────────────────────────────────────────────────────
-- Admin (authenticated) gets full access. Anonymous users get NOTHING via the
-- tables — the public tracker reads only through the RPC below.
alter table public.projects enable row level security;
alter table public.stages   enable row level security;
alter table public.media    enable row level security;

drop policy if exists "admin full access" on public.projects;
create policy "admin full access" on public.projects
  for all to authenticated using (true) with check (true);

drop policy if exists "admin full access" on public.stages;
create policy "admin full access" on public.stages
  for all to authenticated using (true) with check (true);

drop policy if exists "admin full access" on public.media;
create policy "admin full access" on public.media
  for all to authenticated using (true) with check (true);

-- ── Public tracker RPC ──────────────────────────────────────────────────────
-- The ONLY thing the anon role can call. Returns the full nested project as
-- JSON when the token matches AND the project is public; otherwise null.
-- SECURITY DEFINER lets it read past RLS, but it only ever exposes one project.
create or replace function public.get_project_by_token(p_token text)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'name', p.name,
    'clientName', p.client_name,
    'address', p.address,
    'type', p.type,
    'status', p.status,
    'startDate', p.start_date,
    'stages', coalesce((
      select jsonb_agg(
        jsonb_build_object(
          'id', s.id,
          'order', s."order",
          'name', s.name,
          'status', s.status,
          'media', coalesce((
            select jsonb_agg(
              jsonb_build_object(
                'id', m.id,
                'type', m.type,
                'url', m.url,
                'caption', m.caption,
                'uploadedAt', m.uploaded_at
              ) order by m.created_at
            )
            from public.media m where m.stage_id = s.id
          ), '[]'::jsonb)
        ) order by s."order"
      )
      from public.stages s where s.project_id = p.id
    ), '[]'::jsonb)
  )
  from public.projects p
  where p.public_token = p_token and p.is_public = true;
$$;

-- Only anon/authenticated may execute it (not the general public role chain).
revoke all on function public.get_project_by_token(text) from public;
grant execute on function public.get_project_by_token(text) to anon, authenticated;

-- ── Storage bucket for photos / uploaded videos ─────────────────────────────
insert into storage.buckets (id, name, public)
values ('project-media', 'project-media', true)
on conflict (id) do nothing;

-- Public can READ files (URLs are used on the tracker); only authenticated
-- admins can upload / update / delete.
drop policy if exists "public read project-media" on storage.objects;
create policy "public read project-media" on storage.objects
  for select using (bucket_id = 'project-media');

drop policy if exists "admin write project-media" on storage.objects;
create policy "admin write project-media" on storage.objects
  for insert to authenticated with check (bucket_id = 'project-media');

drop policy if exists "admin update project-media" on storage.objects;
create policy "admin update project-media" on storage.objects
  for update to authenticated using (bucket_id = 'project-media');

drop policy if exists "admin delete project-media" on storage.objects;
create policy "admin delete project-media" on storage.objects
  for delete to authenticated using (bucket_id = 'project-media');
