"use client"

import type React from "react"
import ImgUpload from "@/components/write-story/imgupload"
import { useState } from "react"
import { Upload, ChevronDown, AlertCircle, CheckCircle } from "lucide-react"
import StoryPreview from "@/components/write-story/story-preview"

const CATEGORIES = ["Travel", "Culture", "Food", "Spiritual", "Nature", "History"]
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
  coverImageUrl: string;
  coverImageKey: string; 
  coverImagePreview: string
  title: string
  subtitle: string
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
    coverImageUrl: "",
  coverImageKey: "" ,
    coverImagePreview: "",
    title: "",
    subtitle: "",
    content: "",
    city: "",
    state: "",
    category: "",
  })

  const [showPreview, setShowPreview] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notification, setNotification] = useState<Notification | null>(null)
  const [selectedAction, setSelectedAction] = useState<"draft" | "publish" | null>(null)
  const handleImageUpload = (url: string) => {
    setForm((prev) => ({
      ...prev,
      coverImageUrl: url,
    }));

  };
  
  const handleImageKeyChange = (key: string) => {
    setForm((prev) => ({
      ...prev,
      coverImageKey: key,
    }));
  };
 
  const validateForm = (): boolean => {
    if (!form.coverImageUrl) {
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
      await new Promise((resolve) => setTimeout(resolve, 1500))

      showNotification(
        "success",
        action === "draft"
          ? "Story saved as draft! You can edit it later."
          : "Story published successfully! Check your profile to see it live.",
      )

      if (action === "publish") {
        setForm({
          coverImageUrl: "",
          coverImageKey: "" ,
          coverImagePreview: "",
          title: "",
          subtitle: "",
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
console.log(form.coverImageUrl)
  return (
    <div className="min-h-screen  pb-40">
      {/* Page Header */}
      <div className="px-4 py-10 md:py-14  text-center md:text-left">
        <div className="h-[72px] w-full bg-yellow"/>
        <div className="mx-auto max-w-5xl">
          <h1 className="font-poppins text-4xl md:text-5xl font-bold text-foreground mb-3">Write Your Story</h1>
          <p className="font-inter text-lg text-slate-600 max-w-2xl md:max-w-none">
            Share your experience, place, and emotions with the world
          </p>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="mx-auto max-w-5xl px-4 mb-6">
          <div
            className={`p-4 rounded-lg flex items-center gap-3 animate-in fade-in ${
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
        </div>
      )}

      {/* Main Form Content */}
      <div className="mx-auto max-w-5xl px-4">
        {/* Cover Image & Story Title Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Left: Cover Image Upload */}
          <div className="relative">
 
          <ImgUpload
        onUploadComplete={handleImageUpload}
        onImageKeyChange={handleImageKeyChange}
        initialImage={form.coverImageUrl}
        initialImageKey={form.coverImageKey}
      />
</div>

          {/* Right: Title & Subtitle */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <label className="block font-poppins font-semibold text-foreground mb-2">Story Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="A night that changed everything in Jaisalmer"
                className="w-full px-4 py-3 border border-slate-200 rounded-lg font-poppins text-xl font-semibold focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all bg-white"
              />
            </div>

            <div>
              <label className="block font-poppins font-semibold text-foreground mb-2">Subtitle</label>
              <input
                type="text"
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                placeholder="A brief description of what your story is about"
                className="w-full px-4 py-3 border border-slate-200 rounded-lg font-inter text-base focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all bg-white"
              />
            </div>
          </div>
        </div>

        {/* Metadata Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Left: Category Selector */}
          <div>
            <label className="block font-poppins font-semibold text-foreground mb-3">Category</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setForm({ ...form, category: cat })}
                  className={`px-4 py-2 rounded-full font-inter font-medium text-sm transition-all ${
                    form.category === cat
                      ? "bg-sky-400 text-white shadow-md"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Place / City Selector */}
          <div>
            <label className="block font-poppins font-semibold text-foreground mb-2">Place / City / Village</label>
            <div className="relative">
              <select
                value={form.city}
                onChange={handleCityChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg font-inter text-base focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all bg-white appearance-none cursor-pointer"
              >
                <option value="">Select a place…</option>
                {INDIAN_CITIES.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name}, {city.state}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
            {form.state && (
              <p className="text-sm text-slate-600 mt-2 font-inter">
                <span className="font-semibold">State:</span> {form.state}
              </p>
            )}
          </div>
        </div>

        {/* Story Content Section */}
        <div className="mb-8">
          <label className="block font-poppins font-semibold text-foreground mb-2">Your Story</label>
          <textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            placeholder="Start writing your story here…"
            className="w-full px-4 py-3 border border-slate-200 rounded-lg font-inter text-base min-h-80 resize-none focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all bg-white"
          />
          <p className="text-xs text-slate-500 mt-2">Tell your story naturally, as if you're speaking to a friend</p>
        </div>

        {/* Author Preview Section */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
          <p className="font-poppins font-semibold text-foreground mb-4">Author Preview</p>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full flex items-center justify-center text-white font-poppins font-bold flex-shrink-0">
              ST
            </div>
            <div>
              <p className="font-poppins font-semibold text-foreground">Story Contributor</p>
              <p className="text-sm font-inter text-slate-600">contributor@storytrail.com</p>
              <p className="text-xs font-inter text-slate-500 mt-1">This story will be published under your profile</p>
            </div>
          </div>
        </div>

        <div className="hidden md:block mb-8">
          <button
            onClick={() => setShowPreview(true)}
            className="w-full px-6 py-3 border-2 border-sky-400 text-sky-600 font-poppins font-semibold rounded-lg hover:bg-sky-50 transition-colors"
          >
            Preview Story
          </button>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-slate-100 shadow-2xl">
        <div className="mx-auto max-w-5xl px-4 py-4 flex gap-3 justify-end md:justify-center">
          <button
            onClick={() => handleSubmit("draft")}
            disabled={isSubmitting}
            className="px-6 py-3 border-2 border-slate-300 text-slate-700 font-poppins font-semibold rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting && selectedAction === "draft" ? "Saving…" : "Save Draft"}
          </button>

          <button
            onClick={() => setShowPreview(true)}
            className="px-6 py-3 border-2 border-slate-300 text-slate-700 font-poppins font-semibold rounded-lg hover:bg-slate-50 transition-colors md:hidden"
          >
            Preview
          </button>

          <button
            onClick={() => handleSubmit("publish")}
            disabled={isSubmitting}
            className="px-6 py-3 bg-sky-500 text-white font-poppins font-semibold rounded-lg hover:bg-sky-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
