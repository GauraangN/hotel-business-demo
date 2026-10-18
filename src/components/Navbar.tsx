"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Menu, X, ShieldCheck, CalendarCheck, PhoneCall, Globe, ArrowRight } from "lucide-react";
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
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

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
            ? "bg-[#06090e]/95 backdrop-blur-2xl border-b border-amber-500/20 shadow-2xl py-3"
            : "bg-gradient-to-b from-[#06090e]/95 via-[#06090e]/70 to-transparent py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="group flex items-center gap-2.5 sm:gap-3" onClick={() => setMobileMenuOpen(false)}>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/25 group-hover:scale-105 transition-transform shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base sm:text-lg tracking-[0.2em] font-bold text-white group-hover:text-amber-300 transition-colors leading-tight">
                THE LUMINARY
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.3em] uppercase text-amber-400/90 font-medium">
                Hotel & Residences
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8">
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

          {/* Right Action Buttons - Desktop */}
          <div className="hidden lg:flex items-center gap-4">
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

          {/* Mobile Right Bar: Reserve + Burger */}
          <div className="flex items-center gap-2 md:hidden">
            <Button
              variant="default"
              size="sm"
              onClick={() => setBookingModalOpen(true)}
              className="text-xs px-3 h-9 font-semibold gold-glow-sm"
            >
              Reserve
            </Button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-xl bg-white/5 border border-white/10"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Full-screen Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-[60px] bottom-0 bg-[#06090e]/98 backdrop-blur-3xl border-b border-amber-500/20 px-6 py-6 flex flex-col justify-between overflow-y-auto z-50 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="space-y-4">
              <div className="text-[10px] uppercase tracking-widest text-amber-400/90 font-semibold border-b border-white/10 pb-2">
                Navigation Directory
              </div>
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between text-base uppercase tracking-wider py-3 border-b border-white/5 transition-colors ${
                      isActive ? "text-amber-400 font-bold" : "text-slate-200 hover:text-amber-300"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                  </Link>
                );
              })}
            </div>

            {/* Mobile Drawer Bottom Actions */}
            <div className="space-y-4 pt-6">
              <Button
                variant="default"
                size="lg"
                className="w-full justify-center h-12 text-sm font-bold gold-glow"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setBookingModalOpen(true);
                }}
              >
                Reserve Your Suite Now
              </Button>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white">VIP Butler Dispatch</div>
                  <div className="text-[11px] text-slate-400">{HOTEL_INFO.phone}</div>
                </div>
                <a
                  href={`tel:${HOTEL_INFO.phone}`}
                  className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold"
                >
                  <PhoneCall className="w-4 h-4 text-slate-950" />
                </a>
              </div>

              <div className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Forbes 5-Star Honor • Best Rate Direct Guarantee</span>
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
