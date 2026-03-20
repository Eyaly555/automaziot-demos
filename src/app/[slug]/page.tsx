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

  return (
    <div dangerouslySetInnerHTML={{ __html: demo.html_content }} />
  );
}
