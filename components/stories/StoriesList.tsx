"use client"

import { useMemo, useState } from "react"
import StoryCard from "../landingpage/StoryCard"

interface Story {
  id: number
  image: string
  title: string
  city: string
  category: string
  subtitle: string
  author: {
    name: string
    avatar: string
  }
}

/* ---------- MOCK DATA (replace later with DB) ---------- */
const stories: Story[] = [
  {
    id: 1,
    image: "https://cdn.pixabay.com/photo/2014/08/15/18/09/gandria-418953_960_720.jpg",
    title: "A Journey Through the Himalayas: Finding Peace in the Mountains",
    city: "Manali, India",
    subtitle: "Discover the breathtaking beauty of snow-capped peaks and serene valleys that will leave you speechless.",
    category: "Nature",
    author: { name: "Priya Sharma", avatar: "https://cdn.pixabay.com/photo/2017/08/04/11/49/person-2579938_960_720.jpg" },
  },
  {
    id: 2,
    image: "https://cdn.pixabay.com/photo/2013/09/27/17/54/church-187468_1280.jpg",
    title: "Island Hopping in Andaman: A Tropical Paradise Awaits",
    city: "Port Blair, India",
    subtitle: "Crystal clear waters, pristine beaches, and unforgettable sunsets make this the perfect getaway.",
    category: "Travel",
    author: { name: "Rahul Verma", avatar: "https://cdn.pixabay.com/photo/2017/08/04/11/49/person-2579938_960_720.jpg" },
  },
  {
    id: 3,
    image: "https://cdn.pixabay.com/photo/2015/11/05/15/18/buddha-1024347_960_720.jpg",
    title: "Rajasthan Diaries: Tales from the Golden Desert",
    city: "Jaisalmer, India",
    subtitle: "Experience the magic of desert life with camel safaris, ancient forts, and vibrant culture.",
    category: "Culture",
    author: { name: "Ananya Singh", avatar: "https://cdn.pixabay.com/photo/2017/08/04/11/49/person-2579938_960_720.jpg" },
  },
  {
    id: 4,
    image: "https://cdn.pixabay.com/photo/2017/03/30/04/14/house-2187170_1280.jpg",
    title: "Kerala Backwaters: A Peaceful Journey Through Nature",
    city: "Alleppey, India",
    subtitle: "Cruise through serene backwaters, lush greenery, and traditional villages on a houseboat.",
    category: "Nature",
    author: { name: "Vikram Patel", avatar: "https://cdn.pixabay.com/photo/2017/08/04/11/49/person-2579938_960_720.jpg" },
  },
  {
    id: 5,
    image: "https://cdn.pixabay.com/photo/2013/09/27/17/54/church-187468_1280.jpg",
    title: "Spiritual Awakening in Varanasi: A Soul Journey",
    city: "Varanasi, India",
    subtitle: "Witness ancient rituals, spiritual ceremonies, and the timeless beauty of the holy city.",
    category: "History",
    author: { name: "Meera Kapoor", avatar: "https://cdn.pixabay.com/photo/2017/08/04/11/49/person-2579938_960_720.jpg" },
  },
  {
    id: 6,
    image: "https://cdn.pixabay.com/photo/2017/03/30/04/14/house-2187170_1280.jpg",
    title: "Goa Vibes: Where Beach Meets Culture",
    city: "Goa, India",
    subtitle: "From vibrant nightlife to peaceful beaches, discover the dual charm of this coastal paradise.",
    category: "Travel",
    author: { name: "Arjun Malhotra", avatar: "https://cdn.pixabay.com/photo/2017/08/04/11/49/person-2579938_960_720.jpg" },
  },
  {
    id: 7,
    image: "https://cdn.pixabay.com/photo/2014/08/15/18/09/gandria-418953_960_720.jpg",
    title: "Mysore Palace: A Royal Experience in South India",
    city: "Mysore, India",
    subtitle: "Explore the grandeur of the royal palace, its architecture, and the rich history of the Wodeyar dynasty.",
    category: "History",
    author: { name: "Kavya Reddy", avatar: "https://cdn.pixabay.com/photo/2017/08/04/11/49/person-2579938_960_720.jpg" },
  },
  {
    id: 8,
    image: "https://cdn.pixabay.com/photo/2015/11/05/15/18/buddha-1024347_960_720.jpg",
    title: "Leh-Ladakh: A Road Trip to Remember",
    city: "Leh, India",
    subtitle: "Journey through high-altitude deserts, pristine lakes, and Buddhist monasteries in the land of high passes.",
    category: "Travel",
    author: { name: "Rohan Desai", avatar: "https://cdn.pixabay.com/photo/2017/08/04/11/49/person-2579938_960_720.jpg" },
  },
  {
    id: 9,
    image: "https://cdn.pixabay.com/photo/2013/09/27/17/54/church-187468_1280.jpg",
    title: "Darjeeling: Tea Gardens and Mountain Views",
    city: "Darjeeling, India",
    subtitle: "Sip tea while watching the sunrise over the Himalayas and explore the colonial charm of this hill station.",
    category: "Food",
    author: { name: "Sneha Chatterjee", avatar: "https://cdn.pixabay.com/photo/2017/08/04/11/49/person-2579938_960_720.jpg" },
  },
  {
    id: 10,
    image: "https://cdn.pixabay.com/photo/2017/03/30/04/14/house-2187170_1280.jpg",
    title: "Udaipur: The City of Lakes and Palaces",
    city: "Udaipur, India",
    subtitle: "Experience the romance of floating palaces, colorful bazaars, and the cultural richness of Rajasthan.",
    category: "Culture",
    author: { name: "Devansh Mehta", avatar: "https://cdn.pixabay.com/photo/2017/08/04/11/49/person-2579938_960_720.jpg" },
  },
  {
    id: 11,
    image: "https://cdn.pixabay.com/photo/2014/08/15/18/09/gandria-418953_960_720.jpg",
    title: "Hampi: Ruins of a Forgotten Empire",
    city: "Hampi, India",
    subtitle: "Walk through ancient ruins, boulder-strewn landscapes, and relive the glory of the Vijayanagara Empire.",
    category: "History",
    author: { name: "Aisha Khan", avatar: "https://cdn.pixabay.com/photo/2017/08/04/11/49/person-2579938_960_720.jpg" },
  },
  {
    id: 12,
    image: "https://cdn.pixabay.com/photo/2015/11/05/15/18/buddha-1024347_960_720.jpg",
    title: "Rishikesh: Yoga, Ganges, and Adventure",
    city: "Rishikesh, India",
    subtitle: "Find your inner peace with yoga sessions, white-water rafting, and the spiritual energy of the Ganges.",
    category: "Hidden Places",
    author: { name: "Yash Agarwal", avatar: "https://cdn.pixabay.com/photo/2017/08/04/11/49/person-2579938_960_720.jpg" },
  },

]

const PAGE_SIZE = 6

export default function StoriesList() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedCity, setSelectedCity] = useState("All")
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  /* ---------- FILTER OPTIONS ---------- */
  const categories = ["All", ...Array.from(new Set(stories.map(s => s.category)))]
  const cities = ["All", ...Array.from(new Set(stories.map(s => s.city)))]

  /* ---------- FILTER LOGIC ---------- */
  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      const categoryMatch =
        selectedCategory === "All" || story.category === selectedCategory

      const cityMatch =
        selectedCity === "All" || story.city === selectedCity

      return categoryMatch && cityMatch
    })
  }, [selectedCategory, selectedCity])

  const visibleStories = filteredStories.slice(0, visibleCount)

  return (
    <section className="py-10 lg:py-14">
      <div className="container mx-auto px-4">

        {/* ================= FILTER BAR ================= */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          {/* Category Chips */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat)
                  setVisibleCount(PAGE_SIZE)
                }}
                className={`whitespace-nowrap rounded-full border border-gray-300 px-4 py-2 text-sm font-medium transition ${
                  selectedCategory === cat
                    ? "bg-accent text-black"
                    : "bg-white  text-gray-900 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* City Dropdown */}
          <select
            value={selectedCity}
            onChange={(e) => {
              setSelectedCity(e.target.value)
              setVisibleCount(PAGE_SIZE)
            }}
            className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm outline-none focus:border-accent"
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* ================= EMPTY STATE ================= */}
        {filteredStories.length === 0 && (
          <div className="py-20 text-center">
            <h3 className="font-heading text-xl font-semibold text-textDark">
              No stories found
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Try changing category or place.
            </p>
          </div>
        )}

        {/* ================= STORIES ================= */}
        {filteredStories.length > 0 && (
          <>
            {/* Desktop */}
            <div className="hidden lg:grid grid-cols-3 gap-6">
              {visibleStories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>

            {/* Mobile */}
            <div className="space-y-4 lg:hidden">
              {visibleStories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>

            {/* Load More */}
            {visibleCount < filteredStories.length && (
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
  )
}
