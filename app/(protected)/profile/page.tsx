// app/(protected)/profile/page.tsx
import { supabaseServer } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import UserProfile from "./profileClient"


interface Story {
  id: number
  title: string
  slug: string
  summary: string
  cover_image: string | null
  created_at: string
  categories: {
    id: number
    name: string
  } | null
  locations: {
    id: number
    city: string
    state: string
  }[] | null
  users: {
    user_name: string | null
    avatar_url: string | null
  }[] | null
}

export default async function ProfilePage() {
  const supabase = supabaseServer()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect("/signup")
  }

  try {
    // Get the stories directly from Supabase
    const { data: stories, error } = await supabase
      .from("stories")
      .select(`
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
        users:user_id (
          user_name,
          avatar_url
        )
      `)
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    // Transform the data
    const formattedStories = (stories || []).map((story) => ({
      id: story.id,
      slug: story.slug,
      title: story.title,
      subtitle: story.summary,
      city: story.locations && story.locations.length > 0 
        ? `${story.locations[0]?.city}, ${story.locations[0]?.state}` 
        : 'Unknown location',
      image: story.cover_image || '/placeholder.svg',
      user: {
        name: story.users && story.users.length > 0 
          ? story.users[0]?.user_name || 'Anonymous'
          : 'Anonymous',
        avatar: story.users && story.users.length > 0 
          ? story.users[0]?.avatar_url || null
          : null
      }
    }));
    return <UserProfile user={session.user} stories={formattedStories} />

  } catch (error) {
    console.error('Error in ProfilePage:', error)
    return (
      <div className="p-4 text-center text-red-500">
        Error in loading stories Retry
      </div>
    )
  }
}