"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Pen, ArrowRight, BookOpen } from "lucide-react"
import StoryCard from "@/components/stories/StoryCard"
import Hero from "@/components/stories/HeroStory"
import TrendingStoryItem from "@/components/stories/TrendingStoryItem"
import PlaceCard from "@/components/stories/PlaceCard"
import StoriesList from "@/components/stories/StoriesList"
interface Story {
  id: number
  image: string
  title: string
  city: string
  subtitle: string
  category?: string
  author: {
    name: string
    avatar: string
  }
}

interface Place {
  id: number
  name: string
  state: string
  image: string
  storyCount: number
}

// Mock Data
const allStories: Story[] = [
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

const places: Place[] = [
  { id: 1, name: "Goa", state: "Goa", image: "https://cdn.pixabay.com/photo/2017/03/30/04/14/house-2187170_1280.jpg", storyCount: 24 },
  { id: 2, name: "Kerala", state: "Kerala", image: "https://cdn.pixabay.com/photo/2017/03/30/04/14/house-2187170_1280.jpg", storyCount: 18 },
  { id: 3, name: "Rajasthan", state: "Rajasthan", image: "https://cdn.pixabay.com/photo/2015/11/05/15/18/buddha-1024347_960_720.jpg", storyCount: 32 },
  { id: 4, name: "Himachal Pradesh", state: "Himachal Pradesh", image: "https://cdn.pixabay.com/photo/2014/08/15/18/09/gandria-418953_960_720.jpg", storyCount: 21 },
  { id: 5, name: "Uttarakhand", state: "Uttarakhand", image: "https://cdn.pixabay.com/photo/2015/11/05/15/18/buddha-1024347_960_720.jpg", storyCount: 19 },
  { id: 6, name: "Varanasi", state: "Uttar Pradesh", image: "https://cdn.pixabay.com/photo/2013/09/27/17/54/church-187468_1280.jpg", storyCount: 15 },
  { id: 7, name: "Kolkata", state: "West Bengal", image: "https://cdn.pixabay.com/photo/2014/08/15/18/09/gandria-418953_960_720.jpg", storyCount: 12 },
  { id: 8, name: "Mumbai", state: "Maharashtra", image: "https://cdn.pixabay.com/photo/2017/03/30/04/14/house-2187170_1280.jpg", storyCount: 28 },
]

const categories = {
  Travel: "Explore journeys and adventures across India",
  Culture: "Discover local traditions, festivals, and customs",
  Food: "Taste the flavors and culinary heritage of India",
  History: "Uncover stories from India's rich historical past",
  Nature: "Experience the natural beauty and landscapes",
  "Hidden Places": "Find secret gems off the beaten path",
}

export default function StoriesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  // Filter stories based on search and category
  const filteredStories = useMemo(() => {
    return allStories.filter((story) => {
      const matchesSearch =
        searchQuery === "" ||
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.city.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === "" || story.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  // Featured stories (first 6)
  const featuredStories = allStories.slice(0, 6)

  // Trending stories (for sidebar)
  const trendingStories = allStories.slice(0, 5)

  // Stories by category
  const storiesByCategory = Object.keys(categories).reduce((acc, category) => {
    acc[category] = allStories.filter((s) => s.category === category).slice(0, 3)
    return acc
  }, {} as Record<string, Story[]>)

  return (
    <div className="min-h-screen bg-background">
       <Hero/>
        <StoriesList/>
     
     {/* <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 lg:mb-12">
            <h2 className="font-heading text-2xl lg:text-4xl font-semibold text-textDark text-center mb-2">
              Featured Stories
            </h2>
            <p className="text-center text-gray-600">Hand-picked stories loved by travelers</p>
          </div>

          
          <div className="hidden lg:grid lg:grid-cols-3 gap-6">
            {featuredStories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>

         
          <div className="lg:hidden overflow-x-auto pb-4 -mx-4 px-4">
            <div className="flex gap-4 min-w-max">
              {featuredStories.map((story) => (
                <div key={story.id} className="w-80 flex-shrink-0">
                  <StoryCard story={story} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    
      <div className="container mx-auto px-4 pb-12 lg:pb-16">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          
          <div className="lg:col-span-3">
          
            {Object.entries(storiesByCategory)
              .filter(([_, stories]) => stories.length > 0)
              .map(([category, stories]) => (
                <section key={category} className="mb-12 lg:mb-16">
                  <div className="mb-6">
                    <h3 className="font-heading text-xl lg:text-3xl font-semibold text-textDark mb-2">{category}</h3>
                    <p className="text-gray-600 text-sm lg:text-base">{categories[category as keyof typeof categories]}</p>
                  </div>

                 
                  <div className="hidden lg:grid lg:grid-cols-3 gap-6">
                    {stories.map((story) => (
                      <StoryCard key={story.id} story={story} />
                    ))}
                  </div>

                 
                  <div className="space-y-4 lg:hidden">
                    {stories.map((story) => (
                      <StoryCard key={story.id} story={story} />
                    ))}
                  </div>
                </section>
              ))}
          </div>

         
          <div className="lg:col-span-1">
          
            <section className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="w-5 h-5 text-primary" />
                <h3 className="font-heading text-xl font-semibold text-textDark">Trending Stories</h3>
              </div>

              <div className="space-y-1">
                {trendingStories.map((story, index) => (
                  <TrendingStoryItem key={story.id} story={story} rank={index + 1} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      
      <section className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-8 lg:mb-12 text-center">
            <h2 className="font-heading text-2xl lg:text-4xl font-semibold text-textDark mb-2">
              Explore Stories by Place
            </h2>
            <p className="text-gray-600">Discover stories from cities and villages across India</p>
          </div>

          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {places.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        </div>
      </section>*/}

      {/* 6️⃣ COMMUNITY CTA SECTION */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary to-primaryDark rounded-3xl shadow-xl p-8 lg:p-12 text-center text-white">
            <h2 className="font-heading text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-6">
              Every Place Has a Story
            </h2>
            <p className="text-lg lg:text-xl text-blue-100 mb-8 lg:mb-10 max-w-2xl mx-auto">
              Share your local story and help preserve culture and memories for future generations
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/write"
                className="inline-flex items-center justify-center gap-2 bg-accent text-textDark px-8 py-4 rounded-full font-semibold text-base lg:text-lg hover:bg-yellow-400 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Pen className="w-5 h-5" />
                Share Your Story
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-full font-semibold text-base lg:text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                Join the Community
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
