
import { createUploadthing } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { NextRequest } from "next/server";

const f = createUploadthing();

const auth = (req: NextRequest) => ({ id: "fakeId" });

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      return { uploadedBy: metadata.userId };
    }),
} as const;

type FileRouter = typeof ourFileRouter;

export type { FileRouter };
