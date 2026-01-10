"use client";
import { useEffect, useState } from "react";
import StoryCard from "./StoryCard";

interface stories {
  id: number;
  title: string;
  slug: string;
  summary: string;
  cover_image: string;
  created_at: string;
  categories: {
    id: number;
    name: string;
  };
  locations: {
    id: number;
    city: string;
    state: string;
  };
  users: {
    user_name: string;
    avatar_url: string;
  };
}
export default function FeaturedStories() {
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchFeaturedStories = async () => {
      try {
        const res = await fetch("/api/stories?limit=6", {
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
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">Loading featured stories…</p>
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
