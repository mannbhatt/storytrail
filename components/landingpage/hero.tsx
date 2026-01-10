"use client"

import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
export default function Hero() {
   const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/stories?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }
  return (
   <> <section className="relative bg-white">
      <div className="relative h-[340px] lg:h-[450px]">
        {/* Background Image */}
        <img
          src="https://cdn1.tripoto.com/assets/2.9/img/home_banner_road.jpg"
          alt="Home Page Banner"
          className="w-full h-full object-cover object-[50%_30%]"
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-[64px] px-4">
          <h1 className="text-white font-heading text-2xl lg:text-4xl xl:text-4xl  tracking-wide  font-semibold text-center   sm:mb-0 md:mb-0 lg:mb-6">
            Discover <del><span className="text-accent">Hidden</span></del> Stories  in Every Place
          </h1>

          {/* Search Bar - Desktop Only */}
          <div className="hidden lg:block w-full max-w-[700px]">
  <div className="relative">
    <div className="flex items-center bg-white border rounded-md shadow-lg h-[48px] px-5">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search stories, places, legends or experiences"
         value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="
          flex-1 
          text-textDark 
          placeholder:text-gray-800 
          text-base 
          outline-none 
          bg-transparent
        "
      />

      {/* Search Button */}
      <button
     onClick={handleSearch}
        className=""
        aria-label="Search"
      >
        <Search className="w-5 h-5 text-gray-800 font-bold" />
      </button>
    </div>
  </div>
</div>


        </div>
      </div>
    </section>
   
    </>    
  )
}
