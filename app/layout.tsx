// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "StoryTrail — Discover Hidden Stories",
  description: "Find unexplored stories from cities, villages, myths, and local legends.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Poppins:wght@400;600;800&family=Playfair+Display:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className="bg-background text-textDark font-sans">
        {/* You will add header here later */}

        <main className="min-h-screen container-max">{children}</main>

        {/* You will add footer here later */}
      </body>
    </html>
  );
}
