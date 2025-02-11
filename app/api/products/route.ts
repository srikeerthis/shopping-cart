import { NextResponse } from "next/server";

const API_URL = process.env.PRODUCTS_API_BASE_URL || ""; // ✅ Load from env
const API_KEY = process.env.API_KEY || ""; // ✅ Secure API key

export async function GET() {
  try {
    const response = await fetch(`${API_URL}?page=1&pageSize=10`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "x-api-key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products from external API");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
