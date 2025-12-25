import { createUploadthing, type FileRouter } from "uploadthing/next"
import { supabaseServer } from "@/lib/supabase/server"

const f = createUploadthing()

export const ourFileRouter = {
  storyCover: f({
    image: {
      maxFileSize: "5MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const supabase = supabaseServer()
      const { data } = await supabase.auth.getUser()

      if (!data.user) throw new Error("Unauthorized")

      return { userId: data.user.id }
    })
    .onUploadComplete(async ({ file, metadata }) => {
      return {
        url: file.url,
        uploadedBy: metadata.userId,
      }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
