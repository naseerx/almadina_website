import { supabase } from "@/lib/supabase";
import { uploadToCloudinary } from "@/lib/cloudinary";
import type { MediaItem, MediaType } from "./types";

// Legacy bucket — kept only so pre-Cloudinary rows (storage_path set) can still be deleted.
export const BUCKET = "project-media";

/* eslint-disable @typescript-eslint/no-explicit-any */
const toMedia = (r: any): MediaItem => ({
  id: r.id,
  type: r.type,
  url: r.url,
  caption: r.caption ?? "",
  uploadedAt: r.uploaded_at,
});

// ── Upload a file (image or video) to Cloudinary, then record it ─────────────
export async function uploadMediaFile(
  stageId: string,
  file: File,
  kind: "image" | "video_file",
): Promise<MediaItem> {
  const uploaded = await uploadToCloudinary(file, kind === "image" ? "image" : "video");

  const { data, error } = await supabase
    .from("media")
    .insert({
      stage_id: stageId,
      type: kind,
      url: uploaded.url,
      cloudinary_public_id: uploaded.publicId,
      cloudinary_resource_type: uploaded.resourceType,
    })
    .select("*")
    .single();
  if (error) throw error;
  return toMedia(data);
}

// ── Add an external video link (YouTube / Drive / etc.) ──────────────────────
export async function addVideoLink(
  stageId: string,
  url: string,
  caption: string,
): Promise<MediaItem> {
  const { data, error } = await supabase
    .from("media")
    .insert({ stage_id: stageId, type: "video_link" as MediaType, url, caption })
    .select("*")
    .single();
  if (error) throw error;
  return toMedia(data);
}

export async function updateMediaCaption(id: string, caption: string): Promise<void> {
  const { error } = await supabase.from("media").update({ caption }).eq("id", id);
  if (error) throw error;
}

// ── Ask the delete-media Edge Function to remove Cloudinary assets ───────────
// Runs server-side because deleting from Cloudinary requires the API secret,
// which must never reach the browser. Silently no-ops on an empty list.
export async function deleteCloudinaryAssets(
  items: { publicId: string; resourceType: "image" | "video" }[],
): Promise<void> {
  if (!items.length) return;
  const { error } = await supabase.functions.invoke("delete-media", { body: { items } });
  if (error) throw error;
}

// ── Delete a media row, plus its Cloudinary/Storage object ───────────────────
export async function deleteMedia(id: string): Promise<void> {
  const { data: row, error: fetchErr } = await supabase
    .from("media")
    .select("storage_path, cloudinary_public_id, cloudinary_resource_type")
    .eq("id", id)
    .single();
  if (fetchErr) throw fetchErr;

  if (row?.cloudinary_public_id) {
    await deleteCloudinaryAssets([
      { publicId: row.cloudinary_public_id, resourceType: (row.cloudinary_resource_type ?? "image") as "image" | "video" },
    ]);
  } else if (row?.storage_path) {
    await supabase.storage.from(BUCKET).remove([row.storage_path]);
  }

  const { error } = await supabase.from("media").delete().eq("id", id);
  if (error) throw error;
}
