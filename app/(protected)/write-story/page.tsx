"use client"

import type React from "react"

import { useState } from "react"
import { Upload, ChevronDown, AlertCircle, CheckCircle } from "lucide-react"
import StoryPreview from "@/components/write-story/story-privew"

const CATEGORIES = ["Travel", "Culture", "History", "Legends", "Food"]
const INDIAN_CITIES = [
  { id: 1, name: "Jaipur", state: "Rajasthan" },
  { id: 2, name: "Varanasi", state: "Uttar Pradesh" },
  { id: 3, name: "Goa", state: "Goa" },
  { id: 4, name: "Manali", state: "Himachal Pradesh" },
  { id: 5, name: "Munnar", state: "Kerala" },
  { id: 6, name: "Udaipur", state: "Rajasthan" },
  { id: 7, name: "Darjeeling", state: "West Bengal" },
  { id: 8, name: "Hampi", state: "Karnataka" },
]

interface StoryForm {
  coverImage: File | null
  coverImagePreview: string
  title: string
  excerpt: string
  content: string
  city: string
  state: string
  category: string
}

interface Notification {
  type: "success" | "error" | "info"
  message: string
}

export default function WriteStoryPage() {
  const [form, setForm] = useState<StoryForm>({
    coverImage: null,
    coverImagePreview: "",
    title: "",
    excerpt: "",
    content: "",
    city: "",
    state: "",
    category: "",
  })

  const [showPreview, setShowPreview] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notification, setNotification] = useState<Notification | null>(null)
  const [selectedAction, setSelectedAction] = useState<"draft" | "publish" | null>(null)

  const characterCount = form.excerpt.length
  const maxExcerpt = 200

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const preview = event.target?.result as string
        setForm({
          ...form,
          coverImage: file,
          coverImagePreview: preview,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const preview = event.target?.result as string
        setForm({
          ...form,
          coverImage: file,
          coverImagePreview: preview,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = (): boolean => {
    if (!form.coverImage) {
      showNotification("error", "Please upload a cover image")
      return false
    }
    if (!form.title.trim()) {
      showNotification("error", "Please enter a story title")
      return false
    }
    if (!form.content.trim()) {
      showNotification("error", "Please write your story")
      return false
    }
    if (!form.city) {
      showNotification("error", "Please select a city or village")
      return false
    }
    if (!form.category) {
      showNotification("error", "Please select a category")
      return false
    }
    return true
  }

  const showNotification = (type: "success" | "error" | "info", message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 4000)
  }

  const handleSubmit = async (action: "draft" | "publish") => {
    if (!validateForm()) return

    setSelectedAction(action)
    setIsSubmitting(true)

    try {
      // TODO: Replace with actual API call to Supabase
      // const formData = new FormData()
      // formData.append('coverImage', form.coverImage)
      // formData.append('title', form.title)
      // formData.append('excerpt', form.excerpt)
      // formData.append('content', form.content)
      // formData.append('city', form.city)
      // formData.append('category', form.category)
      // formData.append('status', action)
      // const response = await fetch('/api/stories', { method: 'POST', body: formData })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      showNotification(
        "success",
        action === "draft"
          ? "Story saved as draft! You can edit it later."
          : "Story published successfully! Check your profile to see it live.",
      )

      // Reset form after successful publish
      if (action === "publish") {
        setForm({
          coverImage: null,
          coverImagePreview: "",
          title: "",
          excerpt: "",
          content: "",
          city: "",
          state: "",
          category: "",
        })
      }
    } catch (error) {
      showNotification("error", "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
      setSelectedAction(null)
    }
  }

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = INDIAN_CITIES.find((c) => c.name === e.target.value)
    if (selectedCity) {
      setForm({
        ...form,
        city: selectedCity.name,
        state: selectedCity.state,
      })
    }
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header Section */}
      <div className="bg-gradient-to-b from-primary/5 to-transparent pt-12 pb-8 md:pt-16 md:pb-12">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="text-center font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
            Share Your Local Story
          </h1>
          <p className="text-center text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Every place has a story. No writing experience needed — just tell it like you would to a friend.
          </p>
        </div>
      </div>

      {/* Main Form */}
      <div className="mx-auto max-w-3xl px-4 py-8">
        {/* Notification */}
        {notification && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center gap-3 animate-in fade-in ${
              notification.type === "success"
                ? "bg-green-50 border border-green-200 text-green-800"
                : notification.type === "error"
                  ? "bg-red-50 border border-red-200 text-red-800"
                  : "bg-blue-50 border border-blue-200 text-blue-800"
            }`}
          >
            {notification.type === "success" && <CheckCircle className="w-5 h-5 flex-shrink-0" />}
            {notification.type === "error" && <AlertCircle className="w-5 h-5 flex-shrink-0" />}
            {notification.type === "info" && <AlertCircle className="w-5 h-5 flex-shrink-0" />}
            <span className="text-sm font-medium">{notification.message}</span>
          </div>
        )}

        {/* Cover Image Upload */}
        <div className="mb-8">
          <label className="block font-heading font-semibold text-foreground mb-3">Cover Image</label>
          <div
            onDrop={handleDragDrop}
            onDragOver={(e) => e.preventDefault()}
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              form.coverImagePreview ? "border-primary bg-primary/5" : "border-border hover:border-primary"
            }`}
          >
            {form.coverImagePreview ? (
              <div className="space-y-4">
                <img
                  src={form.coverImagePreview || "/placeholder.svg"}
                  alt="Cover preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => document.getElementById("cover-input")?.click()}
                  className="text-primary hover:text-primary-dark font-medium text-sm"
                >
                  Replace Image
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground mb-1">Drag and drop your image here</p>
                  <p className="text-sm text-muted-foreground mb-3">or</p>
                  <button
                    type="button"
                    onClick={() => document.getElementById("cover-input")?.click()}
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium text-sm hover:bg-primary-dark transition-colors"
                  >
                    Choose File
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">JPG, PNG up to 5MB</p>
              </div>
            )}
            <input id="cover-input" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">This image will be shown on story cards and story pages</p>
        </div>

        {/* Story Title */}
        <div className="mb-8">
          <label className="block font-heading font-semibold text-foreground mb-2">Story Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="A night that changed everything in Jaisalmer"
            className="w-full px-4 py-3 border border-border rounded-lg font-heading text-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-card"
          />
        </div>

        {/* Excerpt */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <label className="font-heading font-semibold text-foreground">Story Excerpt</label>
            <span className="text-xs text-muted-foreground">
              {characterCount}/{maxExcerpt}
            </span>
          </div>
          <textarea
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value.slice(0, maxExcerpt) })}
            placeholder="A short preview of your story that will appear on story cards"
            maxLength={maxExcerpt}
            className="w-full px-4 py-3 border border-border rounded-lg font-sans text-sm h-20 resize-none focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-card"
          />
          <p className="text-xs text-muted-foreground mt-2">Short preview shown on cards and listings</p>
        </div>

        {/* Story Content */}
        <div className="mb-8">
          <label className="block font-heading font-semibold text-foreground mb-2">Your Story</label>
          <textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            placeholder="Start writing your story here…"
            className="w-full px-4 py-3 border border-border rounded-lg font-sans text-sm min-h-64 resize-none focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-card"
          />
        </div>

        {/* Location & Category */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Location */}
          <div>
            <label className="block font-heading font-semibold text-foreground mb-2">City or Village</label>
            <div className="relative">
              <select
                value={form.city}
                onChange={handleCityChange}
                className="w-full px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-card appearance-none cursor-pointer"
              >
                <option value="">Select a city or village…</option>
                {INDIAN_CITIES.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name}, {city.state}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
            {form.state && (
              <p className="text-xs text-muted-foreground mt-2">
                <span className="font-semibold">State:</span> {form.state}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block font-heading font-semibold text-foreground mb-2">Category</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setForm({ ...form, category: cat })}
                  className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                    form.category === cat
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Author Preview */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <p className="font-heading font-semibold text-foreground mb-4">Author Preview</p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white font-heading font-bold">
              ST
            </div>
            <div>
              <p className="font-heading font-semibold text-foreground">Story Contributor</p>
              <p className="text-sm text-muted-foreground">contributor@storytrail.com</p>
              <p className="text-xs text-muted-foreground mt-1">This story will be published under your profile</p>
            </div>
          </div>
        </div>

        {/* Preview Button (Desktop) */}
        <div className="hidden md:block mb-8">
          <button
            onClick={() => setShowPreview(true)}
            className="w-full px-6 py-3 border border-primary text-primary font-medium rounded-lg hover:bg-primary/5 transition-colors"
          >
            Preview Story
          </button>
        </div>
      </div>

      {/* Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-xl">
        <div className="mx-auto max-w-3xl px-4 py-4 flex gap-3 justify-between">
          <button
            onClick={() => handleSubmit("draft")}
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 border border-border text-foreground font-medium rounded-lg hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting && selectedAction === "draft" ? "Saving…" : "Save Draft"}
          </button>

          <button
            onClick={() => setShowPreview(true)}
            className="flex-1 px-6 py-3 border border-border text-foreground font-medium rounded-lg hover:bg-muted transition-colors md:hidden"
          >
            Preview
          </button>

          <button
            onClick={() => handleSubmit("publish")}
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting && selectedAction === "publish" ? "Publishing…" : "Publish Story"}
          </button>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && <StoryPreview story={form} onClose={() => setShowPreview(false)} />}
    </div>
  )
}
