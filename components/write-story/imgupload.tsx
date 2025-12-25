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
            onClientUploadComplete={(res) => {
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
      {
	imageUrl && (
        <div className="flex flex-col items-center gap-3">
          <div className="relative h-40 w-40 overflow-hidden rounded-lg border">
            <Image
              src={imageUrl}
              alt="Uploaded image"
              fill
              className="object-cover"
		
            />
          </div>

          <button
            type="button"
            onClick={handleRemove}
            className="rounded-md bg-destructive px-3 py-1 text-sm text-destructive-foreground hover:opacity-90 transition"
          >
            Remove image
          </button>
        </div>
      )}
    </div>
  );
}
