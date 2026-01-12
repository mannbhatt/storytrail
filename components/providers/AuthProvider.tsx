"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { supabaseBrowser } from "@/lib/supabase/client"
import type { Session } from "@supabase/supabase-js"
import { identifyUser, resetUser } from "@/lib/mixpanel"

type AuthContextType = {
  session: Session | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = supabaseBrowser()

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        
        // Track user authentication events in Mixpanel
        if (session?.user) {
          identifyUser(session.user.id, {
            email: session.user.email,
            created_at: session.user.created_at,
          })
        } else {
          resetUser()
        }
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
