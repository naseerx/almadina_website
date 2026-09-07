import { supabase } from "@/lib/supabase";
import { BUCKET, deleteCloudinaryAssets } from "./media";
import type { MediaItem, Stage, StageStatus } from "./types";

/* eslint-disable @typescript-eslint/no-explicit-any */
const toMedia = (r: any): MediaItem => ({
  id: r.id,
  type: r.type,
  url: r.url,
  caption: r.caption ?? "",
  uploadedAt: r.uploaded_at,
});

export interface StageDetail {
  id: string;
  order: number;
  name: string;
  status: StageStatus;
  projectId: string;
  projectName: string;
  media: MediaItem[];
}

// ── Stage + parent project name + media ──────────────────────────────────────
export async function getStageDetail(stageId: string): Promise<StageDetail> {
  const { data, error } = await supabase
    .from("stages")
    .select("id, order, name, status, project_id, projects(name), media(*)")
    .eq("id", stageId)
    .single();
  if (error) throw error;

  const media: MediaItem[] = (data.media ?? [])
    .map(toMedia)
    .sort((a: MediaItem, b: MediaItem) => a.uploadedAt.localeCompare(b.uploadedAt));

  return {
    id: data.id,
    order: data.order,
    name: data.name,
    status: data.status,
    projectId: data.project_id,
    projectName: (data.projects as any)?.name ?? "",
    media,
  };
}

export async function updateStageStatus(stageId: string, status: StageStatus): Promise<void> {
  const { error } = await supabase.from("stages").update({ status }).eq("id", stageId);
  if (error) throw error;
}

// ── Add a new stage at the end of a project's timeline ────────────────────────
export async function createStage(projectId: string, name: string, order: number): Promise<Stage> {
  const { data, error } = await supabase
    .from("stages")
    .insert({ project_id: projectId, name, order })
    .select("id, order, name, status")
    .single();
  if (error) throw error;
  return { id: data.id, order: data.order, name: data.name, status: data.status, mediaCount: 0 };
}

export async function renameStage(stageId: string, name: string): Promise<void> {
  const { error } = await supabase.from("stages").update({ name }).eq("id", stageId);
  if (error) throw error;
}

// ── Persist a new stage order after a drag/up-down reorder ────────────────────
export async function reorderStages(orderedIds: string[]): Promise<void> {
  const results = await Promise.all(
    orderedIds.map((id, i) => supabase.from("stages").update({ order: i + 1 }).eq("id", id)),
  );
  const failed = results.find((r) => r.error);
  if (failed?.error) throw failed.error;
}

// ── Delete a stage, plus its media rows (FK cascade) and their media files ────
export async function deleteStage(stageId: string): Promise<void> {
  const { data: media, error: mediaErr } = await supabase
    .from("media")
    .select("storage_path, cloudinary_public_id, cloudinary_resource_type")
    .eq("stage_id", stageId);
  if (mediaErr) throw mediaErr;

  const cloudinaryItems = (media ?? [])
    .filter((m) => m.cloudinary_public_id)
    .map((m) => ({
      publicId: m.cloudinary_public_id as string,
      resourceType: (m.cloudinary_resource_type ?? "image") as "image" | "video",
    }));
  await deleteCloudinaryAssets(cloudinaryItems);

  const legacyPaths = (media ?? []).map((m) => m.storage_path as string).filter(Boolean);
  if (legacyPaths.length) {
    await supabase.storage.from(BUCKET).remove(legacyPaths);
  }

  const { error } = await supabase.from("stages").delete().eq("id", stageId);
  if (error) throw error;
}
