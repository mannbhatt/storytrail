import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { MapPin, Calendar, ArrowLeft, Clock } from "lucide-react"
import Link from "next/link"




export default async function StoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
    const res=await fetch(`http://localhost:3000/api/stories/${slug}`)
    const data=await res.json()
    if (!data) return { title: "Story Not Found" }

    console.log("story data",data)
  

  return (
    <article className="min-h-screen bg-white font-sans text-slate-900 selection:bg-primary-brand/10">
      {/* 1. Header Section - Minimal and Typography-focused */}
      <div className="w-full h-[72px] bg-primary"></div>
      <header className="max-w-3xl mx-auto px-6 pt-16 md:pt-24 pb-12">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-primary-brand/10 text-primary-brand rounded-full text-[10px] font-heading font-black uppercase tracking-wider">
              {data.categories.name}
            </span>
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-heading font-bold uppercase tracking-wider">
              <MapPin className="w-3 h-3" />
              {data.locations.city}, {data.locations.state}
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-heading font-extrabold leading-[1.1] tracking-tight text-slate-900">
            {data.title}
          </h1>

          <p className="text-xl md:text-2xl text-slate-500 font-sans leading-relaxed italic">{data.summary}</p>

          <div className="flex items-center gap-6 pt-4 text-slate-400 text-xs font-sans border-t border-slate-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(data.created_at).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />4 min read
            </div>
          </div>
        </div>
      </header>

      {/* 2. Optional Cover Image - Constrained and Rounded */}
      {data.cover_image && (
        <div className="max-w-4xl mx-auto px-6 mb-16">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl shadow-sm border border-slate-100">
            <Image
              src={data.cover_image || "/placeholder.svg"}
              alt={data.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* 4. Story Content - High Readability */}
      <main className="max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-slate prose-lg md:prose-xl max-w-none">
          <div className="font-sans text-lg md:text-xl leading-[1.85] text-slate-700 whitespace-pre-wrap">
            {data.content}
          </div>
        </div>

        {/* 5. Footer Section */}
        <footer className="mt-20 pt-10 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <Link
              href="/stories"
              className="group flex items-center gap-2 text-xs font-heading font-black text-slate-400 uppercase tracking-widest hover:text-primary-brand transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to all stories
            </Link>

            <div className="flex items-center gap-2 text-[10px] font-heading font-bold text-slate-300 uppercase tracking-widest">
              StoryTrail Editorial
            </div>
          </div>
        </footer>
      </main>
    </article>
  )
}
