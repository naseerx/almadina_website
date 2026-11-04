// Keeps the Supabase free-tier project awake. Supabase pauses a free project
// after 7 days without activity, and the public marketing pages never touch the
// database, so a quiet week was enough to take the admin panel and /track down.
// Vercel calls this once a day via the cron in vercel.json.
export async function GET(request) {
  // Vercel sends this header on cron calls when CRON_SECRET is set in the project.
  const secret = process.env.CRON_SECRET;
  if (secret && request.headers.get("authorization") !== `Bearer ${secret}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return new Response("Supabase env vars are missing", { status: 500 });
  }

  // A real database query through the public tracker RPC. The dummy token
  // matches no project, so it returns null and exposes nothing.
  const res = await fetch(`${url}/rest/v1/rpc/get_project_by_token`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ p_token: "keepalive" }),
  });

  return new Response(`Supabase responded ${res.status}`, { status: res.ok ? 200 : 502 });
}
