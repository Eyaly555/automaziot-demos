import { fetchDemoBySlug } from "@/lib/supabase";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function DemoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const demo = await fetchDemoBySlug(slug);

  if (!demo) return notFound();

  return (
    <iframe
      srcDoc={demo.html_content}
      style={{
        width: "100vw",
        height: "100vh",
        border: "none",
        position: "fixed",
        top: 0,
        left: 0,
      }}
      title={demo.title}
    />
  );
}
