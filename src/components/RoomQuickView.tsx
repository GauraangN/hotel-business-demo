"use client";

import React, { useState } from "react";
import {
  X,
  Users,
  Bed,
  Maximize2,
  Building,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  Star,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Room } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { BookingModal } from "./BookingModal";

interface RoomQuickViewProps {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
}

export function RoomQuickView({ room, isOpen, onClose }: RoomQuickViewProps) {
  const [activePhoto, setActivePhoto] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);

  if (!room) return null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-4xl bg-slate-950 border border-amber-500/30 text-slate-100 p-0 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Photos Carousel */}
            <div className="bg-slate-900 flex flex-col justify-between p-6 space-y-4 border-r border-white/10">
              <div className="relative aspect-[16/11] rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                <img
                  src={room.images[activePhoto] || room.images[0]}
                  alt={room.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge variant="gold">{room.category}</Badge>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex justify-between text-[11px] text-slate-300 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md">
                  <span>{room.view}</span>
                  <span>{room.floor}</span>
                </div>
              </div>

              {/* Thumbnails */}
              {room.images.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pb-1">
                  {room.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePhoto(idx)}
                      className={`relative w-20 aspect-[16/10] rounded-lg overflow-hidden border transition-all ${
                        activePhoto === idx
                          ? "border-amber-400 scale-105"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img}
                        alt="Thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Specs pill */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs text-slate-300 py-3 bg-white/5 rounded-xl border border-white/5">
                <div>
                  <div className="text-amber-400 font-bold">{room.capacity} Guests</div>
                  <div className="text-[10px] text-slate-400">Capacity</div>
                </div>
                <div>
                  <div className="text-amber-400 font-bold">{room.sizeSqFt} sq ft</div>
                  <div className="text-[10px] text-slate-400">Residence Size</div>
                </div>
                <div>
                  <div className="text-amber-400 font-bold">{room.rating.toFixed(1)} ★</div>
                  <div className="text-[10px] text-slate-400">Guest Rating</div>
                </div>
              </div>
            </div>

            {/* Right: Suite Details & Action */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                    The Luminary Collection
                  </span>
                  <DialogTitle className="text-2xl font-serif font-bold text-white">
                    {room.name}
                  </DialogTitle>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {room.description}
                  </p>
                </div>

                {/* Key Amenities */}
                <div className="space-y-2">
                  <span className="text-xs text-slate-300 font-semibold uppercase tracking-wider block">
                    Bespoke Inclusions
                  </span>
                  <div className="grid grid-cols-1 gap-1.5 text-xs text-slate-300 max-h-44 overflow-y-auto pr-1">
                    {room.amenities.map((a, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Booking Button */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                      Direct Booking Rate
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-serif font-bold text-amber-400">
                        {formatCurrency(room.pricePerNight)}
                      </span>
                      <span className="text-xs text-slate-400">/ night</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Best Rate Direct
                  </span>
                </div>

                <Button
                  onClick={() => {
                    onClose();
                    setBookingOpen(true);
                  }}
                  className="w-full h-11 text-sm font-semibold tracking-wide flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve {room.name}</span>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        preselectedRoom={room}
      />
    </>
  );
}
