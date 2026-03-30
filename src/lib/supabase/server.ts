import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/types";

function getSupabaseUrl() {
  const value =
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!value) throw new Error("Supabase URL is not configured.");
  return value;
}

function getSupabaseServerKey() {
  const value =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;
  if (!value) throw new Error("Supabase server key is not configured.");
  return value;
}

// Module-level singleton — one client for the lifetime of the server process
// This is critical for Vercel serverless to avoid connection churn
let _client: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabaseAdminClient() {
  if (_client) return _client;
  _client = createClient<Database>(getSupabaseUrl(), getSupabaseServerKey(), {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    db: {
      // Use connection pooling for serverless environments
      schema: "public",
    },
  });
  return _client;
}

// Reset client (useful for testing or error recovery)
export function resetSupabaseClient() {
  _client = null;
}
