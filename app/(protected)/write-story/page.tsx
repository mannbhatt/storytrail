"use client"

import ImgUpload from "@/components/write-story/imgupload"
import { ChevronDown, AlertCircle, CheckCircle, Pen, Eye } from "lucide-react"
import StoryPreview from "@/components/write-story/story-preview"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Category {
  id: string;
  name: string;
}

interface Location {
  id: string;
  city: string;
  state: string;
}
type Notification = {
  type: "error" | "success" | "warning";
  message: string;
};



export default function WriteStoryPage() {
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    content: "",
    categoryId: "",
    categoryOther: "",
    locationId: "",
    cityOther: "",
    stateOther: "",
    coverImageUrl: "",
    coverImageKey: "",
  })
  const [showPreview, setShowPreview] = useState(false)
  const [notification, setNotification] = useState<Notification | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [categories, setCategories] = useState<Category[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router=useRouter();
  useEffect(() => {

    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || []))
      .catch((err) => console.error(err));


    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/locations`)
      .then((res) => res.json())
      .then((data) => setLocations(data.locations || []))
      .catch((err) => console.error(err));
  }, []);

  const handleImageUpload = (url: string) => {
    setForm(prev => ({
      ...prev,
      coverImageUrl: url,
    }))
  }
  
  const handleImageKeyChange = (key: string) => {
    setForm(prev => ({
      ...prev,
      coverImageKey: key,
    }))
  }
  


  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    console.log(form)
    if (!form.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!form.subtitle.trim()) {
      newErrors.subtitle = "Subtitle is required"
    }

    if (!form.categoryId && !form.categoryOther?.trim()) {
      console.log("in validation in categoryid", form.categoryId)
      newErrors.categoryId = "Category is required"
    }

    if (!form.locationId) {
      newErrors.location = "Location is required"
    }

    if (form.locationId === "OTHER") {
      if (!form.cityOther?.trim()) {
        newErrors.cityOther = "City/Village name required"
      }
      if (!form.stateOther?.trim()) {
        newErrors.stateOther = "State required"
      }
    }

    if (!form.content.trim()) {
      newErrors.content = "Story content is required"
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }
  const handleSubmit = async (action: "publish" | "draft") => {
    if (!validateForm()) {
      setNotification({
        type: "error",
        message: "Please fill all required fields",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const payload = {
        title: form.title,
        subtitle: form.subtitle,
        content: form.content,
        coverImage: form.coverImageUrl || "https://cdn.pixabay.com/photo/2022/05/28/21/44/carpathians-7228042_960_720.jpg",

        categoryId: form.categoryId !== "OTHER" ? form.categoryId : null,
        categoryOther: form.categoryId === "OTHER" ? form.categoryOther : null,

        locationId: form.locationId !== "OTHER" ? form.locationId : null,
        cityOther: form.locationId === "OTHER" ? form.cityOther : null,
        stateOther: form.locationId === "OTHER" ? form.stateOther : null,

        status: action, // publish | draft
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/stories/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit story")
      }

      setNotification({
        type: "success",
        message:
          action === "publish"
            ? "Story published successfully!"
            : "Draft saved successfully!",
      });
      router.push("/profile");

    } catch (err: any) {
      setNotification({
        type: "error",
        message: err.message || "Something went wrong",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-32 font-sans text-text-main">
      <div className="w-full h-[72px] bg-primary"></div>
      <div className="mx-auto max-w-5xl px-4 mt-12">

        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-12 shadow-sm">
          <div className="flex flex-col items-center justify-center  px-4 pb-12">
            <h1 className="text-black font-heading text-3xl lg:text-4xl font-semibold text-center mb-4 drop-shadow-md">
              Write Your <span className="text-accent-brand">Story</span>
            </h1>
            <p className="text-gray-700 font-sans text-base lg:text-lg text-center max-w-2xl drop-shadow-sm font-medium">
              Share your unique travel experiences, local insights, and emotions with our global community.
            </p></div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">

            <div className="space-y-6 order-2 md:order-1">
              <div className="space-y-3">
                <label className="text-xs pl-1 md:text-lg font-heading font-semibold text-slate-700 tracking-[0.2em] flex items-center gap-2">
                  Story Title
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="A night that changed everything..."
                  className="w-full px-2 py-4 border-2 border-slate-100 font-heading text-xl rounded-lg font-semibold focus:outline-none focus:border-primary transition-all bg-transparent placeholder:text-slate-300"
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs pl-1 md:text-lg font-heading font-semibold text-slate-700 tracking-[0.2em] flex items-center gap-2">
                  Subtitle
                </label>
                <textarea
                  value={form.subtitle}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  placeholder="A brief teaser to hook your readers..."
                  className="w-full px-2 py-2 border-2 border-slate-100 font-sans text-xl leading-relaxed rounded-lg focus:outline-none focus:border-primary transition-all bg-transparent resize-none h-24 placeholder:text-slate-300"
                  required
                />
              </div>
            </div>


            <div className="order-1 md:order-2">
              <label className=" mb-2 pl-1 block text-xs md:text-lg font-heading font-semibold text-slate-700 tracking-[0.2em] flex items-center ">
                Visual Cover
              </label>
              <div className="overflow-hidden rounded-lg ring-1 ring-slate-100">
                <ImgUpload
                  onUploadComplete={handleImageUpload}
                  onImageKeyChange={handleImageKeyChange}
                  initialImage={form.coverImageUrl}
                  initialImageKey={form.coverImageKey}
                />
              </div>
              <p className="text-xs text-slate-400 mt-3 font-sans italic">
                Pro tip: High-quality landscape images work best for story covers.
              </p>
            </div>
          </div>


          <div className="grid md:grid-cols-2 gap-12 mb-12 py-12 border-y-2 border-slate-100">
            <div className="space-y-6">
              <label className=" mb-2 pl-1 block text-xs md:text-lg font-heading font-semibold text-slate-700 tracking-[0.2em] flex items-center ">
                Choose Category
              </label>

              <div className="relative group ">
                <select className="w-full pl-4 pr-6 py-4 border-2 border-slate-100 font-sans text-xl rounded-lg focus:outline-none focus:border-primary transition-all bg-transparent appearance-none cursor-pointer" value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
                  <option value="">Select category…</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                  <option value="OTHER">Other</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
              </div>
              {
                form.categoryId === "OTHER" && (
                  <input
                    className="w-full px-2 mt-4 py-4 border-2 border-slate-100 font-heading text-xl rounded-lg font-semibold focus:outline-none focus:border-primary transition-all bg-transparent placeholder:text-slate-300"
                    placeholder="Enter new category"
                    value={form.categoryOther}
                    onChange={(e) =>
                      setForm({ ...form, categoryOther: e.target.value })
                    }
                  />
                )}

            </div>
            <div className="space-y-6">
              <label className="mb-2 block pl-1 text-xs md:text-lg font-heading font-semibold text-slate-700 tracking-[0.2em] flex items-center">
                Vibe / Location
              </label>

              <div className="relative group ">
                <select className="w-full pl-4 pr-6 py-4 border-2 border-slate-100 font-sans text-xl rounded-lg focus:outline-none focus:border-primary transition-all bg-transparent appearance-none cursor-pointer" value={form.locationId} onChange={(e) => setForm({ ...form, locationId: e.target.value })}>
                  <option value="">Select city…</option>
                  {locations.map(loc => (
                    <option key={loc.id} value={loc.id}>{loc.city}, {loc.state}</option>
                  ))}
                  <option value="OTHER">Other</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
              </div>
              {form.locationId === "OTHER" && (
                <div className="flex gap-2">
                  <input
                    className="w-[50%] px-2 mt-4 py-4 border-2 border-slate-100 font-heading text-xl rounded-lg font-semibold focus:outline-none focus:border-primary transition-all bg-transparent placeholder:text-slate-300"
                    placeholder="City / Village"
                    value={form.cityOther}
                    onChange={(e) =>
                      setForm({ ...form, cityOther: e.target.value })
                    }
                  />
                  <input
                    className="w-[50%] px-2 mt-4 py-4 border-2 border-slate-100 font-heading text-xl rounded-lg font-semibold focus:outline-none focus:border-primary transition-all bg-transparent placeholder:text-slate-300"
                    placeholder="State"
                    value={form.stateOther}
                    onChange={(e) =>
                      setForm({ ...form, stateOther: e.target.value })
                    }
                  />
                </div>
              )}

            </div>
          </div>

          <div className="mb-12">
            <label className="mb-2 block pl-1 text-xs md:text-lg font-heading font-semibold text-slate-700 tracking-[0.2em] flex items-center">
              Narrative Flow
            </label>
            <div className="relative">
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="Begin your journey here..."
                className="w-full px-8 py-10 bg-slate-50 border border-slate-100 rounded-lg font-sans text-xl leading-[1.6] min-h-[600px] resize-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary transition-all text-slate-800 placeholder:text-slate-400"
                required
              />
              <div className="absolute bottom-4 right-6 text-[10px] text-slate-400 font-sans uppercase tracking-tighter">
                {form.content.split(/\s+/).filter(Boolean).length} Words
              </div>
            </div>
            <p className="text-sm text-slate-400 mt-4 flex items-center gap-2 italic">
              <AlertCircle className="w-4 h-4" /> Focus on the emotions and sensory details to bring your story to life.
            </p>
          </div>


          <div className="flex flex-col md:flex-row items-center justify-end gap-8 pt-12 border-t border-slate-100">
            
            <div className="flex items-center gap-5 w-full md:w-auto">
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 border-2  text-black font-heading font-semibold rounded-lg bg-accent hover:bg-yellpw-400 hover:shadow-xl border-accent  text-sm  tracking-[0.2em]"
              >
                <Eye className="w-4 h-4" /> Preview
              </button>

              <button
                type="button"
                onClick={() => handleSubmit("publish")}
                disabled={isSubmitting}
                className="flex-[2] md:flex-none px-16 py-5 bg-primary text-white font-heading font-semibold rounded-lg hover:bg-primaryDark hover:shadow-xl hover:shadow-primary-brand/25 transition-all text-sm  tracking-[0.2em] disabled:opacity-70 flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-lg animate-spin" />
                ) : (
                  "Publish Story"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      
      <button
        onClick={() => handleSubmit("draft")}
        className="fixed bottom-24 right-6 w-14 h-14 bg-accent-brand text-text-main rounded-lg shadow-lg flex items-center justify-center md:hidden hover:scale-110 transition-transform active:scale-95"
        title="Save Draft"
      >
        <CheckCircle className="w-6 h-6" />
      </button>

      
      {notification && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4">
          <div
            className={`px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3 ${notification.type === "success" ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
              }`}
          >
            {notification.type === "success" ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span className="font-heading font-bold text-sm tracking-wide">{notification.message}</span>
          </div>
        </div>
      )}

      
      {showPreview && <StoryPreview story={{title:form.title,subtitle:form.subtitle,content:form.content,coverImagePreview:form.coverImageUrl}} onClose={() => setShowPreview(false)} />}
    </div>
  )
}
