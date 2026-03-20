import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim().replace(/\s+/g, "");
const SUPABASE_KEY = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "").trim().replace(/\s+/g, "");

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: { schema: "automaziot" },
});

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

// Direct REST fetch as fallback — proven to work
export async function fetchDemos(): Promise<Demo[]> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/demos?select=slug,title,description,client_name,created_at&is_active=eq.true&order=created_at.desc`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Accept-Profile": "automaziot",
      },
      cache: "no-store",
    }
  );
  if (!res.ok) return [];
  return res.json();
}

export async function fetchDemoBySlug(slug: string): Promise<Demo | null> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/demos?select=*&slug=eq.${encodeURIComponent(slug)}&is_active=eq.true&limit=1`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Accept-Profile": "automaziot",
        Accept: "application/vnd.pgrst.object+json",
      },
      cache: "no-store",
    }
  );
  if (!res.ok) return null;
  return res.json();
}
