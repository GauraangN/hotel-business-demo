"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  Sparkles,
  UtensilsCrossed,
  GlassWater,
  Building,
  Users,
  Calendar,
  CheckCircle2,
  Mail,
  Send,
  Clock,
  Award,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { EventType } from "@/lib/types";

export default function DiningAndEventsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eventType, setEventType] = useState<EventType>("Corporate Gala");
  const [preferredDate, setPreferredDate] = useState("");
  const [estimatedGuests, setEstimatedGuests] = useState("");
  const [message, setMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          eventType,
          preferredDate: preferredDate || undefined,
          estimatedGuests: estimatedGuests ? Number(estimatedGuests) : undefined,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to submit enquiry");
      }

      setIsSuccess(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#D4AF37", "#f59e0b", "#ffffff"],
      });
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to submit enquiry. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col">
      <Navbar />

      {/* Header Banner */}
      <section className="relative pt-36 pb-20 overflow-hidden border-b border-white/10 bg-gradient-to-b from-slate-950 via-[#0d1320] to-[#080c14]">
        <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-400/30 bg-amber-500/10 text-amber-300 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Culinary Masterpieces & Grand Celebrations</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
            Dining & Private Events
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            From 3 Michelin-starred tasting menus 55 floors above the metropolis to gala ballrooms hosting international summits and private celebrations.
          </p>
        </div>
      </section>

      {/* CULINARY VENUES */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
            Gastronomy
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            Our Fine Dining Venues
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Venue 1: Aura Sky Dining */}
          <div className="group rounded-3xl overflow-hidden border border-white/10 bg-slate-900/60 backdrop-blur-md flex flex-col hover:border-amber-400/40 transition-all duration-300">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80"
                alt="Aura Sky Dining Restaurant"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-amber-400/30 flex items-center gap-1.5 text-xs text-amber-300 font-semibold">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>3 Michelin Stars</span>
              </div>
              <div className="absolute bottom-4 left-4 text-xs bg-slate-950/80 px-3 py-1 rounded-md text-slate-300">
                55th Floor • Panoramic Skyline View
              </div>
            </div>

            <div className="p-5 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-2xl font-serif font-semibold text-white">
                  Aura Sky Dining
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-light">
                  Helmed by Master Chef Antoine Renoir, Aura showcases modern French technique married with rare global harvests. Features a 9-course seasonal tasting menu paired with selections from our 8,000-bottle subterranean cellar.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  Dinner: 6:00 PM – 11:30 PM
                </span>
                <span className="text-amber-400 font-semibold">Reservations Required</span>
              </div>
            </div>
          </div>

          {/* Venue 2: The Obsidian Lounge */}
          <div className="group rounded-3xl overflow-hidden border border-white/10 bg-slate-900/60 backdrop-blur-md flex flex-col hover:border-amber-400/40 transition-all duration-300">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80"
                alt="The Obsidian Bar and Terrace"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-xs text-white font-semibold">
                High-Altitude Mixology
              </div>
              <div className="absolute bottom-4 left-4 text-xs bg-slate-950/80 px-3 py-1 rounded-md text-slate-300">
                56th Floor • Open-Air Fireplace Terrace
              </div>
            </div>

            <div className="p-5 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-2xl font-serif font-semibold text-white">
                  The Obsidian Lounge & Terrace
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-light">
                  An intimate nocturnal retreat celebrating artisanal spirits, Japanese single malts, and hand-crafted botanical infusions. Unwind by the bronze fire table while taking in unobstructed views of the sunset over the river.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  Daily: 5:00 PM – 2:00 AM
                </span>
                <span className="text-amber-400 font-semibold">Dress Code: Smart Sophisticated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EVENT SPACES */}
      <section className="py-20 bg-gradient-to-b from-slate-950 via-[#0a0f1d] to-slate-950 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
              Event Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Grand Gala & Summit Spaces
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel rounded-2xl p-6 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                <Building className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-white">
                The Grand Aurelia Ballroom
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Spanning 8,500 sq ft with 24-foot ceilings, custom Baccarat crystal chandeliers, and an integrated 8K panoramic display wall. Accommodates up to 500 banquet guests.
              </p>
              <div className="text-xs text-amber-400 font-medium">Capacity: 500 Guests</div>
            </div>

            <div className="glass-panel rounded-2xl p-6 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-white">
                Diplomatic Boardroom
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Acoustically isolated executive suite featuring leather Eames seating for 24, secure global telepresence array, and a private sommelier dining salon.
              </p>
              <div className="text-xs text-amber-400 font-medium">Capacity: 24 C-Level Attendees</div>
            </div>

            <div className="glass-panel rounded-2xl p-6 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-white">
                Skyline Pavilion Terrace
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                An open-air heated terrace with glass balustrades offering full skyline backdrops. The definitive setting for cocktail galas and luxury product releases.
              </p>
              <div className="text-xs text-amber-400 font-medium">Capacity: 150 Cocktail Guests</div>
            </div>
          </div>
        </div>
      </section>

      {/* EVENT ENQUIRY FORM */}
      <section id="enquiry-section" className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
            Reserve Your Occasion
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white">
            Plan a Private Event
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Our dedicated Director of Events and culinary sommeliers will craft a bespoke proposal tailored to your vision.
          </p>
        </div>

        <div className="glass-panel-gold rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 shadow-2xl border border-amber-500/30">
          {isSuccess ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white">
                Enquiry Dispatched Successfully
              </h3>
              <p className="text-slate-300 text-sm max-w-md mx-auto">
                Thank you, <strong className="text-amber-300">{name}</strong>. Our Event Director has received your dossier for the{" "}
                <span className="text-amber-300 font-semibold">{eventType}</span> and will reach out within 4 business hours.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setIsSuccess(false);
                  setName("");
                  setEmail("");
                  setPhone("");
                  setMessage("");
                }}
              >
                Submit Another Enquiry
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="bg-red-500/15 border border-red-500/40 rounded-xl p-3 text-sm text-red-300">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contactName">Organizer / Contact Name</Label>
                  <Input
                    id="contactName"
                    placeholder="e.g. Victoria Vanguard"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Corporate or Personal Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    placeholder="events@organization.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Phone / Direct Line</Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    placeholder="+1 (212) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eventTypeSelect">Event Classification</Label>
                  <select
                    id="eventTypeSelect"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value as EventType)}
                    className="w-full bg-slate-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Corporate Gala" className="bg-slate-950">Corporate Gala</option>
                    <option value="Executive Board Meeting" className="bg-slate-950">Executive Board Meeting</option>
                    <option value="Luxury Wedding" className="bg-slate-950">Luxury Wedding</option>
                    <option value="Private Dinner" className="bg-slate-950">Private Dinner & Tasting</option>
                    <option value="Product Launch" className="bg-slate-950">Product Launch</option>
                    <option value="General Enquiry" className="bg-slate-950">General Event Enquiry</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guestCountInput">Estimated Attendees</Label>
                  <Input
                    id="guestCountInput"
                    type="number"
                    placeholder="e.g. 150"
                    value={estimatedGuests}
                    onChange={(e) => setEstimatedGuests(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredDateInput">Preferred Date of Event</Label>
                <Input
                  id="preferredDateInput"
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventMessage">Scope of Vision & Technical Requirements</Label>
                <Textarea
                  id="eventMessage"
                  required
                  placeholder="Detail catering preferences, AV needs, stage requirements, or VIP security protocol..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 text-base font-semibold tracking-wide flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{isLoading ? "Submitting Dossier..." : "Submit Event Enquiry"}</span>
              </Button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
