export type RoomCategory = "Executive" | "Skyline" | "Penthouse" | "Presidential" | "Deluxe";

export interface Room {
  id: string;
  slug: string;
  name: string;
  category: RoomCategory;
  pricePerNight: number;
  originalPrice?: number;
  capacity: number;
  bedType: string;
  sizeSqFt: number;
  floor: string;
  view: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
  description: string;
  shortDescription: string;
  amenities: string[];
  images: string[];
  isAvailable: boolean;
}

export type BookingStatus = "confirmed" | "pending" | "cancelled" | "checked-in";
export type PaymentStatus = "paid" | "deposit" | "pending";

export interface Booking {
  id: string;
  createdAt: string;
  roomId: string;
  roomName: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guestsCount: number;
  totalPrice: number;
  specialRequests?: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
}

export type EventType =
  | "Corporate Gala"
  | "Executive Board Meeting"
  | "Luxury Wedding"
  | "Private Dinner"
  | "Product Launch"
  | "General Enquiry";

export interface Enquiry {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  eventType: EventType;
  preferredDate?: string;
  estimatedGuests?: number;
  message: string;
  status: "new" | "contacted" | "scheduled" | "closed";
}

export interface Review {
  id: string;
  author: string;
  roleOrCity: string;
  rating: number;
  date: string;
  comment: string;
  suiteType: string;
}
