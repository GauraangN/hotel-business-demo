"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Star, Users, Maximize2, Bed, ArrowRight, Eye, Sparkles, Building2 } from "lucide-react";
import { Room } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { BookingModal } from "./BookingModal";
import { RoomQuickView } from "./RoomQuickView";

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  return (
    <>
      <div className="group relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-slate-900/90 to-slate-950/90 hover:border-amber-400/50 backdrop-blur-xl transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/15 flex flex-col justify-between">
        {/* Top Image Banner */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
          <img
            src={room.images[0] || "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"}
            alt={room.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06090e] via-[#06090e]/30 to-transparent opacity-85" />

          {/* Badges Overlay */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
            <Badge variant="gold" className="font-semibold shadow-md">
              {room.category} Collection
            </Badge>
            {room.featured && (
              <Badge variant="default" className="flex items-center gap-1 shadow-md bg-amber-500 text-slate-950 font-bold border-none">
                <Sparkles className="w-3 h-3 text-slate-950" />
                Featured
              </Badge>
            )}
          </div>

          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5 text-xs text-amber-300 font-semibold z-10">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{room.rating.toFixed(1)}</span>
            <span className="text-slate-400 font-normal">({room.reviewCount})</span>
          </div>

          {/* Price Tag Overlay */}
          <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end z-10">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-300 block font-medium">
                Direct Rate
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  {formatCurrency(room.pricePerNight)}
                </span>
                <span className="text-xs text-slate-400">/ night</span>
                {room.originalPrice && (
                  <span className="text-xs text-slate-500 line-through">
                    {formatCurrency(room.originalPrice)}
                  </span>
                )}
              </div>
            </div>
            <span className="text-xs text-slate-300 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
              {room.floor}
            </span>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
          <div className="space-y-2">
            <h3 className="text-xl font-serif font-semibold text-white group-hover:text-amber-300 transition-colors">
              <Link href={`/rooms/${room.slug}`}>{room.name}</Link>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed font-light">
              {room.shortDescription}
            </p>
          </div>

          {/* Room Specs */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Up to {room.capacity}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate">{room.bedType}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{room.sizeSqFt} sq ft</span>
            </div>
          </div>

          {/* Amenities snippets */}
          <div className="flex flex-wrap gap-1.5">
            {room.amenities.slice(0, 3).map((amenity, idx) => (
              <span
                key={idx}
                className="text-[11px] bg-white/5 border border-white/5 rounded-md px-2.5 py-1 text-slate-300 font-light"
              >
                {amenity}
              </span>
            ))}
            {room.amenities.length > 3 && (
              <span className="text-[11px] text-amber-400/90 font-medium px-1 py-1">
                +{room.amenities.length - 3} more
              </span>
            )}
          </div>

          {/* Action CTAs: Quick View + Reserve Suite */}
          <div className="pt-2 grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQuickViewOpen(true)}
              className="w-full text-xs gap-1.5 hover:border-amber-400/40"
            >
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              <span>Quick View</span>
            </Button>

            <Button
              variant="default"
              size="sm"
              onClick={() => setModalOpen(true)}
              className="w-full text-xs gap-1.5 font-semibold"
            >
              <span>Reserve Suite</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>

      <RoomQuickView
        room={room}
        isOpen={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />

      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        preselectedRoom={room}
      />
    </>
  );
}
