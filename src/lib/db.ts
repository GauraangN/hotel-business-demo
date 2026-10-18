import { Room, Booking, Enquiry } from "./types";
import { INITIAL_ROOMS, INITIAL_BOOKINGS, INITIAL_ENQUIRIES } from "./data/hotel-data";
import { supabase, isSupabaseConfigured } from "./supabase/client";

// In-memory persistent state for local development when Supabase credentials are not yet supplied
let localRooms: Room[] = [...INITIAL_ROOMS];
let localBookings: Booking[] = [...INITIAL_BOOKINGS];
let localEnquiries: Enquiry[] = [...INITIAL_ENQUIRIES];

export async function getRooms(): Promise<Room[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .order("price_per_night", { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map((row) => ({
          id: row.id,
          slug: row.slug,
          name: row.name,
          category: row.category,
          pricePerNight: Number(row.price_per_night),
          originalPrice: row.original_price ? Number(row.original_price) : undefined,
          capacity: row.capacity,
          bedType: row.bed_type,
          sizeSqFt: row.size_sq_ft,
          floor: row.floor,
          view: row.view,
          rating: Number(row.rating),
          reviewCount: row.review_count,
          featured: row.featured,
          shortDescription: row.short_description,
          description: row.description,
          amenities: row.amenities || [],
          images: row.images || [],
          isAvailable: row.is_available,
        }));
      }
    } catch (err) {
      console.warn("Supabase fetch failed, falling back to local dataset:", err);
    }
  }

  return localRooms;
}

export async function getRoomBySlug(slug: string): Promise<Room | null> {
  const rooms = await getRooms();
  return rooms.find((r) => r.slug === slug) || null;
}

export async function getRoomById(id: string): Promise<Room | null> {
  const rooms = await getRooms();
  return rooms.find((r) => r.id === id) || null;
}

export async function createBooking(
  bookingInput: Omit<Booking, "id" | "createdAt" | "status" | "paymentStatus">
): Promise<Booking> {
  const newBooking: Booking = {
    ...bookingInput,
    id: `BKG-${Math.floor(1000 + Math.random() * 9000)}`,
    createdAt: new Date().toISOString(),
    status: "confirmed",
    paymentStatus: "paid",
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .insert({
          id: newBooking.id,
          room_id: newBooking.roomId,
          room_name: newBooking.roomName,
          guest_name: newBooking.guestName,
          guest_email: newBooking.guestEmail,
          guest_phone: newBooking.guestPhone,
          check_in: newBooking.checkIn,
          check_out: newBooking.checkOut,
          nights: newBooking.nights,
          guests_count: newBooking.guestsCount,
          total_price: newBooking.totalPrice,
          special_requests: newBooking.specialRequests || "",
          status: newBooking.status,
          payment_status: newBooking.paymentStatus,
        })
        .select()
        .single();

      if (!error && data) {
        return newBooking;
      }
    } catch (err) {
      console.warn("Supabase booking insert failed, storing in local fallback:", err);
    }
  }

  // Prepend to local storage
  localBookings = [newBooking, ...localBookings];
  return newBooking;
}

export async function getBookings(): Promise<Booking[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        return data.map((row) => ({
          id: row.id,
          createdAt: row.created_at,
          roomId: row.room_id,
          roomName: row.room_name,
          guestName: row.guest_name,
          guestEmail: row.guest_email,
          guestPhone: row.guest_phone,
          checkIn: row.check_in,
          checkOut: row.check_out,
          nights: row.nights,
          guestsCount: row.guests_count,
          totalPrice: Number(row.total_price),
          specialRequests: row.special_requests,
          status: row.status,
          paymentStatus: row.payment_status,
        }));
      }
    } catch (err) {
      console.warn("Supabase bookings fetch failed, falling back to local:", err);
    }
  }

  return localBookings;
}

export async function updateBookingStatus(
  bookingId: string,
  status: Booking["status"]
): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status })
        .eq("id", bookingId);
      if (!error) return true;
    } catch (err) {
      console.warn("Supabase booking status update failed:", err);
    }
  }

  localBookings = localBookings.map((b) =>
    b.id === bookingId ? { ...b, status } : b
  );
  return true;
}

export async function createEnquiry(
  enquiryInput: Omit<Enquiry, "id" | "createdAt" | "status">
): Promise<Enquiry> {
  const newEnquiry: Enquiry = {
    ...enquiryInput,
    id: `ENQ-${Math.floor(1000 + Math.random() * 9000)}`,
    createdAt: new Date().toISOString(),
    status: "new",
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("enquiries")
        .insert({
          id: newEnquiry.id,
          name: newEnquiry.name,
          email: newEnquiry.email,
          phone: newEnquiry.phone,
          event_type: newEnquiry.eventType,
          preferred_date: newEnquiry.preferredDate || null,
          estimated_guests: newEnquiry.estimatedGuests || null,
          message: newEnquiry.message,
          status: newEnquiry.status,
        })
        .select()
        .single();

      if (!error && data) {
        return newEnquiry;
      }
    } catch (err) {
      console.warn("Supabase enquiry insert failed, storing locally:", err);
    }
  }

  localEnquiries = [newEnquiry, ...localEnquiries];
  return newEnquiry;
}

export async function getEnquiries(): Promise<Enquiry[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("enquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        return data.map((row) => ({
          id: row.id,
          createdAt: row.created_at,
          name: row.name,
          email: row.email,
          phone: row.phone,
          eventType: row.event_type,
          preferredDate: row.preferred_date,
          estimatedGuests: row.estimated_guests,
          message: row.message,
          status: row.status,
        }));
      }
    } catch (err) {
      console.warn("Supabase enquiries fetch failed, falling back to local:", err);
    }
  }

  return localEnquiries;
}

export async function updateEnquiryStatus(
  enquiryId: string,
  status: Enquiry["status"]
): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from("enquiries")
        .update({ status })
        .eq("id", enquiryId);
      if (!error) return true;
    } catch (err) {
      console.warn("Supabase enquiry status update failed:", err);
    }
  }

  localEnquiries = localEnquiries.map((e) =>
    e.id === enquiryId ? { ...e, status } : e
  );
  return true;
}
