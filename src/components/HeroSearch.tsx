"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Users, Building, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { BookingModal } from "./BookingModal";

export function HeroSearch() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const threeDaysLater = new Date(today);
  threeDaysLater.setDate(threeDaysLater.getDate() + 4);

  const formatDateValue = (d: Date) => d.toISOString().split("T")[0];

  const [checkIn, setCheckIn] = useState<string>(formatDateValue(tomorrow));
  const [checkOut, setCheckOut] = useState<string>(formatDateValue(threeDaysLater));
  const [category, setCategory] = useState<string>("All");
  const [guests, setGuests] = useState<string>("2");

  const setPresetDates = (daysFromToday: number, duration: number) => {
    const start = new Date();
    start.setDate(start.getDate() + daysFromToday);
    const end = new Date(start);
    end.setDate(end.getDate() + duration);

    setCheckIn(formatDateValue(start));
    setCheckOut(formatDateValue(end));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (category !== "All") {
      router.push(`/rooms?category=${category}`);
    } else {
      setModalOpen(true);
    }
  };

  return (
    <>
      <div className="w-full max-w-6xl mx-auto -mt-8 sm:-mt-20 lg:-mt-24 relative z-30 px-3 sm:px-6">
        <div className="glass-panel-gold rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-7 shadow-2xl border border-amber-500/30 backdrop-blur-2xl gold-glow">
          {/* Quick Date Presets */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3.5 mb-3.5 border-b border-white/10 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="font-semibold text-white text-xs">Direct Reservation Concierge</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
              <span className="text-slate-400 text-[11px] shrink-0">Quick Dates:</span>
              <button
                type="button"
                onClick={() => setPresetDates(5, 2)}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 border border-white/10 text-[11px] transition-colors shrink-0"
              >
                Next Weekend
              </button>
              <button
                type="button"
                onClick={() => setPresetDates(14, 7)}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 border border-white/10 text-[11px] transition-colors shrink-0"
              >
                7-Night Stay
              </button>
            </div>
          </div>

          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 items-end"
          >
            {/* Check-In */}
            <div className="space-y-1">
              <label className="text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Check-In Date</span>
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-slate-900/95 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 transition-colors h-11"
              />
            </div>

            {/* Check-Out */}
            <div className="space-y-1">
              <label className="text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Check-Out Date</span>
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-slate-900/95 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 transition-colors h-11"
              />
            </div>

            {/* Suite Category */}
            <div className="space-y-1">
              <label className="text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-slate-300 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Suite Tier</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-900/95 border border-white/15 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 transition-colors h-11"
              >
                <option value="All" className="bg-slate-950">All Collections</option>
                <option value="Penthouse" className="bg-slate-950">Penthouse Suites</option>
                <option value="Skyline" className="bg-slate-950">Skyline Corner Suites</option>
                <option value="Presidential" className="bg-slate-950">Presidential Suites</option>
                <option value="Executive" className="bg-slate-950">Executive Suites</option>
                <option value="Deluxe" className="bg-slate-950">Deluxe Rooms</option>
              </select>
            </div>

            {/* Guests */}
            <div className="space-y-1">
              <label className="text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-slate-300 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Guests</span>
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-slate-900/95 border border-white/15 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 transition-colors h-11"
              >
                <option value="1" className="bg-slate-950">1 Guest (VIP Traveler)</option>
                <option value="2" className="bg-slate-950">2 Guests (Couple)</option>
                <option value="3" className="bg-slate-950">3 Guests</option>
                <option value="4" className="bg-slate-950">4 Guests (Family/Suite)</option>
                <option value="6" className="bg-slate-950">6 Guests (Presidential)</option>
              </select>
            </div>

            {/* Action Button */}
            <div className="space-y-1 pt-1 sm:pt-0">
              <Button
                type="submit"
                variant="default"
                className="w-full h-11 text-xs sm:text-sm font-bold tracking-wide flex items-center justify-center gap-2 gold-glow-sm"
              >
                <Sparkles className="w-4 h-4 text-slate-950 shrink-0" />
                <span>Check Availability</span>
              </Button>
            </div>
          </form>

          {/* Quick Perks Bar */}
          <div className="mt-3.5 pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-300 gap-1.5">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
              <span>Complimentary Rolls-Royce Transfer for Penthouses</span>
            </span>
            <span className="flex items-center gap-1.5 text-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Direct Best Rate Guarantee & 48h Cancellation</span>
            </span>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
