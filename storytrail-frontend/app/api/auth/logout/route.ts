import { supabaseServer } from "@/lib/supabase/server";

export async function POST() {
  const supabase = supabaseServer();
  await supabase.auth.signOut();
  return Response.json({ success: true });
}
