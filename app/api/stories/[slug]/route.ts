import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase/server"

export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    // ✅ FIX: await params
    const { slug } = await context.params

    if (!slug) {
      return NextResponse.json(
        { error: "Slug is required" },
        { status: 400 }
      )
    }

    const supabase = supabaseServer()

    const { data, error } = await supabase
      .from("stories")
      .select(`
        id,
        slug,
        title,
        summary,
        content,
        cover_image,
        created_at,
       

        categories (
          id,
          name
        ), 
        
        locations (
          id,
          city,
          state
        ),

        users:user_id (
          user_name,
          avatar_url
        )
      `)
      .eq("slug", slug)
      .single()

    if (error || !data) {
      return NextResponse.json(
        { error: "Story not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(data, { status: 200 })

  } catch (err) {
    console.error("Fetch story error:", err)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}
