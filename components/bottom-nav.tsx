"use client"
import { useAuth } from "@/components/providers/AuthProvider"
import { Home, Search, PlusCircle,BookOpen, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function MobileBottomNav() {
  const pathname = usePathname()
  const { session, loading } = useAuth()
	const userItem = session
  ? { id: "profile", label: "Profile", icon: User, href: "/profile" }
  : { id: "signup", label: "Sign Up", icon: User, href: "/signup" };

if (loading) return null;
 
  const navItems = [
    { id: "home", label: "Home", icon: Home, href: "/" },
    { id: "feed", label: "Feed", icon: Search, href: "/story-swiper" },
    { id: "create", label: "Create", icon: PlusCircle, href: "/create" },
    { id: "stories", label: "Stories", icon:BookOpen , href: "/stories" },
    userItem,
  ]
	
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-gray-200 shadow-[0_-2px_7px_0_rgba(0,0,0,0.08)]">
      <nav className="flex h-[60px]">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.id}
              href={item.href}
              className="flex flex-col items-center justify-center flex-1 hover:bg-gray-50 transition-colors"
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? "text-primary" : "text-gray-500"}`} />
              <span className={`text-xs ${isActive ? "text-primary font-medium" : "text-gray-500"}`}>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
