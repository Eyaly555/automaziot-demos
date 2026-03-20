import { supabase, Demo } from "@/lib/supabase";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function DemoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: demo } = await supabase
    .from("demos")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single<Demo>();

  if (!demo) return notFound();

  // Demo html_content is a full HTML page, render it in an iframe to isolate styles
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
