"use client";

import { useEffect, useMemo, useState } from "react";
import StoryCard from "../landingpage/StoryCard";
interface Category {
  id: string;
  name: string;
}

interface Location {
  id: string;
  city: string;
  state: string;
}

interface story {
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
interface StoriesListProps {
  search: string;
  initialLocation?: string | null;
}
const PAGE_SIZE = 6;

export default function StoriesList({
  search,
  initialLocation,
}: StoriesListProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [stories, setStories] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedCity, setSelectedCity] = useState<string>("All");

  const [loading, setLoading] = useState(false);
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
  useEffect(() => {
    if (initialLocation) {
      setSelectedCity(initialLocation);
    }
  }, [initialLocation]);
  console.log(
    "Initial location:",
    initialLocation,
    "Selected city:",
    selectedCity
  );
  useEffect(() => {
    const controller = new AbortController();

    async function fetchStories() {
      setLoading(true);

      try {
        const params = new URLSearchParams();

        if (search?.trim()) {
          params.set("search", search.trim());
        }

        if (selectedCategory !== "All") {
          params.set("categoryId", selectedCategory);
        }

        if (selectedCity !== "All") {
          params.set("locationId", selectedCity);
        }

        const res = await fetch(`/api/stories?${params.toString()}`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error("Failed to fetch stories");
        }

        const data = await res.json();
        setStories(data.stories ?? []);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Failed to fetch stories:", err);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchStories();

    return () => controller.abort();
  }, [search, selectedCategory, selectedCity]);

  const visibleStories = stories.slice(0, visibleCount);

  return (
    <section className="py-10 lg:py-14">
      <div className="container mx-auto px-4">
        {/* FILTER BAR */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Category Chips */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {/* All category */}
            <button
              onClick={() => {
                setSelectedCategory("All");
                setVisibleCount(PAGE_SIZE);
              }}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition ${
                selectedCategory === "All"
                  ? "bg-accent text-black"
                  : "bg-white text-gray-900 hover:bg-gray-100"
              }`}
            >
              All
            </button>

            {/* Dynamic categories */}
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setVisibleCount(PAGE_SIZE);
                }}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition ${
                  selectedCategory === cat.id
                    ? "bg-accent text-black"
                    : "bg-white text-gray-900 hover:bg-gray-100"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* City Dropdown */}
          <select
            value={selectedCity}
            onChange={(e) => {
              setSelectedCity(e.target.value);
              setVisibleCount(PAGE_SIZE);
            }}
            className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm outline-none focus:border-accent"
          >
            <option value="All">All</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.city}, {loc.state}
              </option>
            ))}
          </select>
        </div>

        {loading && (
          <>
            {/* Desktop Skeleton Grid */}
            <div className="hidden lg:grid grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <StoryCard key={i} loading={true} />
              ))}
            </div>
            {/* Mobile Skeleton Grid */}
            <div className="space-y-4 lg:hidden">
              {[1, 2, 3, 4].map((i) => (
                <StoryCard key={i} loading={true} />
              ))}
            </div>
          </>
        )}

        {!loading && stories.length === 0 && (
          <div className="py-20 text-center">
            <h3 className="font-heading text-xl font-semibold text-textDark">
              No stories found
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Try changing category or city.
            </p>
          </div>
        )}

        {!loading && stories.length > 0 && (
          <>
            {/* Desktop */}
            <div className="hidden lg:grid grid-cols-3 gap-6">
              {visibleStories.map((story) => (
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

            {/* Mobile */}
            <div className="space-y-4 lg:hidden">
              {visibleStories.map((story) => (
                <StoryCard
                  key={story.id}
                  story={{
                    id: story.id,
                    title: story.title,
                    slug: story.slug,
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

            {/* Load More */}
            {visibleCount < stories.length && (
              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => setVisibleCount((p) => p + PAGE_SIZE)}
                  className="rounded-full bg-accent px-6 py-3 text-black text-sm font-medium text-white transition hover:opacity-90"
                >
                  Load more stories
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
