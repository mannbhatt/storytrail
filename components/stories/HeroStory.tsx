 "use client"

 import { Search } from "lucide-react"
 import React from "react"

 const categories = ["All", "Travel", "Culture", "History", "Legends", "Food"]

 export default function Hero() {
   return (
     <section className="relative w-full bg-black text-white">
       <div className="relative h-[340px] lg:h-[450px]">
         <img
           src="https://cdn.pixabay.com/photo/2022/06/13/14/58/road-7260175_1280.jpg"
           alt="Stories across India"
           className="h-full w-full object-cover object-[50%_40%]"
         />

         {/* Gradient overlay for readability */}
         <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        <div className="absolute inset-0 flex flex-col items-center justify-center pt-[64px]  px-4 text-center">
          <h1 className="font-heading text-white text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
             Stories from Across <span className="text-accent">India</span>
           </h1>
          <p className="mt-3 max-w-2xl text-base text-gray-200 sm:text-lg hidden lg:block">
             Real experiences, legends, and moments shared by people
           </p>

           {/* Search Bar */}
          <div className="mt-6 w-full max-w-3xl px-2 sm:px-4 hidden lg:block">
             <div className="relative">
               <input
                 type="text"
                 placeholder="Search stories, places, cultures or experiences"
                 className="h-12 w-full rounded-full border border-white/15 bg-white/95 pr-12 pl-5 text-sm text-gray-900 shadow-lg outline-none placeholder:text-gray-500 backdrop-blur transition focus:border-accent focus:ring-2 focus:ring-accent/60"
               />
               <Search className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-600" />
             </div>
           </div>

          {/* Category Chips */}
          {/* Swiper Chips for small/medium screens (sm/md) 
          <div className="mt-5 w-full max-w-3xl overflow-x-auto px-2 sm:px-4 block lg:hidden scrollbar-hide">
            <div className="flex items-center gap-2 sm:gap-3 min-w-max">
              {categories.map((category, index) => {
                const isActive = index === 0
                return (
                  <button
                    key={category}
                    className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? "bg-accent text-white shadow-lg"
                        : "bg-white/15 text-white hover:bg-white/25"
                    }`}
                  >
                    {category}
                  </button>
                )
              })}
            </div>
          </div>
          
          {/* Static centered chips for large screens (lg and up) 
          <div className="mt-5 w-full max-w-3xl px-2 sm:px-4 hidden lg:block">
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              {categories.map((category, index) => {
                const isActive = index === 0
                return (
                  <button
                    key={category}
                    className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? "bg-accent text-white shadow-lg"
                        : "bg-white/15 text-white hover:bg-white/25"
                    }`}
                  >
                    {category}
                  </button>
                )
              })}
            </div>
          </div>
          */}
         </div>
       </div>
     </section>
   )
 }
