import { NextResponse } from "next/server";

const API_URL = process.env.SEARCH_API_BASE_URL || ""; // ✅ Load from env
const API_KEY = process.env.API_KEY || ""; // ✅ Secure API key

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const searchQuery = searchParams.get("query");
    const page = searchParams.get("page") || "1";
    const pageSize = searchParams.get("pageSize") || "10";

    if (!searchQuery) {
      return NextResponse.json({ error: "Search query is required" }, { status: 400 });
    }

    const externalApiUrl = `${API_URL}?search=${encodeURIComponent(searchQuery)}&page=${page}&pageSize=${pageSize}`;

    const response = await fetch(externalApiUrl, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "x-api-key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch search results: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching search results:", error);
    return NextResponse.json({ error: "Failed to fetch search results" }, { status: 500 });
  }
}
