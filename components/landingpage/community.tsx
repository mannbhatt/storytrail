"use client"

import { MapPin, Users, Heart, Compass,Share, BookOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
const topContributors = [
  {
    id: 1,
    name: "Sophia Patel",
    location: "Mumbai, Maharashtra",
    storiesCount: 24,
    image: "https://cdn.pixabay.com/photo/2016/11/08/15/21/user-1808597_1280.png",
    rank: 1,
  },
  {
    id: 2,
    name: "Rohan Jain",
    location: "Jaipur, Rajasthan",
    storiesCount: 18,
    image: "https://cdn.pixabay.com/photo/2016/11/08/15/21/user-1808597_1280.png",
    rank: 2,
  },
  {
    id: 3,
    name: "Aishwarya Bhaskar",
    location: "Kochi, Kerala",
    storiesCount: 15,
    image: "https://cdn.pixabay.com/photo/2016/11/08/15/21/user-1808597_1280.png",
    rank: 3,
  },
  {
    id: 4,
    name: "Sahil Singh",
    location: "Varanasi, UP",
    storiesCount: 12,
    image: "https://cdn.pixabay.com/photo/2016/11/08/15/21/user-1808597_1280.png",
    rank: 4,
  },
]

export default function CommunityEngagement() {
  return (
    <section className="py-12 lg:py-16 " >
      <div className="container mx-auto  px-4 lg:px-8 max-w-[82rem]">
        {/* Section 1: Share Your Local Story */}
        <div id="community" className="mb-24 lg:mb-32 bg-primary rounded-3xl shadow-lg overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center p-8 lg:p-12">
            {/* Left: Text + Buttons */}
            <div className="text-center lg:text-left space-y-6">
              <h2 className=" text-2xl lg:text-4xl font-semibold text-white text-balance">
                Share Your Local Story
              </h2>
              <div className="space-y-4 text-lg text-white">
                <p className="text-pretty">Every place has a story. Share yours with the world.</p>
                <p className="text-pretty">No writing experience needed — just tell it like you would to a friend.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Link href="/write-story" className="flex items-center gap-2 bg-primaryDark hover:bg-primaryDark text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Share className="w-4 h-4 font-seminbold text-white" />Share a Story
                </Link>
                <Link href="/about#howitworks" className="bg-accent hover:bg-yellow-400 text-textDark border-2 border-accent font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105">
                  Learn How It Works
                </Link>
              </div>
            </div>

            {/* Right: Illustration */}
            <div className="relative h-64  lg:h-80">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full rounded-3xl max-w-md">
                  <Image src="/shareYourStory.jpg" alt="Share your story" fill className="object-contain rounded-3xl" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Join Our Community */}
        <div className="mb-24 lg:mb-32 text-center">
          <h3 className="font-heading text-2xl lg:text-4xl font-semibold text-textDark mb-6">Join Our Community</h3>
          <p className="text-lg text-slate-600 mb-12 max-w-3xl mx-auto text-pretty">
            Become a Story Contributor and help preserve local history and culture.
          </p>

          {/* Icon Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center space-y-3 p-6 rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <span className="font-semibold text-textDark">Culture</span>
            </div>

            <div className="flex flex-col items-center space-y-3 p-6 rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <span className="font-semibold text-textDark">Heritage</span>
            </div>

            <div className="flex flex-col items-center space-y-3 p-6 rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <span className="font-semibold text-textDark">Community</span>
            </div>

            <div className="flex flex-col items-center space-y-3 p-6 rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Compass className="w-8 h-8 text-primary" />
              </div>
              <span className="font-semibold text-textDark">Travel</span>
            </div>
          </div>
        </div>

        {/* Section 3: Top Contributors This Month */}
        <div id="top-contributors">
          <h3 className="font-heading text-3xl lg:text-4xl font-semibold text-textDark mb-12 text-center">
            Top Contributors This Month
          </h3>

          {/* Desktop: Grid */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-6">
            {topContributors.map((contributor) => (
              <ContributorCard key={contributor.id} contributor={contributor} />
            ))}
          </div>

          {/* Mobile: Horizontal Scroll */}
          <div className="lg:hidden overflow-x-auto pb-4 -mx-4 px-4">
            <div className="flex gap-4 min-w-max">
              {topContributors.map((contributor) => (
                <div key={contributor.id} className="w-72">
                  <ContributorCard contributor={contributor} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContributorCard({
  contributor,
}: {
  contributor: {
    id: number
    name: string
    location: string
    storiesCount: number
    image: string
    rank: number
  }
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 p-6 text-center">
      {/* Rank Badge */}
      <div className="flex justify-center mb-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-accent text-textDark">
          ⭐ #{contributor.rank} Top Contributor
        </span>
      </div>

      {/* Profile Image */}
      <div className="relative w-24 h-24 mx-auto mb-4">
        <Image
          src={contributor.image || "/placeholder.svg"}
          alt={contributor.name}
          fill
          className="rounded-full object-cover ring-4 ring-primary/20"
        />
      </div>

      {/* Contributor Info */}
      <h4 className="font-heading text-xl font-semibold text-textDark mb-2 line-clamp-1">{contributor.name}</h4>
      <div className="flex items-center justify-center text-sm text-textDark mb-3">
        <MapPin className="w-4 h-4 mr-1" />
        <span className="line-clamp-1">{contributor.location}</span>
      </div>

      {/* Stories Count */}
      <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm">
        {contributor.storiesCount} Stories
      </div>
    </div>
  )
}
