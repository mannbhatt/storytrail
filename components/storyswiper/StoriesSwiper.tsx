"use client"

import { useState, useCallback } from "react"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import Image from "next/image"
import {
  Heart,
  MessageCircle,
  Eye,
  MapPin,
  X,
  Check,
} from "lucide-react"

// Mock data structure matching Supabase schema
interface MockStory {
  id: number
  title: string
  summary: string
  cover_image: string
  like_count: number
  comment_count: number
  view_count: number
  category: {
    name: string
  }
  location: {
    city: string
    state: string
  }
  author: {
    id: string
    username: string
    avatar_url: string | null
  }
}

const mockStories: MockStory[] = [
  {
    id: 1,
    title: "A Journey Through the Himalayas",
    summary:
      "Discover the breathtaking beauty of snow-capped peaks and serene valleys that will leave you speechless with their majestic grandeur.",
    cover_image:
      "https://cdn.pixabay.com/photo/2014/08/15/18/09/gandria-418953_960_720.jpg",
    like_count: 245,
    comment_count: 32,
    view_count: 1234,
    category: {
      name: "Travel",
    },
    location: {
      city: "Manali",
      state: "Himachal Pradesh",
    },
    author: {
      id: "1",
      username: "traveler_raj",
      avatar_url:
        "https://cdn.pixabay.com/photo/2017/08/04/11/49/person-2579938_960_720.jpg",
    },
  },
  {
    id: 2,
    title: "Island Hopping in Andaman",
    summary:
      "Crystal clear waters, pristine beaches, and unforgettable sunsets make this the perfect tropical getaway for adventure seekers.",
    cover_image:
      "https://cdn.pixabay.com/photo/2013/09/27/17/54/church-187468_1280.jpg",
    like_count: 189,
    comment_count: 28,
    view_count: 987,
    category: {
      name: "Adventure",
    },
    location: {
      city: "Port Blair",
      state: "Andaman and Nicobar",
    },
    author: {
      id: "2",
      username: "ocean_lover",
      avatar_url:
        "https://cdn.pixabay.com/photo/2017/08/04/11/49/person-2579938_960_720.jpg",
    },
  },
  {
    id: 3,
    title: "Rajasthan Diaries: Tales from the Golden Desert",
    summary:
      "Experience the magic of desert life with camel safaris, ancient forts, and vibrant culture that tells stories of a bygone era.",
    cover_image:
      "https://cdn.pixabay.com/photo/2015/11/05/15/18/buddha-1024347_960_720.jpg",
    like_count: 312,
    comment_count: 45,
    view_count: 1567,
    category: {
      name: "Culture",
    },
    location: {
      city: "Jaisalmer",
      state: "Rajasthan",
    },
    author: {
      id: "3",
      username: "desert_wanderer",
      avatar_url:
        "https://cdn.pixabay.com/photo/2017/08/04/11/49/person-2579938_960_720.jpg",
    },
  },
  {
    id: 4,
    title: "Kerala Backwaters: A Peaceful Journey",
    summary:
      "Cruise through serene backwaters, lush greenery, and traditional villages on a houseboat that offers the ultimate relaxation experience.",
    cover_image:
      "https://cdn.pixabay.com/photo/2017/03/30/04/14/house-2187170_1280.jpg",
    like_count: 278,
    comment_count: 38,
    view_count: 1432,
    category: {
      name: "Nature",
    },
    location: {
      city: "Alleppey",
      state: "Kerala",
    },
    author: {
      id: "4",
      username: "peace_seeker",
      avatar_url:
        "https://cdn.pixabay.com/photo/2017/08/04/11/49/person-2579938_960_720.jpg",
    },
  },
  {
    id: 5,
    title: "Spiritual Awakening in Varanasi",
    summary:
      "Witness ancient rituals, spiritual ceremonies, and the timeless beauty of the holy city that has captivated souls for centuries.",
    cover_image:
      "https://cdn.pixabay.com/photo/2015/11/05/15/18/buddha-1024347_960_720.jpg",
    like_count: 421,
    comment_count: 67,
    view_count: 2123,
    category: {
      name: "Spiritual",
    },
    location: {
      city: "Varanasi",
      state: "Uttar Pradesh",
    },
    author: {
      id: "5",
      username: "spiritual_guide",
      avatar_url:
        "https://cdn.pixabay.com/photo/2017/08/04/11/49/person-2579938_960_720.jpg",
    },
  },
]

interface StoryCardProps {
  story: MockStory
  index: number
  totalCards: number
  onSwipe: (direction: "left" | "right") => void
  isTop: boolean
}

// Swipe threshold for horizontal swipes
const SWIPE_THRESHOLD = 120

function StoryCard({
  story,
  index,
  totalCards,
  onSwipe,
  isTop,
}: StoryCardProps) {
  const x = useMotionValue(0)

  // Opacity fade on swipe
  const opacity = useTransform(x, [-300, 0, 300], [0, 1, 0])

  // Swipe indicator opacities
  const likeOpacity = useTransform(x, [0, SWIPE_THRESHOLD], [0, 1])
  const skipOpacity = useTransform(x, [-SWIPE_THRESHOLD, 0], [1, 0])

  const cardScale = index === 0 ? 1 : index === 1 ? 0.95 : 0.9
  const cardYOffset = index === 0 ? 0 : index === 1 ? 8 : 16
  const cardZIndex = totalCards - index

  const handleDragEnd = () => {
    const xValue = x.get()
    const absX = Math.abs(xValue)

    // Vibration feedback (if supported)
    const vibrate = (pattern: number | number[]) => {
      if ("vibrate" in navigator) {
        navigator.vibrate(pattern)
      }
    }

    if (absX > SWIPE_THRESHOLD) {
      // Horizontal swipe detected
      const direction = xValue > 0 ? "right" : "left"
      vibrate(50)
      onSwipe(direction)
      // Animate card off screen left or right
      animate(x, xValue > 0 ? 1000 : -1000, { duration: 0.3 })
    } else {
      // No swipe threshold met - reset to center
      animate(x, 0, { type: "spring", stiffness: 300, damping: 30 })
    }
  }

  const dragConstraints = isTop
    ? {
        left: -1000,
        right: 1000,
      }
    : false

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        zIndex: cardZIndex,
        x: index === 0 ? x : 0,
        y: cardYOffset,
        opacity: index === 0 ? opacity : 1,
        scale: cardScale,
      }}
      drag={isTop ? "x" : false}
      dragConstraints={dragConstraints}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      <div className="relative h-[80vh] max-h-[600px] w-full max-w-sm  bg-white shadow-2xl overflow-hidden">
        {/* Cover Image */}
        <div className="relative h-full w-full">
          <Image
            src={story.cover_image}
            alt={story.title}
            fill
            className="object-cover"
            priority={index === 0}
          />

          {/* Dark Gradient Overlay at Bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white">
              {story.category.name}
            </span>
          </div>

          {/* Swipe Indicators */}
          {isTop && (
            <>
              {/* Like indicator (swipe right) */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ opacity: likeOpacity }}
              >
                <div className="rounded-full bg-green-500/80 p-4 backdrop-blur-sm">
                  <Heart className="h-12 w-12 text-white fill-white" />
                </div>
              </motion.div>
              {/* Skip indicator (swipe left) */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ opacity: skipOpacity }}
              >
                <div className="rounded-full bg-red-500/80 p-4 backdrop-blur-sm">
                  <X className="h-12 w-12 text-white" />
                </div>
              </motion.div>
            </>
          )}

          {/* Content Section at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            {/* Title */}
            <h2 className="mb-2 text-2xl font-bold leading-tight">{story.title}</h2>

            {/* Summary (max 2 lines) */}
            <p className="mb-4 line-clamp-2 text-sm text-gray-200">
              {story.summary}
            </p>

            {/* Location */}
            <div className="mb-4 flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4" />
              <span>
                {story.location.city}, {story.location.state}
              </span>
            </div>

            {/* Author Info */}
            <div className="mb-4 flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white">
                <Image
                  src={story.author.avatar_url || "/placeholder.svg"}
                  alt={story.author.username}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-semibold">{story.author.username}</span>
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                <span className="text-sm font-medium">{story.like_count}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                <span className="text-sm font-medium">{story.comment_count}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                <span className="text-sm font-medium">{story.view_count}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function StoriesSwiper() {
  const [stories, setStories] = useState(mockStories)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleSwipe = useCallback(
    async (direction: "left" | "right") => {
      const currentStory = stories[currentIndex]
      if (!currentStory) return

      if (direction === "right") {
        // Like story - optimistic update
        setStories((prev) =>
          prev.map((story, idx) =>
            idx === currentIndex
              ? { ...story, like_count: story.like_count + 1 }
              : story
          )
        )

        // TODO: Insert into story_likes table
        // await supabase.from('story_likes').insert({ story_id: currentStory.id, user_id: userId })
        // TODO: Trigger USER_ACTIVITY entry with action = "like"
      }

      // Move to next card
      if (currentIndex < stories.length - 1) {
        setCurrentIndex((prev) => prev + 1)
      }
    },
    [stories, currentIndex]
  )

  const visibleCards = stories.slice(currentIndex, currentIndex + 3)
  const hasMoreCards = currentIndex < stories.length
  //const canUndo = swipeHistory.length > 0 && currentIndex > 0

  if (!hasMoreCards) {
    return (
      <div className="flex h-[80vh] items-center justify-center lg:hidden">
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-700">
            You&apos;ve seen all stories!
          </p>
          <p className="mt-2 text-gray-500">Check back later for more stories.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="lg:hidden">
      <div className="relative flex h-[80vh] max-h-[600px] items-center justify-center px-4 overflow-hidden">
        {visibleCards.map((story, index) => (
          <StoryCard
            key={`${story.id}-${currentIndex}-${index}`}
            story={story}
            index={index}
            totalCards={visibleCards.length}
            onSwipe={handleSwipe}
            isTop={index === 0}
          />
        ))}
      </div>
    </div>
  )
}

