"use client"

import HeroAbout from "@/components/about/heroAbout";
import { ArrowRight,MapPin,Archive, Lightbulb, Users, BookOpen, Share2, Globe, Search } from "lucide-react"
import Community from "@/components/landingpage/community";
import Link from "next/link"

export default function AboutPage() {
  
  
  return (
    <div style={{ backgroundColor: "var(--color-bg)" }}>
      <section className="relative bg-white">
      <HeroAbout/>
      </section>

      {/* Intro Section */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container-max">
          <div className="space-y-6 text-lg text-justify leading-relaxed" style={{ color: "var(--color-text)" }}>
            <p>
              StoryTrail is more than a travel platform—it&apos;s a digital archive of human experience. Founded on the
              belief that the most meaningful travel comes from understanding the people, cultures, and histories of
              places we visit, StoryTrail connects storytellers with curious travelers.
            </p>
            <p>
              Whether you&apos;re a local sharing centuries-old traditions, a historian documenting forgotten heritage,
              or a traveler seeking authentic experiences, StoryTrail is your platform to discover, learn, and preserve
              the stories that matter.
            </p>
          </div>
        </div>
      </section>

      {/* Why We Exist */}
     

      {/* What You'll Find Here */}
    
         <section id="ourvision" className="py-16 lg:py-20" style={{ backgroundColor: "var(--color-bg)" }}>
        <div className="container-max max-w-3xl">
          <h2
            className="font-heading text-3xl lg:text-4xl font-semibold text-center mb-8 text-balance"
            style={{ color: "var(--color-text)" }}
          >
            Our Vision
          </h2>

          <div className="space-y-6 text-lg text-justify leading-relaxed" style={{ color: "var(--color-text)", opacity: 0.85 }}>
            <p>
              We envision a world where every person—regardless of their background or location—can share their story
              and be heard. Where cultural traditions are documented and celebrated, not forgotten. Where travelers
              don&apos;t just visit places; they understand them.
            </p>
            <p>
              In the next decade, StoryTrail will be the world&apos;s largest collaborative archive of local stories,
              traditions, and heritage. We&apos;ll have empowered millions of storytellers, connected billions of
              curious minds, and helped preserve the irreplaceable cultural narratives of our time.
            </p>
            <p>
              But this vision only works with you. Whether you&apos;re here to read, write, or both—you&apos;re part of
              keeping our world&apos;s stories alive.
            </p>
          </div>
        </div>
      </section>

<section className="py-16 lg:py-20   bg-primary">
        <div className="container-max ">
          <h2
            className="font-heading text-3xl text-white lg:text-4xl font-semibold text-center mb-4 text-balance"
            
          >
            Why We Exist
          </h2>
          <p className="text-center mb-12 text-lg text-white" >
            We saw a gap in how stories are shared. Here&apos;s what drives us.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="card p-8 hover:shadow-lg transition-shadow">
              <div
                className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors"
                
              >
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
                Preserve Local Heritage
              </h3>
              <p className="text-justify" style={{ color: "var(--color-text)", opacity: 0.7 }}>
                Cultural traditions and local stories fade without documentation. We create a permanent, accessible
                record of the places and people that make our world rich.
              </p>
            </div>

            {/* Card 2 */}
            <div className="card p-8 hover:shadow-lg transition-shadow">
              <div
                className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors"
                
              >
                <Users className="w-6 h-6" style={{ color: "var(--color-primary)" }} />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
                Connect Authentic Voices
              </h3>
              <p className="text-justify" style={{ color: "var(--color-text)", opacity: 0.7 }}>
                Travelers are tired of generic itineraries. We connect them directly with locals and historians who
                share genuine, insider perspectives on places.
              </p>
            </div>

            {/* Card 3 */}
            <div className="card p-8 hover:shadow-lg transition-shadow">
              <div
                className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors"
                
              >
                <Lightbulb className="w-6 h-6 " style={{ color: "var(--color-primary)" }} />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-3" style={{ color: "var(--color-text)" }}>
                Empower Storytellers
              </h3>
              <p className="text-justify" style={{ color: "var(--color-text)", opacity: 0.7 }}>
                Everyone has a story worth sharing. We remove barriers and make it easy for anyone—regardless of writing
                experience—to contribute their knowledge and experiences.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* How Stories Work */}
   <section id="howitworks" className="py-16 lg:py-20  relative overflow-hidden">
  {/* Decorative background elements */}
  <div className="absolute inset-0 opacity-5">
    <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl"></div>
    <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl"></div>
  </div>

  <div className="container-max px-4 sm:px-6 relative z-10">
    <div className="text-center max-w-3xl mx-auto mb-16">
      <span className="inline-block px-4 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">
        Our Process
      </span>
      <h2 className="text-3xl md:text-4xl font-heading font-semibold text-gray-900 mb-4">
        How Stories Work
      </h2>
      <p className="text-lg text-gray-600">
        Simple steps to share your story and connect with a global audience
      </p>
    </div>

    <div className="relative">
      {/* Progress line */}
      <div className="hidden md:block absolute top-16 left-1/2 h-1 w-3/4 -translate-x-1/2 bg-gradient-to-r from-primary to-accent"></div>
      
      <div className="grid grid-cols-1 text-justify md:grid-cols-4 gap-8 md:gap-4">
        {[
          {
            number: 1,
            title: "Write",
            description: "Share your story in simple language. No experience needed—write like you're telling a friend.",
            icon: <BookOpen className="w-5 h-5" />
          },
          {
            number: 2,
            title: "Share",
            description: "Your story goes live and becomes discoverable by curious travelers searching for authentic experiences.",
            icon: <Share2 className="w-5 h-5" />
          },
          {
            number: 3,
            title: "Connect",
            description: "Engage with readers, answer questions, and build a community around your shared knowledge.",
            icon: <Users className="w-5 h-5" />
          },
          {
            number: 4,
            title: "Preserve",
            description: "Your story becomes part of a permanent digital archive of human experience and heritage.",
            icon: <Archive className="w-5 h-5" />
          }
        ].map((step, index) => (
          <div 
            key={index}
            className="relative group"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="relative z-10 flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 h-full border border-gray-100 hover:border-primary/20">
              {/* Number badge */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white flex items-center justify-center text-2xl font-bold mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                {step.number}
              </div>
              
              {/* Step content */}
              <div className="flex-1">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  {step.icon}
                </div>
                <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-justify leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* CTA Button */}
    <div className="mt-16 text-center">
      <Link
        href="/write-story"
        className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-black bg-accent hover:bg-yellow-500 transition-colors shadow-sm hover:shadow-md"
      >
        Share Your Story
        <ArrowRight className="ml-2 w-5 h-5" />
      </Link>
    </div>
  </div>
</section>
      <section className="py-16 lg:py-24 bg-background">
  <div className="container-max px-4 sm:px-6">
    <div className="text-center max-w-3xl mx-auto mb-16">
      <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-4">
        Discover Our World
      </h2>
      <p className="text-lg text-gray-600">
        Explore a diverse collection of stories and experiences that bring places to life
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[
        {
          icon: <BookOpen className="w-6 h-6" />,
          title: "Local Stories",
          description: "Personal narratives from people who know places best—hidden gems, local legends, and everyday magic."
        },
        {
          icon: <MapPin className="w-6 h-6" />,
          title: "Historical Places",
          description: "Deep dives into heritage sites, monuments, and landmarks with context and human connection."
        },
        {
          icon: <Users className="w-6 h-6" />,
          title: "Culture & Traditions",
          description: "Explorations of festivals, customs, and cultural practices that define communities."
        },
        {
          icon: <Share2 className="w-6 h-6" />,
          title: "Community Content",
          description: "Authentic stories from real people, curated for meaningful insights about places."
        }
      ].map((feature, index) => (
        <div 
          key={index}
          className="group bg-white rounded-xl p-6 border border-gray-100 hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
              {feature.icon}
            </div>
            <div>
              <h3 className="text-xl font-heading font-semibold mb-2 text-gray-900 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
    
      {/* Call to Action */}
    <Community/>
    </div>
  )
}
