import { NextRequest, NextResponse } from "next/server";
import { createBooking, getBookings, getRoomById, updateBookingStatus } from "@/lib/db";
import { BookingStatus } from "@/lib/types";

export async function GET() {
  try {
    const bookings = await getBookings();
    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    console.error("Error in GET /api/bookings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      roomId,
      guestName,
      guestEmail,
      guestPhone,
      checkIn,
      checkOut,
      guestsCount,
      specialRequests,
    } = body;

    if (!roomId || !guestName || !guestEmail || !checkIn || !checkOut) {
      return NextResponse.json(
        { success: false, error: "Missing required booking fields" },
        { status: 400 }
      );
    }

    const room = await getRoomById(roomId);
    if (!room) {
      return NextResponse.json(
        { success: false, error: "Selected room not found" },
        { status: 404 }
      );
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const diffTime = checkOutDate.getTime() - checkInDate.getTime();
    const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    const totalPrice = nights * room.pricePerNight;

    const booking = await createBooking({
      roomId: room.id,
      roomName: room.name,
      guestName,
      guestEmail,
      guestPhone: guestPhone || "",
      checkIn,
      checkOut,
      nights,
      guestsCount: Number(guestsCount) || 1,
      totalPrice,
      specialRequests: specialRequests || "",
    });

    return NextResponse.json({
      success: true,
      booking,
      message: `Reservation confirmed for ${room.name}`,
    });
  } catch (error) {
    console.error("Error in POST /api/bookings:", error);
    return NextResponse.json(
      { success: false, error: "Booking submission failed" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingId, status } = body;

    if (!bookingId || !status) {
      return NextResponse.json(
        { success: false, error: "Missing bookingId or status" },
        { status: 400 }
      );
    }

    await updateBookingStatus(bookingId, status as BookingStatus);
    return NextResponse.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.error("Error in PATCH /api/bookings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update booking status" },
      { status: 500 }
    );
  }
}
