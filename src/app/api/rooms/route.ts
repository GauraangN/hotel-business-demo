import { NextRequest, NextResponse } from "next/server";
import { getRooms } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");

    let rooms = await getRooms();

    if (category && category !== "All") {
      rooms = rooms.filter(
        (r) => r.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (featured === "true") {
      rooms = rooms.filter((r) => r.featured);
    }

    return NextResponse.json({ success: true, rooms });
  } catch (error) {
    console.error("Error in GET /api/rooms:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch rooms" },
      { status: 500 }
    );
  }
}
