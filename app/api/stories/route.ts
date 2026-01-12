import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase/server"

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const search = url.searchParams.get("search")?.trim()
    const categoryId = url.searchParams.get("categoryId")
    const locationId = url.searchParams.get("locationId")
    const limit = Number(url.searchParams.get("limit"))

    const supabase = supabaseServer()

    let query = supabase
      .from("stories")
      .select(
        `
        id,
        title,
        slug,
        summary,
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

        users:users!stories_user_id_fkey (
          user_name,
          avatar_url
        )
      `
      )
      .order("created_at", { ascending: false })

    if (search) {
      query = query.or(`title.ilike.%${search}%,summary.ilike.%${search}%`)
    }

    if (categoryId && categoryId !== "All") {
      query = query.eq("category_id", categoryId)
    }

    if (locationId && locationId !== "All") {
      query = query.eq("location_id", locationId)
    }

    if (limit) {
      query = query.limit(limit)
    }

    const { data, error } = await query
    
    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ stories: [] }, { status: 200 })
    }

    return NextResponse.json(
      { stories: data ?? [] },
      { status: 200 }
    )

  } catch (err) {
    console.error("Stories fetch error:", err)
    return NextResponse.json(
      { stories: [] },
      { status: 200 }
    )
  }
}
