"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Users, Maximize2, Bed, ArrowRight, Eye, Sparkles } from "lucide-react";
import { Room } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { BookingModal } from "./BookingModal";

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="group relative rounded-2xl overflow-hidden border border-white/10 bg-slate-900/60 hover:border-amber-400/40 backdrop-blur-md transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col">
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
          <img
            src={room.images[0] || "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"}
            alt={room.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

          {/* Badges Overlay */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <Badge variant="gold" className="font-semibold shadow-md">
              {room.category}
            </Badge>
            {room.featured && (
              <Badge variant="default" className="flex items-center gap-1 shadow-md">
                <Sparkles className="w-3 h-3 text-amber-300" />
                Featured
              </Badge>
            )}
          </div>

          <div className="absolute top-4 right-4 bg-slate-950/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1 text-xs text-amber-300 font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{room.rating.toFixed(1)}</span>
            <span className="text-slate-400">({room.reviewCount})</span>
          </div>

          {/* Price Tag Overlay */}
          <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-300 block">
                Starting from
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-serif font-bold text-white">
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
        <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-serif font-semibold text-white group-hover:text-amber-300 transition-colors">
              <Link href={`/rooms/${room.slug}`}>{room.name}</Link>
            </h3>
            <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
              {room.shortDescription}
            </p>
          </div>

          {/* Room Specs */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Up to {room.capacity} guests</span>
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
                className="text-[11px] bg-white/5 border border-white/5 rounded-md px-2 py-0.5 text-slate-300"
              >
                {amenity}
              </span>
            ))}
            {room.amenities.length > 3 && (
              <span className="text-[11px] text-amber-400/80 px-1 py-0.5">
                +{room.amenities.length - 3} more
              </span>
            )}
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex items-center gap-3">
            <Link href={`/rooms/${room.slug}`} className="flex-1">
              <Button variant="outline" size="sm" className="w-full text-xs gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                <span>Suite Details</span>
              </Button>
            </Link>
            <Button
              variant="default"
              size="sm"
              onClick={() => setModalOpen(true)}
              className="flex-1 text-xs gap-1.5"
            >
              <span>Reserve Suite</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        preselectedRoom={room}
      />
    </>
  );
}
