"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Users,
  Maximize2,
  Bed,
  Building,
  Eye,
  CheckCircle2,
  ShieldCheck,
  Star,
  ChevronLeft,
  Calendar,
  Phone,
  ArrowRight,
} from "lucide-react";
import { Room } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookingModal } from "@/components/BookingModal";
import { RoomCard } from "@/components/RoomCard";

interface RoomDetailClientProps {
  room: Room;
  relatedRooms: Room[];
}

export function RoomDetailClient({ room, relatedRooms }: RoomDetailClientProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [nights, setNights] = useState(3);

  const estimatedTotal = nights * room.pricePerNight;
  const estimatedTaxes = Math.round(estimatedTotal * 0.14);
  const grandTotal = estimatedTotal + estimatedTaxes;

  return (
    <>
      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Back link */}
          <div>
            <Link
              href="/rooms"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 transition-colors uppercase tracking-wider font-semibold"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to All Suites</span>
            </Link>
          </div>

          {/* Title and Badges Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Badge variant="gold">{room.category} Collection</Badge>
                <div className="flex items-center gap-1 text-xs text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="font-bold">{room.rating.toFixed(1)}</span>
                  <span className="text-slate-400">({room.reviewCount} reviews)</span>
                </div>
              </div>
              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
                {room.name}
              </h1>
              <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
                {room.shortDescription}
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end">
              <span className="text-xs text-slate-400 uppercase tracking-wider">
                Direct Booking Rate
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-serif font-bold text-amber-400">
                  {formatCurrency(room.pricePerNight)}
                </span>
                <span className="text-sm text-slate-400">/ night</span>
              </div>
            </div>
          </div>

          {/* Interactive Photo Gallery */}
          <div className="space-y-4">
            {/* Main Featured Image */}
            <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-950">
              <img
                src={room.images[activeImageIndex] || room.images[0]}
                alt={`${room.name} interior photography`}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 text-xs text-slate-300 bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
                Photo {activeImageIndex + 1} of {room.images.length} • The Luminary Architectural Gallery
              </div>
            </div>

            {/* Thumbnails list */}
            {room.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {room.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-28 sm:w-36 aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIndex === idx
                        ? "border-amber-400 scale-105 shadow-lg shadow-amber-500/20"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Specifications Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 glass-panel rounded-2xl border border-white/10">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                  Capacity
                </span>
                <span className="text-sm font-semibold text-white">
                  Up to {room.capacity} Guests
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Bed className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                  Bed Configuration
                </span>
                <span className="text-sm font-semibold text-white">{room.bedType}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Maximize2 className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                  Residence Area
                </span>
                <span className="text-sm font-semibold text-white">{room.sizeSqFt} sq ft</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Building className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                  Location & View
                </span>
                <span className="text-sm font-semibold text-white">{room.floor}</span>
              </div>
            </div>
          </div>

          {/* Two-Column Layout: Details + Sticky Booking Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            {/* Left 2 Cols: Description & Amenities */}
            <div className="lg:col-span-2 space-y-10">
              {/* Description */}
              <div className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-white">
                  The Experience
                </h2>
                <p className="text-slate-300 leading-relaxed text-base sm:text-lg font-light">
                  {room.description}
                </p>
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-400/20 text-xs sm:text-sm text-amber-200/90 flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>
                    Guests in this suite receive round-the-clock dedicated butler dispatch, priority reservations at Aura Sky, and complimentary high-altitude breakfast.
                  </span>
                </div>
              </div>

              {/* Amenities Grid */}
              <div className="space-y-6">
                <h2 className="text-2xl font-serif font-bold text-white">
                  Curated Suite Amenities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {room.amenities.map((amenity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-white/5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="text-sm text-slate-200">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* House Policies */}
              <div className="space-y-4 pt-6 border-t border-white/10">
                <h3 className="text-lg font-serif font-bold text-white">
                  House Inclusions & Guarantees
                </h3>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Check-in: 3:00 PM • Guaranteed Late Check-out: 2:00 PM for direct bookings</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Complimentary cancellation up to 48 hours prior to arrival date</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Secure underground valet and EV supercharging included</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Sticky Instant Reservation Widget */}
            <div className="lg:col-span-1 sticky top-28 space-y-6">
              <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl space-y-6">
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                    Instant Reservation
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-serif font-bold text-white">
                      {formatCurrency(room.pricePerNight)}
                    </span>
                    <span className="text-xs text-slate-400">/ night</span>
                  </div>
                </div>

                {/* Night duration calculator */}
                <div className="space-y-2">
                  <label className="text-xs text-slate-300 font-medium block">
                    Stay Duration
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setNights(Math.max(1, nights - 1))}
                      className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 text-white font-bold hover:bg-slate-800"
                    >
                      -
                    </button>
                    <div className="flex-1 text-center py-2 bg-slate-900/80 rounded-xl border border-white/10 text-sm font-semibold text-white">
                      {nights} {nights === 1 ? "Night" : "Nights"}
                    </div>
                    <button
                      onClick={() => setNights(nights + 1)}
                      className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 text-white font-bold hover:bg-slate-800"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Estimated Cost Breakdown */}
                <div className="bg-slate-900/60 rounded-xl p-4 space-y-2 text-xs border border-white/5">
                  <div className="flex justify-between text-slate-300">
                    <span>
                      {formatCurrency(room.pricePerNight)} × {nights} nights
                    </span>
                    <span>{formatCurrency(estimatedTotal)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Metropolitan luxury tax & resort fee (14%)</span>
                    <span>{formatCurrency(estimatedTaxes)}</span>
                  </div>
                  <div className="border-t border-white/10 pt-2 flex justify-between items-center text-sm font-semibold">
                    <span className="text-white">Estimated Total</span>
                    <span className="text-amber-400 text-lg font-bold">
                      {formatCurrency(grandTotal)}
                    </span>
                  </div>
                </div>

                {/* Reserve Suite CTA Button */}
                <Button
                  onClick={() => setModalOpen(true)}
                  size="lg"
                  className="w-full text-base font-semibold shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Reserve This Suite</span>
                </Button>

                <div className="text-center">
                  <span className="text-[11px] text-slate-400">
                    Best Rate Guaranteed • No payment required today
                  </span>
                </div>
              </div>

              {/* VIP Butler Concierge Box */}
              <div className="glass-panel rounded-2xl p-4 border border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <span className="text-white font-medium block">Personal Butler Inquiries</span>
                  <span className="text-slate-400">Call +1 (212) 555-8900 for private wing bookings</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related Suites */}
          {relatedRooms.length > 0 && (
            <div className="pt-16 border-t border-white/10 space-y-8">
              <div className="space-y-1">
                <span className="text-xs text-amber-400 uppercase tracking-widest font-semibold">
                  Complementary Residences
                </span>
                <h3 className="text-2xl font-serif font-bold text-white">
                  More Suites in {room.category}
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedRooms.map((rel) => (
                  <RoomCard key={rel.id} room={rel} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        preselectedRoom={room}
      />
    </>
  );
}
