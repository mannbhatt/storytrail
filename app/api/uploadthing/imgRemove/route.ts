import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { imageKey } = await req.json();
    const utapi = new UTApi();
    await utapi.deleteFiles(imageKey);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Image removal error:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
