import { supabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = supabaseServer();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // ❌ Not logged in → block immediately
  if (!session) {
    redirect("/signup");
  }

  // ✅ Logged in → allow access
  return <>{children}</>;
}
