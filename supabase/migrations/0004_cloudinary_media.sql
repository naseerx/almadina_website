-- ============================================================================
-- Switch stage media storage from Supabase Storage to Cloudinary.
-- New uploads populate cloudinary_public_id + cloudinary_resource_type instead
-- of storage_path. storage_path stays for any pre-existing Supabase-hosted
-- rows so old media keeps working / deleting correctly.
-- Safe to re-run.
-- ============================================================================

alter table public.media add column if not exists cloudinary_public_id text;
alter table public.media add column if not exists cloudinary_resource_type text;
