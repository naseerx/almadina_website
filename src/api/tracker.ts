import { supabase } from "@/lib/supabase";
import type { StageStatus, MediaItem } from "./types";

// Shape returned by the public get_project_by_token RPC (already camelCase).
export interface TrackerStage {
  id: string;
  order: number;
  name: string;
  status: StageStatus;
  media: MediaItem[];
}

export interface TrackerProject {
  name: string;
  clientName: string;
  address: string;
  type: string;
  status: string;
  startDate: string;
  stages: TrackerStage[];
}

/**
 * Public, anonymous read for the /track/:token page.
 * Returns null when the token is invalid, revoked, or the project isn't public.
 */
export async function getProjectByToken(token: string): Promise<TrackerProject | null> {
  const { data, error } = await supabase.rpc("get_project_by_token", { p_token: token });
  if (error) throw error;
  return (data as TrackerProject | null) ?? null;
}
