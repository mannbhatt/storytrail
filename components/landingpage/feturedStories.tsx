"use client"
import StoryCard from "./StoryCard"

interface Story {
  id: number
  image: string
  title: string
  city: string
  subtitle: string
  author: {
    name: string
    avatar: string
  }
}

const stories: Story[] = [
  {
    id: 1,
    image: "https://cdn.pixabay.com/photo/2014/08/15/18/09/gandria-418953_960_720.jpg",
    title: "A Journey Through the Himalayas: Finding Peace in the Mountains",
    city: "Manali, India",
    subtitle:
      "Discover the breathtaking beauty of snow-capped peaks and serene valleys that will leave you speechless.",
    author: {
      name: "Priya Sharma",
      avatar: "https://cdn.pixabay.com/photo/2017/08/04/11/49/person-2579938_960_720.jpg",
    },
  },
  {
    id: 2,
    image: "https://cdn.pixabay.com/photo/2013/09/27/17/54/church-187468_1280.jpg",
    title: "Island Hopping in Andaman: A Tropical Paradise Awaits",
    city: "Port Blair, India",
    subtitle: "Crystal clear waters, pristine beaches, and unforgettable sunsets make this the perfect getaway.",
    author: {
      name: "Rahul Verma",
      avatar: "https://cdn.pixabay.com/photo/2017/08/04/11/49/person-2579938_960_720.jpg",
    },
  },
  {
    id: 3,
    image: "https://cdn.pixabay.com/photo/2015/11/05/15/18/buddha-1024347_960_720.jpg",
    title: "Rajasthan Diaries: Tales from the Golden Desert",
    city: "Jaisalmer, India",
    subtitle: "Experience the magic of desert life with camel safaris, ancient forts, and vibrant culture.",
    author: {
      name: "Ananya Singh",
      avatar: "https://cdn.pixabay.com/photo/2017/08/04/11/49/person-2579938_960_720.jpg",
    },
  },
  {
    id: 4,
    image: "https://cdn.pixabay.com/photo/2017/03/30/04/14/house-2187170_1280.jpg",
    title: "Kerala Backwaters: A Peaceful Journey Through Nature",
    city: "Alleppey, India",
    subtitle: "Cruise through serene backwaters, lush greenery, and traditional villages on a houseboat.",
    author: {
      name: "Vikram Patel",
      avatar: "https://cdn.pixabay.com/photo/2017/08/04/11/49/person-2579938_960_720.jpg",
    },
  },
  {
    id: 5,
    image: "https://cdn.pixabay.com/photo/2013/09/27/17/54/church-187468_1280.jpg",
    title: "Spiritual Awakening in Varanasi: A Soul Journey",
    city: "Varanasi, India",
    subtitle: "Witness ancient rituals, spiritual ceremonies, and the timeless beauty of the holy city.",
    author: {
      name: "Meera Kapoor",
      avatar: "https://cdn.pixabay.com/photo/2017/08/04/11/49/person-2579938_960_720.jpg",
    },
  },
  {
    id: 6,
    image: "https://cdn.pixabay.com/photo/2017/03/30/04/14/house-2187170_1280.jpg",
    title: "Goa Vibes: Where Beach Meets Culture",
    city: "Goa, India",
    subtitle: "From vibrant nightlife to peaceful beaches, discover the dual charm of this coastal paradise.",
    author: {
      name: "Arjun Malhotra",
      avatar: "https://cdn.pixabay.com/photo/2017/08/04/11/49/person-2579938_960_720.jpg",
    },
  },
]

export default function FeaturedStories() {
  return (
    <section className=" py-12 lg:py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-8 text-center lg:mb-12">
          <h2 className="font-heading  font-semibold traking-wide text-textDark text-2xl lg:text-4xl">Featured Stories</h2>
          <p className="mt-2 text-sm text-gray-600 lg:text-base">Hand-picked stories loved by travelers</p>
        </div>

        {/* Desktop Grid Layout (3 columns) - Hidden on mobile */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>

        {/* Mobile List Layout - Visible only on mobile */}
        <div className="space-y-4 lg:hidden">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </div>
    </section>
  )
}
