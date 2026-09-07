const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string | undefined;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string | undefined;

// Log loudly instead of throwing: this module is reachable from the app's
// single bundle (no route-level code splitting in App.tsx), so a throw here
// at import time would take the whole site down, not just stage-media
// uploads in the admin panel that actually depend on Cloudinary.
if (!cloudName || !uploadPreset) {
  console.error(
    "Missing Cloudinary env vars. Set VITE_CLOUDINARY_CLOUD_NAME and " +
      "VITE_CLOUDINARY_UPLOAD_PRESET in .env.local. Stage media uploads will " +
      "fail until this is fixed.",
  );
}

export type CloudinaryResourceType = "image" | "video";

export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
  resourceType: CloudinaryResourceType;
}

// ── Direct, unsigned upload from the browser (no API secret involved) ────────
export async function uploadToCloudinary(
  file: File,
  resourceType: CloudinaryResourceType,
): Promise<CloudinaryUploadResult> {
  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary is not configured (missing env vars).");
  }

  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", uploadPreset);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Cloudinary upload failed: ${body}`);
  }

  const data = await res.json();
  return { url: data.secure_url as string, publicId: data.public_id as string, resourceType };
}
