"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Pen, ArrowRight, BookOpen } from "lucide-react"
import Hero from "@/components/stories/HeroStory"
import StoriesList from "@/components/stories/StoriesList"

export default function StoriesPage() {
 
  return (
    <div className="min-h-screen bg-background">
       <Hero/>
        <StoriesList/>       
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
