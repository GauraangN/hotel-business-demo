import React from "react";
import Link from "next/link";
import { Sparkles, MapPin, Phone, Mail, Award, ShieldCheck, Heart } from "lucide-react";
import { HOTEL_INFO } from "@/lib/data/hotel-data";

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/10 text-slate-400 relative overflow-hidden pt-16 pb-12">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-amber-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center text-slate-950 font-bold">
                <Sparkles className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <span className="font-serif text-xl tracking-[0.2em] font-bold text-white block">
                  THE LUMINARY
                </span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-amber-400">
                  Hotel & Residences
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {HOTEL_INFO.description}
            </p>

            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-amber-300">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Forbes Travel Guide 5-Star</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-amber-300">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Michelin Key 2026</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-slate-200 font-semibold">
              The Residences
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/rooms" className="hover:text-amber-400 transition-colors">
                  All Suites & Rooms
                </Link>
              </li>
              <li>
                <Link href="/rooms?category=Penthouse" className="hover:text-amber-400 transition-colors">
                  Penthouse Collection
                </Link>
              </li>
              <li>
                <Link href="/rooms?category=Skyline" className="hover:text-amber-400 transition-colors">
                  Skyline Executive Suites
                </Link>
              </li>
              <li>
                <Link href="/rooms?category=Presidential" className="hover:text-amber-400 transition-colors">
                  Diplomatic Suites
                </Link>
              </li>
              <li>
                <Link href="/dining-and-events" className="hover:text-amber-400 transition-colors">
                  Private Galas & Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Hotel Experience */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-slate-200 font-semibold">
              Hospitality & Dining
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="hover:text-amber-400 transition-colors cursor-pointer">
                  Aura Sky Restaurant (3 Michelin Stars)
                </span>
              </li>
              <li>
                <span className="hover:text-amber-400 transition-colors cursor-pointer">
                  The Obsidian Lounge & Bar
                </span>
              </li>
              <li>
                <span className="hover:text-amber-400 transition-colors cursor-pointer">
                  Hydro-Thermal Wellness Spa
                </span>
              </li>
              <li>
                <span className="hover:text-amber-400 transition-colors cursor-pointer">
                  24/7 Butler & Chauffeur Services
                </span>
              </li>
              <li>
                <Link href="/admin" className="text-amber-400/90 hover:text-amber-300 font-medium transition-colors">
                  Admin Management Portal →
                </Link>
              </li>
            </ul>
          </div>

          {/* Concierge Contact */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-slate-200 font-semibold">
              VIP Concierge
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{HOTEL_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{HOTEL_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{HOTEL_INFO.conciergeEmail}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Techstack & Copyright Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 {HOTEL_INFO.name}. All rights reserved.</p>
          <div className="flex items-center gap-2 text-slate-400">
            <span>Powered by Next.js 15, TypeScript, Tailwind CSS v4 & Supabase PostgreSQL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
