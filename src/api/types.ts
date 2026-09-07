// Shared domain types (camelCase) used across the admin screens.
// The API layer maps these to/from the snake_case Postgres columns.

export type ProjectStatus = "active" | "completed";
export type StageStatus = "not_started" | "in_progress" | "completed";
export type MediaType = "image" | "video_file" | "video_link";

export interface Project {
  id: string;
  name: string;
  clientName: string;
  address: string;
  type: string;
  status: ProjectStatus;
  isPublic: boolean;
  publicToken: string;
  startDate: string;
}

export interface ProjectSummary extends Project {
  stagesTotal: number;
  stagesCompleted: number;
}

export interface Stage {
  id: string;
  order: number;
  name: string;
  status: StageStatus;
  mediaCount: number;
}

export interface MediaItem {
  id: string;
  type: MediaType;
  url: string;
  caption: string;
  uploadedAt: string;
}
