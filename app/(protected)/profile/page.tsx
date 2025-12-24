import { supabaseServer } from "@/lib/supabase/server"
import UserProfile from "./profileClient"

export default async function ProfilePage() {
  const supabase = supabaseServer()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // session is GUARANTEED here
  /*const { data: stories } = await supabase
    .from("stories")
    .select("id, title, city, subtitle, image")
    .eq("user_id", session!.user.id)
    .order("created_at", { ascending: false })
*/
const stories= [
  {
    id: 1,
    image: "https://cdn.pixabay.com/photo/2014/08/15/18/09/gandria-418953_960_720.jpg",
    title: "A Journey Through the Himalayas: Finding Peace in the Mountains",
    city: "Manali, India",
    subtitle:
      "Discover the breathtaking beauty of snow-capped peaks and serene valleys that will leave you speechless.",
    
  },
  {
    id: 2,
    image: "https://cdn.pixabay.com/photo/2013/09/27/17/54/church-187468_1280.jpg",
    title: "Island Hopping in Andaman: A Tropical Paradise Awaits",
    city: "Port Blair, India",
    subtitle: "Crystal clear waters, pristine beaches, and unforgettable sunsets make this the perfect getaway.",
    
  },
  {
    id: 3,
    image: "https://cdn.pixabay.com/photo/2015/11/05/15/18/buddha-1024347_960_720.jpg",
    title: "Rajasthan Diaries: Tales from the Golden Desert",
    city: "Jaisalmer, India",
    subtitle: "Experience the magic of desert life with camel safaris, ancient forts, and vibrant culture.",
    
  },
  {
    id: 4,
    image: "https://cdn.pixabay.com/photo/2017/03/30/04/14/house-2187170_1280.jpg",
    title: "Kerala Backwaters: A Peaceful Journey Through Nature",
    city: "Alleppey, India",
    subtitle: "Cruise through serene backwaters, lush greenery, and traditional villages on a houseboat.",
    
  },
  {
    id: 5,
    image: "https://cdn.pixabay.com/photo/2013/09/27/17/54/church-187468_1280.jpg",
    title: "Spiritual Awakening in Varanasi: A Soul Journey",
    city: "Varanasi, India",
    subtitle: "Witness ancient rituals, spiritual ceremonies, and the timeless beauty of the holy city.",
    
  },
  {
    id: 6,
    image: "https://cdn.pixabay.com/photo/2017/03/30/04/14/house-2187170_1280.jpg",
    title: "Goa Vibes: Where Beach Meets Culture",
    city: "Goa, India",
    subtitle: "From vibrant nightlife to peaceful beaches, discover the dual charm of this coastal paradise.",
    
  },
]
  return (
    <UserProfile
      user={session!.user}
      stories={stories ?? []}
    />
  )
}
