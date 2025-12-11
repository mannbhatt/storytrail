import { supabaseServer } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = supabaseServer();
    const { data } = await supabase.auth.getSession();
    console.log("userdata in me/route",data)
    return Response.json({
      user: data.session?.user ?? null,
    });
  } catch (err) {
    console.error("ME ROUTE ERROR:", err);
    return Response.json({ user: null }, { status: 200 });
  }
}
