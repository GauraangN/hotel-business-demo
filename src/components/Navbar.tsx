"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Menu, X, ShieldCheck, CalendarCheck, PhoneCall, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { HOTEL_INFO } from "@/lib/data/hotel-data";
import { BookingModal } from "./BookingModal";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Suites & Penthouses", href: "/rooms" },
    { name: "Dining & Events", href: "/dining-and-events" },
    { name: "VIP Concierge", href: "/contact" },
    { name: "Operations Portal", href: "/admin" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#06090e]/90 backdrop-blur-2xl border-b border-amber-500/20 shadow-2xl py-3.5"
            : "bg-gradient-to-b from-[#06090e]/95 via-[#06090e]/60 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/25 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-slate-950" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-[0.22em] font-bold text-white group-hover:text-amber-300 transition-colors">
                THE LUMINARY
              </span>
              <span className="text-[9px] tracking-[0.35em] uppercase text-amber-400/90 font-medium">
                Hotel & Residences
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs uppercase tracking-widest font-medium transition-colors hover:text-amber-300 ${
                    isActive ? "text-amber-400 font-bold border-b border-amber-400/80 pb-0.5" : "text-slate-300"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-5">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>USD ($)</span>
            </div>

            <a
              href={`tel:${HOTEL_INFO.phone}`}
              className="text-xs text-slate-300 hover:text-amber-400 flex items-center gap-1.5 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>{HOTEL_INFO.phone}</span>
            </a>

            <Button
              variant="default"
              size="sm"
              onClick={() => setBookingModalOpen(true)}
              className="flex items-center gap-2 gold-glow-sm"
            >
              <CalendarCheck className="w-4 h-4 text-slate-950" />
              <span>Reserve Suite</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <Button
              variant="default"
              size="sm"
              onClick={() => setBookingModalOpen(true)}
              className="text-xs px-3 py-1.5"
            >
              Reserve
            </Button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-950/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm uppercase tracking-wider text-slate-200 hover:text-amber-400 py-2 border-b border-white/5"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2 flex flex-col gap-3">
              <Button
                variant="default"
                className="w-full justify-center"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setBookingModalOpen(true);
                }}
              >
                Reserve a Suite
              </Button>
              <div className="text-center text-xs text-slate-400 pt-2 flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Forbes 5-Star Honor • Best Rate Guarantee</span>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </>
  );
}
