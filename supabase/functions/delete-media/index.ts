// Deletes Cloudinary assets on behalf of the admin app.
// Runs server-side because Cloudinary deletion must be signed with the API
// secret, which can never be shipped to the browser. Only callable with a
// valid Supabase session — verify_jwt stays enabled (the default) so this
// mirrors the same "authenticated admin" boundary as the Postgres RLS policies.

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface DeleteItem {
  publicId: string;
  resourceType: "image" | "video";
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: CORS_HEADERS });
  }

  try {
    const { items } = (await req.json()) as { items: DeleteItem[] };
    if (!Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ deleted: 0 }), {
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    const cloudName = Deno.env.get("CLOUDINARY_CLOUD_NAME");
    const apiKey = Deno.env.get("CLOUDINARY_API_KEY");
    const apiSecret = Deno.env.get("CLOUDINARY_API_SECRET");
    if (!cloudName || !apiKey || !apiSecret) {
      throw new Error("Cloudinary secrets are not configured for this function.");
    }
    const auth = "Basic " + btoa(`${apiKey}:${apiSecret}`);

    // Cloudinary's delete-resources endpoint is per resource_type, so group by it.
    const byType = new Map<string, string[]>();
    for (const item of items) {
      const list = byType.get(item.resourceType) ?? [];
      list.push(item.publicId);
      byType.set(item.resourceType, list);
    }

    for (const [resourceType, publicIds] of byType) {
      const params = new URLSearchParams();
      for (const id of publicIds) params.append("public_ids[]", id);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/resources/${resourceType}/upload?${params.toString()}`,
        { method: "DELETE", headers: { Authorization: auth } },
      );
      if (!res.ok) {
        const body = await res.text();
        throw new Error(`Cloudinary delete failed (${resourceType}): ${body}`);
      }
    }

    return new Response(JSON.stringify({ deleted: items.length }), {
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 400,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }
});
