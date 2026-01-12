"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

interface Place {
  location_id: number;
  image: string;
  placeName: string;
  stateName: string;
  storyCount: number;
}

export default function ExplorePlaces() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaces = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/places`);
        const data = await res.json();
        setPlaces(data.places || []);
        console.log("ExplorePlaces places:", data.places);
      } catch (err) {
        console.error("Failed to fetch places", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces();
  }, []);
  console.log("ExplorePlaces places:", places);
  return (
    <section className=" py-12 lg:py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-8 md:mb-12 text-center">
          <h2 className=" text-2xl lg:text-4xl font-semibold text-textDark mb-3">
            Explore Cities & Villages
          </h2>
          <p className="text-slate-600 text-base md:text-lg font-body">
            Hidden stories from across India
          </p>
        </div>

        {/* Desktop Grid - Hidden on Mobile */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <PlaceCardSkeleton key={index} />
              ))
            : places.map((place) => (
                <PlaceCard
                  key={`${place.location_id}`}
                  place={place}
                  isHovered={hoveredCard === place.location_id}
                  onHover={() => setHoveredCard(place.location_id)}
                  onLeave={() => setHoveredCard(null)}
                />
              ))}
        </div>

        {/* Mobile - 2 Column Grid */}
        <div className="grid grid-cols-2 gap-4 md:hidden">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <PlaceCardSkeleton key={index} isMobile />
              ))
            : places.map((place) => (
                <PlaceCard
                  key={`${place.location_id}`}
                  place={place}
                  isHovered={hoveredCard === place.location_id}
                  onHover={() => setHoveredCard(place.location_id)}
                  onLeave={() => setHoveredCard(null)}
                  isMobile
                />
              ))}
        </div>
      </div>
    </section>
  );
}

interface PlaceCardSkeletonProps {
  isMobile?: boolean;
}

function PlaceCardSkeleton({ isMobile = false }: PlaceCardSkeletonProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md">
      {/* Image Skeleton */}
      <div className="relative aspect-video overflow-hidden bg-slate-200">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 animate-pulse" />
      </div>

      {/* Content Skeleton */}
      <div className={`p-4 ${isMobile ? "p-3" : "p-4"}`}>
        {/* Title Skeleton */}
        <div
          className={`h-6 bg-slate-200 rounded mb-2 animate-pulse ${
            isMobile ? "h-5" : "h-6"
          }`}
        />

        {/* State Skeleton */}
        <div
          className={`h-4 bg-slate-200 rounded mb-3 w-3/4 animate-pulse ${
            isMobile ? "h-3" : "h-4"
          }`}
        />

        {/* Story Count Badge Skeleton */}
        <div className="flex items-center">
          <div
            className={`h-6 bg-slate-200 rounded-full animate-pulse ${
              isMobile ? "h-5 w-16" : "h-6 w-20"
            }`}
          />
        </div>
      </div>
    </div>
  );
}

interface PlaceCardProps {
  place: Place;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  isMobile?: boolean;
}

function PlaceCard({
  place,
  isHovered,
  onHover,
  onLeave,
  isMobile = false,
}: PlaceCardProps) {
  const router = useRouter();
  return (
    <div
      className={`bg-white rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
        isHovered ? "shadow-2xl -translate-y-1" : "shadow-md hover:shadow-xl"
      }`}
      onClick={() =>
        router.push(
          `/stories?location=${encodeURIComponent(place.location_id)}`
        )
      }
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden bg-slate-200">
        <Image
          src={place.image || "/placeholder.svg"}
          alt={`${place.placeName}, ${place.stateName}`}
          fill
          className={`object-cover `}
          unoptimized
        />
        {/* Subtle overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Card Content */}
      <div className={`p-4 ${isMobile ? "p-3" : "p-4"}`}>
        {/* Place Name */}
        <h3
          className={`font-heading font-semibold text-textDark mb-1 line-clamp-1 ${
            isMobile ? "text-base" : "text-lg md:text-xl"
          }`}
        >
          {place.placeName}
        </h3>

        {/* State Name */}
        <p
          className={`text-slate-600 font-body mb-3 line-clamp-1 ${
            isMobile ? "text-xs" : "text-sm"
          }`}
        >
          {place.stateName}
        </p>

        {/* Story Count Badge */}
        <div className="flex items-center">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full bg-yellow-400/20 border border-yellow-400/40 ${
              isMobile ? "text-xs" : "text-sm"
            }`}
          >
            <span className="font-semibold text-slate-900">
              {place.storyCount}
            </span>
            <span className="ml-1 text-slate-700">
              {place.storyCount === 1 ? "Story" : "Stories"}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
