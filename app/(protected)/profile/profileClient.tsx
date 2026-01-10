"use client"

import Image from "next/image"
import StoryCard from "@/components/landingpage/StoryCard"
import { supabaseBrowser } from "@/lib/supabase/client"
import { User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { useState } from "react"

// In profileClient.tsx
interface Story {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  city: string;
  image: string;
  user: {
    name: string;
    avatar: string | null;
  };
}

interface Props {
  user: User
  stories: Story[]
}

export default function UserProfile({ user, stories }: Props) {
  console.log("stories",stories)
  const router = useRouter()
  const [signingOut, setSigningOut] = useState(false)

  const name =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    "StoryTrail User"

  const username =
    user.user_metadata?.username ||
    name.toLowerCase().replace(/\s+/g, "_")

  const avatar =
    user.user_metadata?.avatar_url || "/placeholder.svg"

  const email = user.email ?? ""

  const handleLogout = async () => {
    try {
      setSigningOut(true)
      const supabase = supabaseBrowser()
      await supabase.auth.signOut()
      router.push("/signup")
      router.refresh()
    } finally {
      setSigningOut(false)
    }
  }

  const handleEdit = (storyId: number) => {
    // You can open a modal or redirect to an edit page
    console.log("Edit story:", storyId)
  }

  const handleDelete = (storyId: number) => {
    // You can open a confirmation dialog here
    console.log("Delete story:", storyId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-neutral-100 via-neutral-50 to-neutral-200">
      {/* ============== PROFILE HEADER ============== */}
      <section className="relative bg-primaryDark h-[340px] lg:h-[450px] flex items-center justify-center overflow-hidden shadow-2xl">
        {/* Decorative background effect & background image */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Background image */}
          <img
            src="https://cdn.pixabay.com/photo/2016/11/29/09/36/leaves-1868742_1280.jpg"
            alt="Profile Cover"
            className="w-full h-full object-cover object-center "
            style={{
              pointerEvents: 'none',
              zIndex: 0,
              position: 'absolute',
              inset: 0,
              height: '100%',
              width: '100%',
              userSelect: 'none',
            }}
            draggable={false}
          />
          {/* Gradient or blur overlays for decoration */}
         
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-3xl pt-16 md:pt-0 px-4">
          {/* Avatar */}
          <div className="relative w-28 h-28 md:w-36 md:h-36 border-4 border-accent shadow-2xl rounded-full overflow-hidden bg-white">
            <Image
              src={avatar}
              alt={name}
              fill
              className="object-cover rounded-full"
              sizes="(max-width: 768px) 112px, 144px"
            />
          </div>
          {/* User Info */}
          <div className="mt-6 text-center">
            <h1 className="font-heading text-2xl lg:text-4xl text-white font-bold mb-1 drop-shadow">
              @{username}
            </h1>
            <p className="font-sans text-sm lg:text-base text-white/80 mb-2">{email}</p>
            
          </div>
        </div>
      </section>

      {/* ============== USER STORIES ============== */}
      <main className="max-w-7xl mx-auto px-4 py-10 sm:py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-primaryDark tracking-tight">
           Stories
          </h2>
          <button
            onClick={handleLogout}
            disabled={signingOut}
            className="inline-block px-6 py-2 rounded-xl bg-primaryDark text-white font-semibold shadow hover:bg-accent hover:text-textDark transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm"
          >
            {signingOut ? "Logging out..." : "Log out"}
          </button>
        </div>

        {stories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white/60 rounded-2xl shadow-inner">
            <Image
              src="/empty-state.svg"
              alt="No stories yet"
              width={120}
              height={120}
              className="mb-4 opacity-60"
            />
            <p className="text-gray-500 text-lg font-medium mb-1 text-center">
              You haven’t shared any stories yet.
            </p>
            <span className="text-sm text-gray-400 text-center">
              Start sharing your adventures with the world!
            </span>
          </div>
        ) : (
          <>
            {/* Desktop Grid */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-8">
              {stories.map((story) => (
                <StoryCard
                  key={story.id}
                  story={{
                    id: story.id,
                    slug:story.slug,
                    image: story.image,
                    title: story.title,
                    city: story.city,
                    subtitle: story.subtitle,
                    author: {
                      name,
                      avatar,
                    },
                  }}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
            {/* Tablet/Mobile Responsive Cards */}
            <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6">
              {stories.map((story) => (
                <StoryCard
                  key={story.id}
                  story={{
                    id: story.id,
                    slug:story.slug,
                    image: story.image,
                    title: story.title,
                    city: story.city,
                    subtitle: story.subtitle,
                    author: {
                      name,
                      avatar,
                    },
                  }}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
