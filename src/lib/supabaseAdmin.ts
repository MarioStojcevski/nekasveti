import "server-only";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Prefer the service-role key (bypasses RLS, never reaches the browser). Fall
// back to the anon key so the app still works before the service key is set.
const serviceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !serviceKey) {
  console.warn(
    "Supabase server credentials missing. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env"
  );
}

export const supabaseAdmin = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  serviceKey || "placeholder",
  { auth: { persistSession: false, autoRefreshToken: false } }
);
