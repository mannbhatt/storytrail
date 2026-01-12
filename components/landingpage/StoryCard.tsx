"use client";
import Image from "next/image";

import Link from "next/link";

import { Skeleton } from "@/components/ui/Skeleton";

interface Story {
  id: number;
  slug: string;
  image: string;
  title: string;
  city: string;
  subtitle: string;
  author: {
    name: string;
    avatar: string;
  };
}

interface StoryCardProps {
  story?: Story;
  
  loading?: boolean;
}

export default function StoryCard({ story, loading = false }: StoryCardProps) {
  
  
  // Return early if no story and not loading
  if (!story && !loading) {
    return null;
  }
  
 
  if (loading) {
    return (
      <>
        {/* Desktop Skeleton */}
        <div className="hidden lg:block overflow-hidden rounded-lg bg-white shadow-md">
          <div className="relative aspect-video overflow-hidden">
            <Skeleton className="h-full w-full" />
          </div>
          <div className="p-4">
            <Skeleton className="mb-2 h-6 w-3/4" />
            <Skeleton className="mb-3 h-3 w-1/2" />
            <Skeleton className="mb-4 h-4 w-full" />
            <Skeleton className="mb-2 h-4 w-5/6" />
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Skeleton */}
        <div className="lg:hidden">
          <div className="flex gap-3 overflow-hidden rounded-lg bg-white p-3 shadow-md">
            <Skeleton className="h-20 w-20 flex-shrink-0 rounded-md" />
            <div className="flex flex-1 flex-col justify-between">
              <Skeleton className="mb-2 h-4 w-3/4" />
              <Skeleton className="mb-2 h-3 w-1/2" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  if (!story) return null;
  return (
    <>
      {/* Desktop Card Layout - Hidden on mobile */}
      <div className="hidden lg:block group overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <Link href={`/stories/${story.slug}`} className="block">
          {/* Story Image */}
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={story.image || "/placeholder.svg"}
              alt={story.title}
              fill
              className="object-cover "
              unoptimized={true}
            />
          </div>

          {/* Story Content */}
          <div className="p-4">
            {/* Title */}
            <h3 className="font-heading line-clamp-2 text-lg font-semibold text-textDark">
              {story.title}
            </h3>

            {/* City */}
            <p className="mt-1 text-xs text-gray-500">{story.city}</p>

            {/* Subtitle */}
            <p className="mt-2 line-clamp-3 text-sm text-gray-600">
              {story.subtitle}
            </p>

            {/* Author Row */}
            <div
              className={"mt-4 flex items-center gap-2"}
            >
              <div className="flex items-center gap-2">
                <div className="relative h-8 w-8 overflow-hidden rounded-full">
                  <Image
                    src={story.author?.avatar || "/placeholder.svg"}
                    alt={story.author?.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {story.author?.name}
                </span>
              </div>
             
            </div>
          </div>
        </Link>
      </div>

      {/* Mobile Card Layout - Visible only on mobile */}
      <div className=" lg:hidden">
        {/* Small Image on Left */}
        <Link
          href={`/stories/${story.slug}`}
          className="flex gap-3 overflow-hidden rounded-lg bg-white p-3 shadow-md"
        >
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
            <Image
              src={story.image || "/placeholder.svg"}
              alt={story.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Content on Right */}
          <div className="flex flex-1 flex-col justify-between">
            {/* Title */}
            <h3 className="font-heading line-clamp-2 text-sm font-bold text-textDark">
              {story.title}
            </h3>

            {/* Subtitle */}
            <p className="hidden lg:block line-clamp-2 text-xs text-gray-600">
              {story.subtitle}
            </p>

            {/* City */}
            <p className="text-xs text-gray-500">{story.city}</p>

            {/* Author Row + Actions (side by side if showActions) */}
            <div
              className={" mt-1 flex items-center gap-2 justify-between"}
            >
              <div className="flex items-center gap-2">
                <div className="relative h-6 w-6 overflow-hidden rounded-full">
                  <Image
                    src={story.author?.avatar || "/placeholder.svg"}
                    alt={story.author?.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-xs font-medium text-gray-600">
                  {story.author?.name}
                </span>
              </div>
              
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
