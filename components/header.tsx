"use client";

import { useAuth } from "@/components/providers/AuthProvider"
import { useState ,useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, Menu, User,Pen,BookOpen ,ChevronRight,Store} from "lucide-react";


export default function TripotoHeader() {
  const { session, loading } = useAuth()
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
	if (loading) return null;
	//console.log("user session in header",session)
  

  
 
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  

  return (
    <>
      {/* Header using YOUR theme */}
      <header
  className={`fixed top-0 left-0 right-0 z-50 text-white transition-all duration-300
    bg-primary shadow-md lg:shadow-none
    
    ${scrolled ? "lg:bg-primary shadow-md" : "lg:bg-transparent "}
  `}
>


        {/* ---------------- MOBILE HEADER ---------------- */}
        <div className="lg:hidden">
          <div className="px-2.5 py-2 flex items-center justify-between">
            <Link href="/" title="StoryTrail">
              <h1 className="tracking-wide text-xl font-heading font-bold text-white">
                StoryTrail
              </h1>
            </Link>

            <button
              onClick={toggleMobileMenu}
              className="p-1 pr-0 bg-transparent border-none outline-none"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Mobile Search Bar */}
          <div className="px-2 pb-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />

              <input
                type="text"
                className="w-full bg-white font-body text-textDark rounded-md px-10 py-2 text-sm shadow-sm focus:ring-2 focus:ring-primaryDark outline-none"
                placeholder="Search stories..."
              />
            </div>
          </div>
        </div>

        {/* ---------------- MOBILE SIDEBAR ---------------- */}
        {isMobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={toggleMobileMenu}
            />

            <div className="fixed right-0 top-0 h-full w-[280px] bg-white text-gray-900 shadow-xl z-50 lg:hidden overflow-y-auto">
              <button
                onClick={toggleMobileMenu}
                className="float-right p-4"
              >
                <X className="w-5 h-5 hover:text-primary" />
              </button>

              <div className="p-4 pt-12">
                <h2 className="tracking-wide text-xl font-heading font-bold text-primary mb-4">
                  StoryTrail
                </h2>

                <nav className="flex flex-col">

                <Link href="/stories" className="flex justify-between items-center  py-3 border-b font-medium hover:text-primary">
                <span className="flex items-center gap-2"><BookOpen className="w-4 h-4  hover:text-primary font-semibold  " /> Stories</span><ChevronRight className="w-4 h-4  hover:text-primary font-semibold  " />
                  </Link>

                <Link href="/about" className="flex justify-between items-center gap-2 py-3 border-b font-medium hover:text-primary">
                <span className="flex items-center gap-2"><Store className="w-4 h-4  hover:text-primary font-semibold  " /> About</span><ChevronRight className="w-4 h-4  hover:text-primary font-semibold  " />
                  </Link>

                  <Link href={`${session ? '/write-story' : 'signup'}`} className="flex justify-between items-center gap-2 py-3 border-b font-medium hover:text-primary">
                  <span className="flex items-center gap-2"><Pen className="w-4 h-4 font-semibold hover:text-primary   " /> Write a Story</span><ChevronRight className="w-4 h-4  hover:text-primary font-semibold  " />
                  </Link>

                  { session ? (<Link href="/profile" className="flex justify-between items-center gap-2 py-3 font-medium hover:text-primary">
                  <span className="flex items-center gap-2"><User className="w-4 h-4  hover:text-primary font-semibold  " /> Profile </span><ChevronRight className="w-4 h-4  hover:text-primary font-semibold  " />
                  </Link>) : (<Link href="/login" className="flex justify-between items-center gap-2 py-3 font-medium hover:text-primary">
                  <span className="flex items-center gap-2"><User className="w-4 h-4  hover:text-primary font-semibold  " /> Signin / Signup</span><ChevronRight className="w-4 h-4  hover:text-primary font-semibold  " />
                  </Link>)}
                </nav>
              </div>
            </div>
          </>
        )}

        {/* ---------------- DESKTOP HEADER ---------------- */}
        <div className="hidden lg:flex items-center justify-between px-8 py-4">
          <Link href="/" title="StoryTrail">
            <h1 className="tracking-wide text-3xl font-heading font-semibold text-white">StoryTrail</h1>
          </Link>

          <nav className="flex items-center gap-10 font-medium text-lg">


            <Link href="/stories" className="text-white hover:text-accent transition">
              Stories
            </Link>
            <Link href="/search" className="text-white hover:text-accent transition">
              Search
            </Link>
            <Link href="/places" className="text-white hover:text-accent transition">
              Places
            </Link>
            <Link href="/about" className="text-white hover:text-accent transition">
              About
            </Link>
            </nav>
            <span className=" flex items-center gap-2 font-medium ">
            { session ? (<Link href="/profile" className="flex items-center text-white hover:text-accent transition">
              <User className="w-4 h-4  text-white" />  Profile
            </Link>):(<Link href="/signup" className="flex items-center text-white hover:text-accent transition">
              <User className="w-4 h-4  text-white" />  Sign in
            </Link>)
		
		}
          <p className="text-xl font-seminbold">/</p>
            {/* Login Button */}
            <Link
              href={`${session ? '/write-story' : 'signup'}`}
              className="flex items-center gap-2 bg-accent text-textDark px-6 py-2 rounded-full font-semibold hover:bg-yellow-400 transition"
            >
             <Pen className="w-4 h-4 font-semibold text-textDark " /> Write Story
            </Link>
            </span>
          
        </div>
      </header>
    </>
  );
}
