import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

export async function POST(req) {
  try {
    const { imageKey } = await req.json();
    const utapi = new UTApi();
    await utapi.deleteFiles(imageKey);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
