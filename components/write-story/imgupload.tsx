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

    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/uploadthing/imgRemove`, {
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
	
  return (
    <div className="w-full rounded-xl border border-gray-100 bg-background p-4 shadow-smSoft transition">
      {/* Upload state */}
      {!imageUrl && (
        <div className="flex h-40 sm:h-48 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-primary transition">
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
              uploadIcon: { color: "var(--color-primary)" },
              label: {
                color: "var(--color-text)",
                fontSize: "0.875rem",
                fontFamily: "Inter, sans-serif",
              },
              allowedContent: {
                color: "#6B7280",
                fontFamily: "Inter, sans-serif",
              },
              button: {
                background: "var(--color-primary)",
                color: "white",
                borderColor: "var(--color-primary)",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                fontFamily: "Poppins, sans-serif",
                fontWeight: "600",
                width:"200px",
                marginBottom:"12px",
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
    <div className="relative h-32 sm:h-40 w-full overflow-hidden rounded-lg border border-gray-100 group">
      
      {/* Image */}
      <Image
        src={imageUrl}
        alt="Uploaded image"
        fill
        sizes="(max-width: 640px) 128px, 160px"
        className="object-cover"
      />

      {/* ❌ Remove button (top-right X) */}
      <button
        type="button"
        onClick={handleRemove}
        className="
          absolute right-2 top-2
          z-10
          flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center
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
