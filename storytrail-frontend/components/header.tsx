"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Icons

export default function Header() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Fetch user from /api/auth/me
  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        const data = await res.json();
        setUser(data?.user || null);
      } catch {
        setUser(null);
      }
    }
    loadUser();
  }, []);

  return (
    <header className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="container-max flex items-center justify-between h-16">

        {/* Brand */}
        <Link href="/" className="text-2xl font-heading font-bold text-primary">
          StoryTrail
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 text-textDark font-medium">
          <Link href="/stories" className="hover:text-primaryDark transition">Stories</Link>
          <Link href="/places" className="hover:text-primaryDark transition">Places</Link>
          <Link href="/write" className="hover:text-primaryDark transition">Write Story</Link>
          
          {/* Auth Button */}
          {user ? (
            <Link
              href="/profile"
              className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primaryDark transition"
            >
              {user.email.split("@")[0]}
            </Link>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primaryDark transition"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-textDark"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-100">
          <nav className="flex flex-col p-4 space-y-4 text-textDark font-medium">
            <Link href="/stories" className="hover:text-primaryDark transition"
              onClick={() => setOpen(false)}
            >
              Stories
            </Link>

            <Link href="/places" className="hover:text-primaryDark transition"
              onClick={() => setOpen(false)}
            >
              Places
            </Link>

            <Link href="/write" className="hover:text-primaryDark transition"
              onClick={() => setOpen(false)}
            >
              Write Story
            </Link>

            {/* Login / Profile */}
            {user ? (
              <Link
                href="/profile"
                className="block px-4 py-2 bg-primary text-white rounded-full text-center hover:bg-primaryDark"
                onClick={() => setOpen(false)}
              >
                {user.email.split("@")[0]}
              </Link>
            ) : (
              <Link
                href="/login"
                className="block px-4 py-2 bg-primary text-white rounded-full text-center hover:bg-primaryDark"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
