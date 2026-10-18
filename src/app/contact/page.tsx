"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Clock,
  Compass,
  Car,
  Plane,
  CheckCircle2,
  Send,
  ShieldCheck,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { HOTEL_INFO } from "@/lib/data/hotel-data";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Concierge Request");
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
          eventType: "General Enquiry",
          message: `[${subject}]: ${message}`,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Submission failed");
      }

      setIsSuccess(true);
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#D4AF37", "#ffffff"],
      });
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to reach concierge. Please try again.");
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
            <span>24/7 Dedicated Concierge & Butler Dispatch</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
            Connect With The Luminary
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            Whether coordinating Rolls-Royce tarmac transfers, reserving private dining salons, or customizing in-suite amenities, our concierge desk is at your continuous command.
          </p>
        </div>
      </section>

      {/* Main Content: Info Cards + Contact Form */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-16">
        {/* Contact Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel rounded-2xl p-6 space-y-3 border border-white/10 hover:border-amber-400/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-semibold text-white">Metropolitan Address</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              {HOTEL_INFO.address}
            </p>
            <div className="text-xs text-amber-400 pt-1">
              Valet & Secure Underground Parking
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6 space-y-3 border border-white/10 hover:border-amber-400/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-semibold text-white">Immediate Dispatch</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Reservations: {HOTEL_INFO.phone} <br />
              VIP Butler Desk: +1 (212) 555-8901
            </p>
            <div className="text-xs text-emerald-400 pt-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Available 24 Hours / 7 Days</span>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6 space-y-3 border border-white/10 hover:border-amber-400/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-semibold text-white">Direct Correspondence</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              General: {HOTEL_INFO.reservationsEmail} <br />
              VIP: {HOTEL_INFO.conciergeEmail}
            </p>
            <div className="text-xs text-amber-400 pt-1">
              Encrypted Confidential Communications
            </div>
          </div>
        </div>

        {/* Airport Transfers Grid */}
        <div className="p-8 rounded-3xl glass-panel border border-white/10 space-y-6">
          <div className="flex items-center gap-3">
            <Plane className="w-6 h-6 text-amber-400" />
            <h3 className="text-xl font-serif font-bold text-white">
              Private Aviation & Airport Transfers
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-slate-300">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5">
              <div className="font-semibold text-white">Teterboro (TEB)</div>
              <div className="text-slate-400 pt-1">Private FBO Tarmac Escort • 25 mins</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5">
              <div className="font-semibold text-white">JFK International</div>
              <div className="text-slate-400 pt-1">VIP Customs Clearance & Rolls-Royce • 40 mins</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5">
              <div className="font-semibold text-white">Newark Liberty (EWR)</div>
              <div className="text-slate-400 pt-1">Direct Chauffeur Transfer • 35 mins</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5">
              <div className="font-semibold text-white">Metropolitan Helipad</div>
              <div className="text-slate-400 pt-1">East 34th Street Pier • 8 mins</div>
            </div>
          </div>
        </div>

        {/* Contact / Dispatch Form */}
        <div className="max-w-3xl mx-auto glass-panel-gold rounded-3xl p-6 sm:p-10 border border-amber-500/30">
          {isSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white">
                Dispatch Sent to Head Concierge
              </h3>
              <p className="text-slate-300 text-sm max-w-md mx-auto">
                Thank you, <strong className="text-amber-300">{name}</strong>. Our Head Concierge will reply to your inquiry within 30 minutes.
              </p>
              <Button variant="outline" onClick={() => setIsSuccess(false)}>
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2 text-center sm:text-left">
                <h3 className="text-2xl font-serif font-bold text-white">
                  Send a Direct Concierge Message
                </h3>
                <p className="text-slate-400 text-sm">
                  Please provide your contact information and details regarding your upcoming visit or special requirements.
                </p>
              </div>

              {errorMessage && (
                <div className="bg-red-500/15 border border-red-500/40 rounded-xl p-3 text-sm text-red-300">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cName">Your Name</Label>
                  <Input
                    id="cName"
                    required
                    placeholder="e.g. Lord Alexander Hastings"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cEmail">Email Address</Label>
                  <Input
                    id="cEmail"
                    type="email"
                    required
                    placeholder="name@organization.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cPhone">Telephone</Label>
                  <Input
                    id="cPhone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cSubject">Nature of Request</Label>
                  <select
                    id="cSubject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Concierge Request">VIP Concierge & Dining Request</option>
                    <option value="Airport Transfer">Airport & Helicopter Transfer</option>
                    <option value="Long Term Residence">Extended Residence / Diplomatic Stay</option>
                    <option value="Press Inquiries">Media & Brand Partnerships</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cMessage">Message</Label>
                <Textarea
                  id="cMessage"
                  required
                  placeholder="Detail your request or timeline..."
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
                <span>{isLoading ? "Dispatching..." : "Send Concierge Message"}</span>
              </Button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
