
import Hero from "@/components/landingpage/hero";

import ExplorePlaces from "@/components/landingpage/expPlaces"
import Community from "@/components/landingpage/community"
import FeaturedStories from "@/components/landingpage/feturedStories"

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1"><Hero/>

<FeaturedStories />
<ExplorePlaces />
<Community/>
</main>

    </div>
  );
}