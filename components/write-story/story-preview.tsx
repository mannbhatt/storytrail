"use client"

import { X } from "lucide-react"

interface StoryForm {
  coverImagePreview: string
  title: string
  subtitle: string
  content: string
  city: string
  state: string
  category: string
}

interface StoryPreviewProps {
  story: StoryForm
  onClose: () => void
}

export default function StoryPreview({ story, onClose }: StoryPreviewProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 md:p-0">
      <div className="bg-background rounded-xl max-h-[90vh] overflow-y-auto w-full md:max-w-2xl">
        <div className="sticky top-0 bg-background border-b border-border p-4 flex justify-between items-center">
          <h2 className="font-heading font-bold text-foreground">Story Preview</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 md:p-8">
          {/* Cover Image */}
          {story.coverImagePreview && (
            <img
              src={story.coverImagePreview || "/placeholder.svg"}
              alt={story.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          )}

          {/* Category Badge */}
          {story.category && (
            <span className="inline-block px-3 py-1 bg-accent/20 text-accent-foreground rounded-full text-xs font-semibold mb-4">
              {story.category}
            </span>
          )}

          {/* Title */}
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            {story.title || "Your Story Title"}
          </h1>

          {/* Location */}
          {story.city && (
            <p className="text-muted-foreground text-sm font-medium mb-6">
              {story.city}, {story.state}
            </p>
          )}

          {/* Excerpt */}
          {story.subtitle && (
            <p className="text-lg text-muted-foreground italic mb-6 pb-6 border-b border-border">{story.subtitle}</p>
          )}

          {/* Content */}
          <div className="prose prose-sm max-w-none">
            {story.content.split("\n").map((para, i) => (
              <p key={i} className="text-foreground leading-relaxed mb-4 whitespace-pre-wrap">
                {para}
              </p>
            ))}
          </div>

          {/* Author Section */}
          <div className="mt-12 pt-6 border-t border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white font-heading font-bold text-sm">
                ST
              </div>
              <div>
                <p className="font-heading font-semibold text-foreground text-sm">Story Contributor</p>
                <p className="text-xs text-muted-foreground">contributor@storytrail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
