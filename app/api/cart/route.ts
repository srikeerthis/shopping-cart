import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Cart from "@/models/Cart";

// ✅ POST: Save Cart Items
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    
    const body = await req.json();
    if (!body.items || !Array.isArray(body.items)) {
      return NextResponse.json({ error: "Invalid request format" }, { status: 400 });
    }

    const newCart = new Cart({ items: body.items });
    await newCart.save();

    return NextResponse.json({ message: "Cart saved successfully!" }, { status: 201 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to save cart" }, { status: 500 });
  }
}
