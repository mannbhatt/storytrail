// app/api/locations/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = supabaseServer();

    const { data: locations, error } = await supabase
      .from("locations")
      .select("id, city, state")
      .order("city", { ascending: true });

    if (error) throw error;

    return NextResponse.json({ locations });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch locations" }, { status: 500 });
  }
}
