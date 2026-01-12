"use client";
import { useEffect, useState } from "react";
import StoryCard from "./StoryCard";


export default function FeaturedStories() {
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchFeaturedStories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/stories?limit=6`, {
          signal: controller.signal,
        });
        const data = await res.json();
        setStories(data.stories || []);
        console.log("Fetched featured stories:", stories);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Failed to fetch featured stories", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedStories();

    return () => controller.abort();
  }, []);
  // console.log("Fetched featured stories:", stories);
  if (loading) {
    return (
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          {/* Section Header Skeleton */}
          <div className="mb-8 text-center lg:mb-12">
            <div className="h-8 w-48 bg-gray-200 rounded-md mx-auto mb-2 animate-pulse"></div>
            <div className="h-4 w-64 bg-gray-200 rounded-md mx-auto animate-pulse"></div>
          </div>
          
          {/* Desktop Skeleton Grid */}
          <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
            {[1, 2, 3].map((i) => (
              <StoryCard key={i} loading={true} />
            ))}
          </div>
          
          {/* Mobile Skeleton List */}
          <div className="space-y-4 lg:hidden">
            {[1, 2, 3].map((i) => (
              <StoryCard key={i} loading={true} />
            ))}
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className=" py-12 lg:py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-8 text-center lg:mb-12">
          <h2 className="font-heading  font-semibold traking-wide text-textDark text-2xl lg:text-4xl">
            Featured Stories
          </h2>
          <p className="mt-2 text-sm text-gray-600 lg:text-base">
            Hand-picked stories loved by travelers
          </p>
        </div>

        {/* Desktop Grid Layout (3 columns) - Hidden on mobile */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
          {stories.map((story) => (
            <StoryCard
              key={story.id}
              story={{
                id: story.id,
                slug: story.slug,
                title: story.title,
                subtitle: story.summary,
                image: story.cover_image,
                city: `${story.locations?.city}, ${story.locations?.state}`,
                //category: story.categories?.name || "Unknown",
                author: {
                  name: story.users?.user_name || "Unknown",
                  avatar: story.users?.avatar_url || "",
                },
              }}
            />
          ))}
        </div>

        {/* Mobile List Layout - Visible only on mobile */}
        <div className="space-y-4 lg:hidden">
          {stories.map((story) => (
            <StoryCard
              key={story.id}
              story={{
                id: story.id,
                slug: story.slug,
                title: story.title,
                subtitle: story.summary,
                image: story.cover_image,
                city: `${story.locations?.city}, ${story.locations?.state}`,
                //category: story.categories?.name || "Unknown",
                author: {
                  name: story.users?.user_name || "Unknown",
                  avatar: story.users?.avatar_url || "",
                },
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
