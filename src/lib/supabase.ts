import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Log loudly instead of throwing: this module is imported by the whole app
// (via AuthProvider in App.tsx), including the public marketing pages that
// have nothing to do with Supabase — a throw here at import time would take
// the entire site down, not just the admin/tracker screens that need auth.
if (!url || !anonKey) {
  console.error(
    "Missing Supabase env vars. Copy .env.example to .env.local and set " +
      "VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY. Admin login and the " +
      "client tracker will not work until this is fixed.",
  );
}

export const supabase = createClient(
  url || "https://placeholder.supabase.co",
  anonKey || "placeholder-anon-key",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  },
);
