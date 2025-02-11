import { NextResponse } from "next/server";

const IMAGE_API_BASE_URL = process.env.IMAGE_API_BASE_URL || ""; // ✅ Load from env
const API_KEY = process.env.API_KEY || ""; // ✅ Secure API key

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const imagePath = searchParams.get("path");

    if (!imagePath) {
      return NextResponse.json({ error: "Image path is required" }, { status: 400 });
    }

    const imageUrl = `${IMAGE_API_BASE_URL}${imagePath}`;
    console.log("Fetching Image:", imageUrl);

    const response = await fetch(imageUrl, {
      headers: { "x-api-key": API_KEY },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to load image" }, { status: response.status });
    }

    const contentType = response.headers.get("Content-Type") || "image/jpeg";
    if (!contentType.startsWith("image/")) {
      return NextResponse.json({ error: "Invalid image type" }, { status: 400 });
    }

    return new NextResponse(response.body, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 });
  }
}
