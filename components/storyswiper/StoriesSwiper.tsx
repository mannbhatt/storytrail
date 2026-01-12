"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Heart, MessageCircle, Eye, MapPin, X, Check } from "lucide-react"
import Link from "next/link"
import { Skeleton } from "@/components/ui/Skeleton"

interface Story {
  id: number
  title: string
  summary: string
  slug: string
  cover_image: string
  like_count: number
  comment_count: number
  view_count: number
  categories: {
    name: string
  } | null
  locations: {
    city: string
    state: string
  } | null
  users: {
    user_name: string
    avatar_url: string | null
  } | null
}

interface StoryCardProps {
  story?: Story
  index: number
  totalCards: number
  onSwipe: (direction: "left" | "right") => void
  isTop: boolean
  loading?: boolean
}

const SWIPE_THRESHOLD = 120

function StoryCard({ story, index, totalCards, onSwipe, isTop, loading = false }: StoryCardProps) {
  const x = useMotionValue(0)
  const opacity = useTransform(x, [-300, 0, 300], [0, 1, 0])
  const likeOpacity = useTransform(x, [0, SWIPE_THRESHOLD], [0, 1])
  const skipOpacity = useTransform(x, [-SWIPE_THRESHOLD, 0], [1, 0])
  const cardScale = index === 0 ? 1 : index === 1 ? 0.95 : 0.9
  const cardYOffset = index === 0 ? 0 : index === 1 ? 8 : 16
  const cardZIndex = totalCards - index

  const handleDragEnd = useCallback(() => {
    const xValue = x.get()
    const absX = Math.abs(xValue)

    if (absX > SWIPE_THRESHOLD) {
      onSwipe(xValue > 0 ? "right" : "left")
    }
  }, [onSwipe, x])

  if (loading || !story) {
    return (
      <motion.div
        className="absolute w-full h-full rounded-2xl overflow-hidden shadow-lg"
        style={{
          scale: cardScale,
          y: cardYOffset,
          zIndex: cardZIndex,
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: cardScale, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="relative w-full h-full">
          <Skeleton className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
            
            <Skeleton className="mb-2 h-8 w-3/4" />
            <Skeleton className="mb-4 h-4 w-full" />
            <Skeleton className="mb-2 h-4 w-5/6" />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-4 w-8" />
              </div>
              
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="absolute w-full h-full rounded-2xl overflow-hidden shadow-lg"
      style={{
        x,
        opacity,
        scale: cardScale,
        y: cardYOffset,
        zIndex: cardZIndex,
        cursor: isTop ? "grab" : "default",
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: cardScale, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="relative w-full h-full">
        <Link href={`/stories/${story.slug}`}>
        <Image
          src={story.cover_image || "https://cdn.pixabay.com/photo/2022/05/28/21/44/carpathians-7228042_1280.jpg"}
          alt={story.title}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            {story.locations && (
              <span className="flex items-center text-sm">
                <MapPin className="w-4 h-4 mr-1" />
                {story.locations.city}, {story.locations.state}
              </span>
            )}
            {story.categories && (
              <span className="text-sm bg-white/20 px-2 py-0.5 rounded-full">
                {story.categories.name}
              </span>
            )}

          </div>
          
          <h3 className="text-2xl font-bold mb-2 line-clamp-2">{story.title}</h3>
          <p className="text-sm text-gray-200 line-clamp-2 mb-4">{story.summary}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span className="text-xs">{story.like_count || 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span className="text-xs">{story.comment_count || 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span className="text-xs">{story.view_count || 0}</span>
              </div>
            </div>
            
            {story.users && (
              <div className="flex items-center gap-2">
                <span className="text-sm">{story.users.user_name}</span>
                <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
                  {story.users.avatar_url ? (
                    <Image
                      src={story.users.avatar_url}
                      alt={story.users.user_name}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-400 flex items-center justify-center text-xs">
                      {story.users.user_name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {isTop && (
          <>
            <motion.div
              className="absolute top-1/2 right-8 -translate-y-1/2"
              style={{ opacity: likeOpacity }}
            >
              <Check className="w-16 h-16 text-green-500" />
            </motion.div>
            <motion.div
              className="absolute top-1/2 left-8 -translate-y-1/2"
              style={{ opacity: skipOpacity }}
            >
              <X className="w-16 h-16 text-red-500" />
            </motion.div>
          </>
        )}
      </Link></div>
    </motion.div>
  )
}

export default function StoriesSwiper() {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/stories')
        if (!response.ok) {
          throw new Error('Failed to fetch stories')
        }
        const data = await response.json()
        setStories(data.stories || [])
      } catch (err) {
        console.error('Error fetching stories:', err)
        setError('Failed to load stories. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchStories()
  }, [])

  const handleSwipe = useCallback(async (direction: "left" | "right", storyId: number) => {
    try {
      // Remove the swiped story from the stack
      setStories(prev => prev.filter(story => story.id !== storyId))
      
      // Here you can add logic to handle swipe action (like/skip)
      // For example, you might want to send an API call to update story's like count
      if (direction === "right") {
        // Like action
        await fetch(`/api/stories/${storyId}/like`, { method: 'POST' })
      }
    } catch (err) {
      console.error('Error handling swipe:', err)
    }
  }, [])

  if (loading) {
    return (
      <div className="h-screen relative overflow-hidden bg-gray-100">
        <div className="max-w-md mx-auto h-full flex flex-col">
          <div className="p-4">
            <Skeleton className="mb-2 h-8 w-32 mx-auto" />
            <Skeleton className="h-4 w-48 mx-auto" />
          </div>
          
          <div className="flex-1 relative">
            {[0, 1, 2].map((index) => (
              <StoryCard
                key={index}
                index={index}
                totalCards={3}
                onSwipe={() => {}}
                isTop={index === 0}
                loading={true}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    )
  }

  if (stories.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center p-4">
        <div className="text-2xl font-bold mb-2">No more stories</div>
        <p className="text-gray-600 mb-6">Check back later for new travel stories!</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
        >
          Refresh
        </button>
      </div>
    )
  }

  return (
    <div className="h-screen relative overflow-hidden bg-gray-100">
      <div className="max-w-md mx-auto h-full flex flex-col">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-center">Discover Stories</h1>
          <p className="text-center text-gray-600">Swipe right to like, left to skip</p>
        </div>
        
        <div className="flex-1 relative">
          <AnimatePresence>
            {stories.slice(0, 3).map((story, index) => (
              <StoryCard
                key={story.id}
                story={story}
                index={index}
                totalCards={Math.min(3, stories.length)}
                onSwipe={(direction) => handleSwipe(direction, story.id)}
                isTop={index === 0}
              />
            ))}
          </AnimatePresence>
          
          {stories.length > 0 && stories.length <= 3 && (
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <p className="text-sm text-gray-500">
                {stories.length === 1 ? 'Last story!' : `${stories.length - 1} more`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}