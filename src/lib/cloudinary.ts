const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string | undefined;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string | undefined;

if (!cloudName || !uploadPreset) {
  throw new Error(
    "Missing Cloudinary env vars. Set VITE_CLOUDINARY_CLOUD_NAME and " +
      "VITE_CLOUDINARY_UPLOAD_PRESET in .env.local.",
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
  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", uploadPreset!);

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
