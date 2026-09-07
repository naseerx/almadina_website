import { supabase } from "@/lib/supabase";
import { BUCKET, deleteCloudinaryAssets } from "./media";
import type { Project, ProjectStatus, ProjectSummary, Stage } from "./types";

// ── Row mappers ──────────────────────────────────────────────────────────────
/* eslint-disable @typescript-eslint/no-explicit-any */
const toProject = (r: any): Project => ({
  id: r.id,
  name: r.name,
  clientName: r.client_name,
  address: r.address,
  type: r.type,
  status: r.status,
  isPublic: r.is_public,
  publicToken: r.public_token,
  startDate: r.start_date,
});

// ── Dashboard: projects + stage progress counts ──────────────────────────────
export async function listProjects(): Promise<ProjectSummary[]> {
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;

  const { data: stages, error: stagesErr } = await supabase
    .from("stages")
    .select("project_id,status");
  if (stagesErr) throw stagesErr;

  const counts = new Map<string, { total: number; completed: number }>();
  for (const s of stages ?? []) {
    const c = counts.get(s.project_id) ?? { total: 0, completed: 0 };
    c.total += 1;
    if (s.status === "completed") c.completed += 1;
    counts.set(s.project_id, c);
  }

  return (projects ?? []).map((r) => {
    const c = counts.get(r.id) ?? { total: 0, completed: 0 };
    return { ...toProject(r), stagesTotal: c.total, stagesCompleted: c.completed };
  });
}

// ── Single project + its stages (with media counts) ──────────────────────────
export async function getProjectWithStages(
  id: string,
): Promise<{ project: Project; stages: Stage[] }> {
  const { data, error } = await supabase
    .from("projects")
    .select("*, stages(id, order, name, status, media(count))")
    .eq("id", id)
    .single();
  if (error) throw error;

  const stages: Stage[] = (data.stages ?? [])
    .map((s: any) => ({
      id: s.id,
      order: s.order,
      name: s.name,
      status: s.status,
      mediaCount: s.media?.[0]?.count ?? 0,
    }))
    .sort((a: Stage, b: Stage) => a.order - b.order);

  return { project: toProject(data), stages };
}

// ── Create a project with its ordered stages ─────────────────────────────────
export async function createProject(input: {
  name: string;
  clientName: string;
  address: string;
  type: string;
  startDate: string;
  stageNames: string[];
}): Promise<string> {
  const { data: project, error } = await supabase
    .from("projects")
    .insert({
      name: input.name,
      client_name: input.clientName,
      address: input.address,
      type: input.type,
      start_date: input.startDate,
    })
    .select("id")
    .single();
  if (error) throw error;

  if (input.stageNames.length) {
    const rows = input.stageNames.map((name, i) => ({
      project_id: project.id,
      order: i + 1,
      name,
    }));
    const { error: stagesErr } = await supabase.from("stages").insert(rows);
    if (stagesErr) throw stagesErr;
  }

  return project.id as string;
}

export async function setProjectPublic(id: string, isPublic: boolean): Promise<void> {
  const { error } = await supabase.from("projects").update({ is_public: isPublic }).eq("id", id);
  if (error) throw error;
}

export async function setProjectStatus(id: string, status: ProjectStatus): Promise<void> {
  const { error } = await supabase.from("projects").update({ status }).eq("id", id);
  if (error) throw error;
}

// ── Edit project details ──────────────────────────────────────────────────────
export async function updateProject(
  id: string,
  input: { name: string; clientName: string; address: string; type: string; startDate: string },
): Promise<void> {
  const { error } = await supabase
    .from("projects")
    .update({
      name: input.name,
      client_name: input.clientName,
      address: input.address,
      type: input.type,
      start_date: input.startDate,
    })
    .eq("id", id);
  if (error) throw error;
}

// ── Regenerate the public share token (revokes the old link) ─────────────────
export async function regeneratePublicToken(id: string): Promise<string> {
  const { data, error } = await supabase.rpc("regenerate_public_token", { p_project_id: id });
  if (error) throw error;
  return data as string;
}

// ── Delete a project, its stages/media rows (FK cascade), and their media files ──
export async function deleteProject(id: string): Promise<void> {
  const { data: stages, error: stagesErr } = await supabase
    .from("stages")
    .select("id")
    .eq("project_id", id);
  if (stagesErr) throw stagesErr;

  const stageIds = (stages ?? []).map((s) => s.id);
  if (stageIds.length) {
    const { data: media, error: mediaErr } = await supabase
      .from("media")
      .select("storage_path, cloudinary_public_id, cloudinary_resource_type")
      .in("stage_id", stageIds);
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
  }

  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw error;
}
