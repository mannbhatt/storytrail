// app/api/places/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

// Add these interfaces
interface Location {
  id?: string;
  city?: string | null;
  state?: string | null;
}

interface Story {
  cover_image?: string | null;
  locations?: Location | null;
}

export async function GET() {
  try {
    const supabase = supabaseServer();

    const { data, error } = await supabase
      .from("stories")
      .select(`
        cover_image,
        locations (
          id,
          city,
          state
        )
      `)
      .not("locations.city", "is", null);

    if (error || !data) {
      console.error("Supabase error:", error);
      return NextResponse.json({ places: [] }, { status: 500 });
    }

    const cityMap = new Map<string, {
      location_id?: string;
      placeName: string;
      stateName?: string | null;
      image?: string | null;
      storyCount: number;
    }>();

    for (const story of data as Story[]) {
      const city = story.locations?.city?.trim();
      const state = story.locations?.state;

      if (!city) continue;

      if (!cityMap.has(city)) {
        cityMap.set(city, {
          location_id: story.locations?.id,
          placeName: city,
          stateName: state,
          image: story.cover_image,
          storyCount: 1,
        });
      } else {
        const existing = cityMap.get(city)!;
        cityMap.set(city, {
          ...existing,
          storyCount: existing.storyCount + 1
        });
      }
    }

    const places = Array.from(cityMap.values()).slice(0, 8);
    // console.log("Places:", places);
    return NextResponse.json({ places }, { status: 200 });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ places: [] }, { status: 500 });
  }
}
