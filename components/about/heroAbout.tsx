"use client";

export default function HeroAbout() {
  return (
    <section className="relative w-full bg-black text-white">
      <div className="relative h-[340px] lg:h-[450px]">
        <img          src="https://cdn.pixabay.com/photo/2022/05/28/21/44/carpathians-7228042_1280.jpg"
          alt="Stories across India"
          className="h-full w-full object-cover object-[50%_40%]"
        />

        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        <div className="absolute inset-0 flex flex-col items-center justify-center pt-[64px]  px-4 text-center">
          <h1 className="font-heading text-white text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            About <span className="text-accent">Us</span>
          </h1>
          <p className="mt-3 max-w-2xl text-base text-gray-200 sm:text-lg hidden lg:block">
           A community-driven platform for discovering and sharing local stories, cultural heritage, and places that shape our cities and lives.
          </p>

          {/* Search Bar */}
          

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
  );
}
