"use client";

import { UploadDropzone } from "@/lib/uploadThings";
import { useState, useEffect } from "react";
import Image from "next/image";

interface ImguploadProps {
  onUploadComplete?: (url: string) => void;
  onImageKeyChange?: (key: string) => void;
  initialImage?: string;
  initialImageKey?: string;
}

interface UploadThingResponse {
  url: string;
  key: string;
}

export default function Imgupload({
  onUploadComplete,
  onImageKeyChange,
  initialImage = "",
  initialImageKey = "",
}: ImguploadProps) {
  const [imageUrl, setImageUrl] = useState(initialImage);
  const [imageKey, setImageKey] = useState(initialImageKey);

  useEffect(() => {
    setImageUrl(initialImage);
    setImageKey(initialImageKey);
  }, [initialImage, initialImageKey]);

  const handleRemove = async () => {
    if (!imageKey) return;

    const res = await fetch("/api/uploadthing/imgRemove", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageKey }),
    });

    const data = await res.json();

    if (data.success) {
      setImageUrl("");
      setImageKey("");
      onUploadComplete?.("");
      onImageKeyChange?.("");
    }
  };
	console.log(imageUrl)
  return (
    <div className="w-full rounded-xl border border-border bg-background p-4 shadow-sm transition">
      {/* Upload state */}
      {!imageUrl && (
        <div className="flex h-48 flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted hover:border-primary transition">
          <UploadDropzone
            endpoint="imageUploader"
            appearance={{
              container: {
                border: "none",
                background: "transparent",
                width: "100%",
                height: "100%",
                padding: "0",
              },
              uploadIcon: { color: "var(--primary)" },
              label: {
                color: "var(--foreground)",
                fontSize: "0.9rem",
              },
              allowedContent: {
                color: "var(--muted-foreground)",
              },
              button: {
                background: "var(--primary)",
                color: "black",
		borderColor:"black",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
              },
            }}
            onClientUploadComplete={(res: UploadThingResponse[]) => {
              const file = res?.[0] as UploadThingResponse | undefined;
              if (!file) return;

              setImageUrl(file.url);
              setImageKey(file.key);
              onUploadComplete?.(file.url);
              onImageKeyChange?.(file.key);
            }}
            onUploadError={(error: Error) =>
              alert(`Upload failed: ${error.message}`)
            }
          />
        </div>
      )}

      {/* Preview state */}
      
	{/* Preview state */}
{imageUrl && (
  <div className="flex flex-col items-center gap-3">
    <div className="relative h-40 w-full  overflow-hidden rounded-lg border group">
      
      {/* Image */}
      <Image
        src={imageUrl}
        alt="Uploaded image"
        fill
        sizes="160px"
        className="object-cover "
      />

      {/* ❌ Remove button (top-right X) */}
      <button
        type="button"
        onClick={handleRemove}
        className="
          absolute right-2 top-2
          z-10
          flex h-7 w-7 items-center justify-center
          rounded-full
          bg-black/70 text-white
          hover:bg-red-600
          transition
          opacity-0 group-hover:opacity-100
        "
        aria-label="Remove image"
      >
        ✕
      </button>
    </div>
  </div>
)}

    </div>
  );
}
