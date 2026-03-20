import { supabase, Demo } from "@/lib/supabase";
import Link from "next/link";

export const revalidate = 0;

export default async function Home() {
  const { data: demos } = await supabase
    .from("demos")
    .select("slug, title, description, client_name, created_at")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.logo}>Automaziot AI</h1>
        <p style={styles.tagline}>Live Demo Hub</p>
        <div style={styles.status}>
          <span style={styles.dot} />
          System Online
        </div>

        {demos && demos.length > 0 ? (
          <div style={styles.grid}>
            {demos.map((demo: Pick<Demo, "slug" | "title" | "description" | "client_name" | "created_at">) => (
              <Link key={demo.slug} href={`/${demo.slug}`} style={styles.card}>
                <h3 style={styles.cardTitle}>{demo.title}</h3>
                {demo.client_name && (
                  <span style={styles.client}>{demo.client_name}</span>
                )}
                {demo.description && (
                  <p style={styles.cardDesc}>{demo.description}</p>
                )}
                <span style={styles.date}>
                  {new Date(demo.created_at).toLocaleDateString("he-IL")}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <p style={styles.empty}>No demos yet. They will appear here once created.</p>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  body: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    background: "#0a0a0f",
    color: "#e0e0e0",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  container: {
    maxWidth: 700,
    width: "100%",
    textAlign: "center" as const,
  },
  logo: {
    fontSize: "2.5rem",
    fontWeight: 800,
    background: "linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: 0,
  },
  tagline: {
    color: "#888",
    fontSize: "1rem",
    marginBottom: 32,
  },
  status: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(99,102,241,0.1)",
    border: "1px solid rgba(99,102,241,0.3)",
    borderRadius: 50,
    padding: "8px 20px",
    fontSize: "0.9rem",
    marginBottom: 40,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#22c55e",
    display: "inline-block",
  },
  grid: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 12,
  },
  card: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: 20,
    textAlign: "right" as const,
    textDecoration: "none",
    color: "inherit",
    display: "block",
  },
  cardTitle: {
    color: "#fff",
    margin: "0 0 4px 0",
    fontSize: "1.1rem",
  },
  client: {
    color: "#8b5cf6",
    fontSize: "0.8rem",
  },
  cardDesc: {
    color: "#888",
    fontSize: "0.85rem",
    marginTop: 8,
  },
  date: {
    color: "#555",
    fontSize: "0.75rem",
    marginTop: 8,
    display: "block",
  },
  empty: {
    color: "#555",
    fontSize: "0.9rem",
  },
};
