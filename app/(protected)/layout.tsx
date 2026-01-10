// app/(protected)/layout.tsx
import { supabaseServer } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = supabaseServer()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/?signin=true')
    return null
  }

  return <>{children}</>
}