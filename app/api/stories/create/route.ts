// app/api/stories/create/route.ts
import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase/server"
import slugify from "slugify"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log("at backend stories/create", body)

    // ✅ FIXED FIELD NAMES
    const {
      title,
      subtitle,
      content,
      coverImage,
      categoryId,      // existing category id
      categoryOther,   // new category name
      locationId,      // existing location id
      cityOther,       // new city
      stateOther       // new state
    } = body

    /* ---------------- VALIDATION ---------------- */

    if (!title || !subtitle || !content) {
      return NextResponse.json(
        { error: "Title, subtitle, and content are required" },
        { status: 400 }
      )
    }

    if (!categoryId && !categoryOther) {
      return NextResponse.json(
        { error: "Category is required" },
        { status: 400 }
      )
    }

    if (!locationId && (!cityOther || !stateOther)) {
      return NextResponse.json(
        { error: "City and state are required" },
        { status: 400 }
      )
    }

    const supabase = supabaseServer()

    /* ---------------- USER ---------------- */

    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser()

    if (!user || userError) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    /* ---------------- CATEGORY ---------------- */

    let category_id: string

    if (categoryOther) {
      const { data, error } = await supabase
        .from("categories")
        .insert({ name: categoryOther })
        .select("id")
        .single()

      if (error) throw error
      category_id = data.id
    } else {
      category_id = categoryId
    }

    /* ---------------- LOCATION ---------------- */

    let location_id: string

    if (cityOther) {
      const { data, error } = await supabase
        .from("locations")
        .insert({
          city: cityOther,
          state: stateOther
        })
        .select("id")
        .single()

      if (error) throw error
      location_id = data.id
    } else {
      location_id = locationId
    }

    /* ---------------- STORY ---------------- */

    const slug = slugify(title, { lower: true, strict: true })

    const { error: storyError } = await supabase.from("stories").insert({
      user_id: user.id,
      title,
      slug,
      summary: subtitle,
      content,
      cover_image: coverImage || null,
      category_id,
      location_id,
      like_count: 0,
      view_count: 0,
      created_at: new Date(),
      updated_at: new Date()
    })

    if (storyError) throw storyError

    return NextResponse.json({ success: true }, { status: 201 })

  } catch (err) {
    console.error("Story create error:", err)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}
