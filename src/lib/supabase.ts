import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { db: { schema: "automaziot" } }
);

export type Demo = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  html_content: string;
  client_name: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};
