"use client"
import Image from "next/image"
import { Share2, Edit, Trash2 } from "lucide-react"

interface Story {
  id: number
  image: string
  title: string
  city: string
  subtitle: string
  author: {
    name: string
    avatar: string
  }
}

interface StoryCardProps {
  story: Story
  onEdit?: (storyId: number) => void
  onDelete?: (storyId: number) => void
}

export default function StoryCard({ story, onEdit, onDelete }: StoryCardProps) {
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    onEdit?.(story.id)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete?.(story.id)
  }

  const showActions = onEdit || onDelete
  return (
    <>
      {/* Desktop Card Layout - Hidden on mobile */}
      <div className="hidden lg:block group overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        {/* Story Image */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={story.image || "/placeholder.svg"}
            alt={story.title}
            fill
            className="object-cover "
          />
        </div>

        {/* Story Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-heading line-clamp-2 text-lg font-semibold text-textDark">{story.title}</h3>

          {/* City */}
          <p className="mt-1 text-xs text-gray-500">{story.city}</p>

          {/* Subtitle */}
          <p className="mt-2 line-clamp-3 text-sm text-gray-600">{story.subtitle}</p>

          {/* Author Row */}
          <div className={`mt-4 ${showActions ? "flex items-center justify-between pt-3 border-t border-slate-100" : "flex items-center gap-2"}`}>
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full">
                <Image
                  src={story.author.avatar || "/placeholder.svg"}
                  alt={story.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-sm font-medium text-gray-700">{story.author.name}</span>
            </div>
            {showActions && (
              <div className="flex items-center gap-1">
                {onEdit && (
                  <button
                    onClick={handleEdit}
                    className="p-2 hover:bg-blue-50 rounded-full transition-colors group/edit"
                    title="Edit story"
                  >
                    <Edit className="w-4 h-4 text-slate-500 group-hover/edit:text-primary" />
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={handleDelete}
                    className="p-2 hover:bg-red-50 rounded-full transition-colors group/delete"
                    title="Delete story"
                  >
                    <Trash2 className="w-4 h-4 text-slate-500 group-hover/delete:text-red-600" />
                  </button>
                )}
                <button className="p-2 hover:bg-slate-100 rounded-full transition-colors" title="Share story">
                  <Share2 className="w-4 h-4 text-slate-500" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Card Layout - Visible only on mobile */}
      <div className="flex gap-3 overflow-hidden rounded-lg bg-white p-3 shadow-md lg:hidden">
        {/* Small Image on Left */}
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
          <Image src={story.image || "/placeholder.svg"} alt={story.title} fill className="object-cover" />
        </div>

        {/* Content on Right */}
        <div className="flex flex-1 flex-col justify-between">
          {/* Title */}
          <h3 className="font-heading line-clamp-2 text-sm font-bold text-textDark">{story.title}</h3>

          {/* Subtitle */}
          <p className="hidden lg:block line-clamp-2 text-xs text-gray-600">{story.subtitle}</p>

          {/* City */}
          <p className="text-xs text-gray-500">{story.city}</p>

          {/* Author Row + Actions (side by side if showActions) */}
          <div className={` mt-1 flex items-center gap-2${showActions ? " justify-between" : ""}`}>
            <div className="flex items-center gap-2">
              <div className="relative h-6 w-6 overflow-hidden rounded-full">
                <Image
                  src={story.author.avatar || "/placeholder.svg"}
                  alt={story.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xs font-medium text-gray-600">{story.author.name}</span>
            </div>
            {showActions && (
              <div className="flex items-center gap-1">
                {onEdit && (
                  <button
                    onClick={handleEdit}
                    className="p-2 hover:bg-blue-50 rounded-full transition-colors active:scale-95"
                    title="Edit story"
                  >
                    <Edit className="w-4 h-4 text-slate-500" />
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={handleDelete}
                    className="p-2 hover:bg-red-50 rounded-full transition-colors active:scale-95"
                    title="Delete story"
                  >
                    <Trash2 className="w-4 h-4 text-slate-500" />
                  </button>
                )}
                <button
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors active:scale-95"
                  title="Share story"
                >
                  <Share2 className="w-4 h-4 text-slate-500" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

