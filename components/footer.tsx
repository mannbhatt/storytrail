"use client"

import { useState,useEffect } from "react"
import { useRouter } from "next/navigation"
import { Instagram, Facebook, Twitter, Youtube, Linkedin, ChevronDown, Heart } from "lucide-react"
interface Category {
  id: number
  name: string
  slug: string
}
interface Location {
  id: number
  city: string
  state: string
}
export default function Footer() {
  const router = useRouter()
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})
  const [categories, setCategories] = useState<Category[]>([])
  const [locations, setLocations] = useState<Location[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
 useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      
      const [categoriesRes, locationsRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/categories`),
        fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/locations`)
      ]);
      if (!categoriesRes.ok || !locationsRes.ok) {
        throw new Error('Failed to fetch data');
      }
      const categoriesData = await categoriesRes.json();
      const locationsData = await locationsRes.json();
      
      setCategories(categoriesData.categories || []);
      setLocations(locationsData.locations || []);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);
  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }
  const handleCategoryClick = (categoryId: number) => {
    router.push(`/stories?category=${categoryId}`)
  }
  const handleLocationClick = (locationId: number) => {
    router.push(`/stories?location=${locationId}`)
  }
 
  // Show loading state
  if (loading) {
    return (
      <footer className="bg-primary text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-8">Loading...</div>
        </div>
      </footer>
    )
  }
  // Show error state
  if (error) {
    return (
      <footer className="bg-primary text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-8 text-red-300">{error}</div>
        </div>
      </footer>
    )
  }
 

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 md:mb-12 pb-8 border-b border-gray-700">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            {/* Logo and Description */}
            <div className="max-w-md">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-2xl font-bold font-heading text-white">StoryTrail</h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                Discover hidden stories from every place. Connect with local cultures, explore heritage sites, and share
                your travel experiences with a vibrant community of storytellers.
              </p>
            </div>

            {/* Social Media Section */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-white uppercase tracking-wide">Follow Us</h4>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-700 hover:bg-accent flex items-center justify-center transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-700 hover:bg-accent flex items-center justify-center transition-all"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-700 hover:bg-accent flex items-center justify-center transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-700 hover:bg-accent flex items-center justify-center transition-all"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-700 hover:bg-accent flex items-center justify-center transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-8">
          {/* About Section */}
          <div className="border-b border-gray-700 md:border-none pb-4 md:pb-0">
            <button
              onClick={() => toggleSection("about")}
              className="flex items-center justify-between w-full md:cursor-default"
            >
              <h4 className="text-base font-semibold font-heading mb-0 md:mb-4">About</h4>
              <ChevronDown
                className={`w-5 h-5 md:hidden transition-transform ${openSections["about"] ? "rotate-180" : ""}`}
              />
            </button>
            <nav className={`${openSections["about"] ? "block" : "hidden"} md:block mt-3 md:mt-0`}>
              <ul className="space-y-2">
                <li>
                  <a href="/about" className="text-sm text-gray-300 hover:text-accent transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="https://www.clueless.builders/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-300 hover:text-accent transition-colors">
                    Our Team
                  </a>
                </li>
                <li>
                  <a href="/about#howitworks" className="text-sm text-gray-300 hover:text-accent transition-colors">
                  How It Works
                  </a>
                </li>
                
                <li>
                  <a href="/about#contact" className="text-sm text-gray-300 hover:text-accent transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Categories Section */}
          <div className="border-b border-gray-700 md:border-none pb-4 md:pb-0">
            <button
              onClick={() => toggleSection("categories")}
              className="flex items-center justify-between w-full md:cursor-default"
            ><h4 className="text-base font-semibold font-heading mb-4">Categories</h4> <ChevronDown
                className={`w-5 h-5 md:hidden transition-transform ${openSections["categories"] ? "rotate-180" : ""}`}
              /></button>
               <nav className={`${openSections["categories"] ? "block" : "hidden"} md:block mt-3 md:mt-0`}>
              <ul className="space-y-2">
                {categories.slice(0, 5).map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => handleCategoryClick(category.id)}
                      className="text-sm text-gray-300 hover:text-accent transition-colors text-left w-full"
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
              </nav>
            </div>

          {/* Places Section */}
          <div className="border-b border-gray-700 md:border-none pb-4 md:pb-0">
            <button
              onClick={() => toggleSection("places")}
              className="flex items-center justify-between w-full md:cursor-default"
            >
              <h4 className="text-base font-semibold font-heading mb-0 md:mb-4">Popular Places</h4>
              <ChevronDown
                className={`w-5 h-5 md:hidden transition-transform ${openSections["places"] ? "rotate-180" : ""}`}
              />
            </button>
            <nav className={`${openSections["places"] ? "block" : "hidden"} md:block mt-3 md:mt-0`}>
              <ul className="space-y-2">
                {locations.slice(0, 5).map((location) => (
                  <li key={location.id}>
                    <button
                      onClick={() => handleLocationClick(location.id)}
                      className="text-sm text-gray-300 hover:text-accent transition-colors text-left w-full"
                    >
                      {`${location?.city}, ${location?.state}`}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Community Section */}
          <div className="border-b border-gray-700 md:border-none pb-4 md:pb-0">
            <button
              onClick={() => toggleSection("community")}
              className="flex items-center justify-between w-full md:cursor-default"
            >
              <h4 className="text-base font-semibold font-heading mb-0 md:mb-4">Community</h4>
              <ChevronDown
                className={`w-5 h-5 md:hidden transition-transform ${openSections["community"] ? "rotate-180" : ""}`}
              />
            </button>
            <nav className={`${openSections["community"] ? "block" : "hidden"} md:block mt-3 md:mt-0`}>
              <ul className="space-y-2">
                <li>
                  <a href="/write-story" className="text-sm text-gray-300 hover:text-accent transition-colors">
                    Write a Story
                  </a>
                </li>
                 <li>
                  <a href="/about#ourvision" className="text-sm text-gray-300 hover:text-accent transition-colors">
                   Our Vision
                  </a>
                </li>
                <li>
                  <a href="/about#community" className="text-sm text-gray-300 hover:text-accent transition-colors">
                    Become a Contributor
                  </a>
                </li>
                <li>
                  <a href="/about#top-contributors" className="text-sm text-gray-300 hover:text-accent transition-colors">
                    Top Contributors
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
            <p className="text-sm text-gray-300 text-center md:text-left">© 2025 StoryTrail. All rights reserved.</p>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <a href="/privacy" className="text-gray-300 hover:text-accent transition-colors">
                Privacy Policy
              </a>
              <span className="text-gray-300">|</span>
              <a href="/terms" className="text-gray-300 hover:text-accent transition-colors">
                Terms of Service
              </a>
              <span className="text-gray-300">|</span>
              <a href="/cookie-policy" className="text-gray-300 hover:text-accent transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>

          {/* Heritage Message */}
          <div className="flex items-center justify-center gap-2 text-center">
            <p className="text-sm text-gray-300 flex items-center gap-2">
              Made with <Heart className="w-4 h-4 fill-red-500 text-red-500" /> for preserving local heritage and
              cultural stories
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
