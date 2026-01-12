"use client"

import type { Metadata } from "next"
import Image from "next/image"
import { MapPin, Calendar, ArrowLeft, Clock, Heart, MessageCircle, Eye, User } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

interface StoryData {
  id: number;
  slug: string;
  title: string;
  summary: string;
  content: string;
  cover_image: string;
  created_at: string;
  like_count: number;
  comment_count: number;
  view_count: number;
  categories: {
    id: number;
    name: string;
  } | null;
  locations: {
    id: number;
    city: string;
    state: string;
  } | null;
  users: {
    user_name: string;
    avatar_url: string | null;
  } | null;
}

export default function StoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string>("");
  const [story, setStory] = useState<StoryData | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSlug = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };
    loadSlug();
  }, [params]);

  useEffect(() => {
    if (!slug) return;

    const loadStory = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/stories/${slug}`);
        
        if (!res.ok) {
          throw new Error('Failed to fetch story');
        }
        
        const data = await res.json();
        setStory(data);
      } catch (err) {
        console.error('Error loading story:', err);
        setError('Failed to load story');
      } finally {
        setLoading(false);
      }
    };

    loadStory();
  }, [slug]);

  

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading story...</p>
        </div>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'Story not found'}</p>
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Stories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full h-[72px] bg-primary"></div>
      {/* Breadcrumb Navigation */}
      <div className="bg-background pt-10 ">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Stories
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid gap-8">
          {/* Main Content */}
          <div className="">
            {/* Cover Image */}
            {story.cover_image && (
              <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={story.cover_image}
                    alt={story.title}
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                  />
                </div>
              </div>
            )}

            {/* Story Header */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {story.categories?.name && (
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-wide">
                    {story.categories?.name}
                  </span>
                )}
                {story.locations && (
                  <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                    <MapPin className="w-4 h-4" />
                    {story.locations?.city}, {story.locations?.state}
                  </div>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {story.title}
              </h1>

              <p className="text-lg text-gray-600 text-justify mb-6 leading-relaxed">
                {story.summary}
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  {new Date(story.created_at).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  4 min read
                </div>
                
              </div>
            </div>

            {/* Story Content */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="prose prose-lg max-w-none">
                <div className="text-gray-800 text-justify leading-relaxed whitespace-pre-wrap">
                  {story.content}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="">
            {/* Author Card */}
            {story.users && (
              <div className="bg-white w-full rounded-2xl p-6 shadow-sm mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">About the Author</h3>
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                    {story.users.avatar_url ? (
                      <Image
                        src={story.users.avatar_url}
                        alt={story.users.user_name || "Author"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <User className="w-8 h-8 text-gray-500" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {story.users.user_name || "Anonymous"}
                    </h4>
                    <p className="text-sm text-gray-500">Story Teller</p>
                  </div>
                </div>
              </div>
            )}

           
            
          </div>
        </div>
      </div>
    </div>
  );
}
