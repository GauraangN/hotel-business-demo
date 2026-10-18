"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import {
  Calendar,
  Users,
  CheckCircle2,
  Sparkles,
  CreditCard,
  ShieldCheck,
  Building2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Room, Booking } from "@/lib/types";
import { INITIAL_ROOMS } from "@/lib/data/hotel-data";
import { formatCurrency } from "@/lib/utils";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedRoom?: Room | null;
}

export function BookingModal({
  isOpen,
  onClose,
  preselectedRoom,
}: BookingModalProps) {
  const [rooms, setRooms] = useState<Room[]>(INITIAL_ROOMS);
  const [selectedRoomId, setSelectedRoomId] = useState<string>(
    preselectedRoom ? preselectedRoom.id : INITIAL_ROOMS[0].id
  );

  // Default dates: tomorrow to 3 days later
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const threeDaysLater = new Date(today);
  threeDaysLater.setDate(threeDaysLater.getDate() + 4);

  const formatDateValue = (d: Date) => d.toISOString().split("T")[0];

  const [checkIn, setCheckIn] = useState<string>(formatDateValue(tomorrow));
  const [checkOut, setCheckOut] = useState<string>(formatDateValue(threeDaysLater));
  const [guestsCount, setGuestsCount] = useState<number>(2);
  const [guestName, setGuestName] = useState<string>("");
  const [guestEmail, setGuestEmail] = useState<string>("");
  const [guestPhone, setGuestPhone] = useState<string>("");
  const [specialRequests, setSpecialRequests] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);
  const [confirmation, setConfirmation] = useState<Booking | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedRoom) {
      setSelectedRoomId(preselectedRoom.id);
    }
  }, [preselectedRoom]);

  // Fetch live rooms if needed
  useEffect(() => {
    fetch("/api/rooms")
      .then((res) => res.json())
      .then((data) => {
        if (data.rooms && data.rooms.length > 0) {
          setRooms(data.rooms);
        }
      })
      .catch(() => {});
  }, []);

  const selectedRoom =
    rooms.find((r) => r.id === selectedRoomId) || rooms[0] || INITIAL_ROOMS[0];

  // Calculate nights
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diffTime = checkOutDate.getTime() - checkInDate.getTime();
  const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const baseTotal = nights * (selectedRoom ? selectedRoom.pricePerNight : 1000);
  const taxesAndFees = Math.round(baseTotal * 0.14);
  const grandTotal = baseTotal + taxesAndFees;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId: selectedRoom.id,
          guestName,
          guestEmail,
          guestPhone,
          checkIn,
          checkOut,
          guestsCount,
          specialRequests,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Reservation failed");
      }

      setConfirmation(data.booking);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#D4AF37", "#f59e0b", "#fbbf24", "#ffffff"],
      });
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to finalize reservation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setConfirmation(null);
    setErrorMessage(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleReset()}>
      <DialogContent className="max-w-3xl bg-slate-950 border border-amber-500/30 text-slate-100 p-0 overflow-hidden shadow-2xl">
        {confirmation ? (
          /* Confirmation View */
          <div className="p-4 sm:p-8 text-center space-y-4 sm:space-y-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <div className="text-[10px] sm:text-xs uppercase tracking-widest text-amber-400 font-semibold">
                Reservation Confirmed
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-white font-bold">
                We Look Forward to Welcoming You
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                A confirmation dossier and itinerary details have been dispatched to{" "}
                <span className="text-amber-300 font-medium">{confirmation.guestEmail}</span>.
              </p>
            </div>

            <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-4 sm:p-6 text-left max-w-lg mx-auto space-y-3 sm:space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-2.5">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider">
                  Booking Reference
                </span>
                <span className="font-mono text-sm sm:text-base font-bold text-amber-300">
                  {confirmation.id}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-400 block text-[10px] sm:text-xs">Suite</span>
                  <span className="font-medium text-white">{confirmation.roomName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] sm:text-xs">Dates</span>
                  <span className="font-medium text-white">
                    {confirmation.checkIn} to {confirmation.checkOut} ({confirmation.nights} nights)
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] sm:text-xs">Primary Guest</span>
                  <span className="font-medium text-white">{confirmation.guestName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] sm:text-xs">Grand Total</span>
                  <span className="font-bold text-amber-400">
                    {formatCurrency(confirmation.totalPrice)}
                  </span>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-400/20 rounded-xl p-3 flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-[11px] text-amber-200/90 leading-relaxed">
                  Your VIP Butler will contact you 24 hours prior to arrival to confirm private transfer.
                </span>
              </div>
            </div>

            <Button onClick={handleReset} variant="default" className="w-full sm:w-auto px-8">
              Done & Return to Site
            </Button>
          </div>
        ) : (
          /* Form View */
          <div>
            <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 p-4 sm:p-6 border-b border-white/10">
              <DialogHeader>
                <div className="flex items-center gap-1.5 text-amber-400 text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Exclusive Direct Reservation</span>
                </div>
                <DialogTitle className="text-xl sm:text-2xl font-serif text-white">
                  Reserve Your Metropolitan Sanctuary
                </DialogTitle>
                <DialogDescription className="text-slate-400 text-xs sm:text-sm">
                  Enjoy complimentary airport transfers, bespoke Butler amenities, and flexible cancellation.
                </DialogDescription>
              </DialogHeader>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {errorMessage && (
                <div className="bg-red-500/15 border border-red-500/40 rounded-xl p-3 text-sm text-red-300">
                  {errorMessage}
                </div>
              )}

              {/* Suite Selection */}
              <div className="space-y-2">
                <Label htmlFor="roomSelect">Selected Suite</Label>
                <div className="relative">
                  <select
                    id="roomSelect"
                    value={selectedRoomId}
                    onChange={(e) => setSelectedRoomId(e.target.value)}
                    className="w-full bg-slate-900 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    {rooms.map((room) => (
                      <option key={room.id} value={room.id} className="bg-slate-950 text-white">
                        {room.name} — {formatCurrency(room.pricePerNight)} / night ({room.category})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dates & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="checkIn" className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>Check-In</span>
                  </Label>
                  <Input
                    id="checkIn"
                    type="date"
                    required
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="checkOut" className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>Check-Out</span>
                  </Label>
                  <Input
                    id="checkOut"
                    type="date"
                    required
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guests" className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    <span>Guests</span>
                  </Label>
                  <Input
                    id="guests"
                    type="number"
                    min={1}
                    max={selectedRoom.capacity}
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                  />
                </div>
              </div>

              {/* Guest Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="guestName">Full Name</Label>
                  <Input
                    id="guestName"
                    placeholder="e.g. Lord Alexander Hastings"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guestEmail">Email Address</Label>
                  <Input
                    id="guestEmail"
                    type="email"
                    placeholder="name@organization.com"
                    required
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guestPhone">Telephone / WhatsApp</Label>
                  <Input
                    id="guestPhone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div className="space-y-2">
                <Label htmlFor="requests">Bespoke Concierge Requests</Label>
                <Textarea
                  id="requests"
                  placeholder="Airport greeting time, dietary preferences, extra bedding, champagne brand..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>

              {/* Price Calculation Card */}
              <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-4 space-y-2 text-sm">
                <div className="flex justify-between text-slate-300">
                  <span>
                    {formatCurrency(selectedRoom.pricePerNight)} × {nights} {nights === 1 ? "night" : "nights"}
                  </span>
                  <span>{formatCurrency(baseTotal)}</span>
                </div>
                <div className="flex justify-between text-slate-400 text-xs">
                  <span>Metropolitan Hotel Tax & Luxury Services (14%)</span>
                  <span>{formatCurrency(taxesAndFees)}</span>
                </div>
                <div className="border-t border-white/10 pt-2 flex justify-between items-center text-base font-semibold">
                  <span className="text-white">Estimated Grand Total</span>
                  <span className="text-amber-400 text-xl font-bold">
                    {formatCurrency(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Submit Button & Guarantees */}
              <div className="space-y-3">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full text-base h-12 flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>
                    {isLoading
                      ? "Reserving Suite..."
                      : `Confirm Reservation • ${formatCurrency(grandTotal)}`}
                  </span>
                </Button>

                <div className="flex items-center justify-center gap-4 text-xs text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Instant Guarantee
                  </span>
                  <span>•</span>
                  <span>No prepayment needed today</span>
                  <span>•</span>
                  <span>Free cancellation up to 48h prior</span>
                </div>
              </div>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
