import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  Award,
  ArrowRight,
  Compass,
  UtensilsCrossed,
  Waves,
  Briefcase,
  Car,
  Star,
  CheckCircle2,
  CalendarCheck,
  PhoneCall,
  Crown,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSearch } from "@/components/HeroSearch";
import { RoomCard } from "@/components/RoomCard";
import { VirtualConcierge } from "@/components/VirtualConcierge";
import { Button } from "@/components/ui/button";
import { HOTEL_INFO, HOTEL_REVIEWS } from "@/lib/data/hotel-data";
import { getRooms } from "@/lib/db";

export default async function HomePage() {
  const allRooms = await getRooms();
  const featuredRooms = allRooms.filter((r) => r.featured).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#06090e] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-36 overflow-hidden">
        {/* Cinematic Background Imagery with Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2400&q=90"
            alt="The Luminary Hotel Metropolitan Skyline"
            className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06090e] via-[#06090e]/50 to-black/70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Top Pill Accolade */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-amber-400/40 bg-black/60 backdrop-blur-xl shadow-xl shadow-amber-500/10 animate-fade-in">
            <Crown className="w-4 h-4 text-amber-400" />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-300">
              Forbes Travel Guide 5-Star Honor • 2026
            </span>
          </div>

          {/* Main Title */}
          <div className="space-y-5">
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
              Elegance Above <br />
              <span className="gold-gradient-text">The Metropolitan Skyline</span>
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-300 font-light leading-relaxed">
              Rising 58 stories above the city, The Luminary pairs architectural grandeur with private butler service, Michelin gastronomy, and bespoke luxury residences.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
            <Link href="/rooms">
              <Button size="lg" className="h-14 px-9 text-base tracking-wide flex items-center gap-2.5 w-full sm:w-auto font-bold gold-glow">
                <span>Explore The Suites</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <Link href="/dining-and-events">
              <Button
                variant="outline"
                size="lg"
                className="h-14 px-9 text-base tracking-wide flex items-center gap-2.5 w-full sm:w-auto hover:border-amber-400/50"
              >
                <span>Private Dining & Galas</span>
              </Button>
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto text-center border-t border-white/10">
            <div className="space-y-1">
              <div className="text-3xl font-serif font-bold text-amber-400">58</div>
              <div className="text-[11px] text-slate-400 uppercase tracking-widest">Skyline Floors</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-serif font-bold text-amber-400">3-Star</div>
              <div className="text-[11px] text-slate-400 uppercase tracking-widest">Michelin Dining</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-serif font-bold text-amber-400">24/7</div>
              <div className="text-[11px] text-slate-400 uppercase tracking-widest">Dedicated Butler</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-serif font-bold text-amber-400">100%</div>
              <div className="text-[11px] text-slate-400 uppercase tracking-widest">Direct Guarantee</div>
            </div>
          </div>
        </div>
      </section>

      {/* FLOATING AVAILABILITY SEARCH BAR */}
      <HeroSearch />

      {/* FEATURED SUITES SECTION */}
      <section className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-amber-400 text-xs uppercase tracking-widest font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Signature Accommodations</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Featured Suites & Penthouses
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl font-light">
              Each residence is individually appointed with custom Italian Calacatta marble, floor-to-ceiling soundproof vistas, and dedicated butler pantries.
            </p>
          </div>

          <Link href="/rooms">
            <Button variant="outline" className="gap-2 shrink-0 border-white/20 hover:border-amber-400/50">
              <span>View All {allRooms.length} Suites</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>

      {/* THE METROPOLITAN EXPERIENCE PILLARS */}
      <section className="py-28 bg-gradient-to-b from-[#06090e] via-[#0d1424] to-[#06090e] border-y border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] font-semibold text-amber-400">
              <Compass className="w-4 h-4" />
              <span>The Luminary Standard</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white">
              An Elevated Way of Living
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-light">
              Beyond luxury lodging, The Luminary offers an ecosystem of high-altitude gastronomy, restorative wellness, and VIP diplomacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1: Michelin Dining */}
            <div className="glass-panel rounded-3xl p-7 space-y-4 hover:border-amber-400/50 transition-all duration-300 hover:-translate-y-1">
              <div className="w-13 h-13 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <UtensilsCrossed className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-white">Aura Sky Dining</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                3 Michelin-starred progressive tasting menus overseen by Master Chef Antoine Renoir on the 55th floor.
              </p>
              <div className="text-xs text-amber-400 font-semibold pt-2 flex items-center gap-1">
                <span>Priority Table Reservations for Guests</span>
              </div>
            </div>

            {/* Pillar 2: Hydro-Thermal Spa */}
            <div className="glass-panel rounded-3xl p-7 space-y-4 hover:border-amber-400/50 transition-all duration-300 hover:-translate-y-1">
              <div className="w-13 h-13 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Waves className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-white">Hydro-Thermal Spa</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                A 15,000 sq ft wellness sanctuary featuring heated rooftop infinity pools, Himalayan salt chambers, and cryotherapy.
              </p>
              <div className="text-xs text-amber-400 font-semibold pt-2 flex items-center gap-1">
                <span>Complimentary Hydrotherapy Access</span>
              </div>
            </div>

            {/* Pillar 3: Diplomatic & Corporate Boardrooms */}
            <div className="glass-panel rounded-3xl p-7 space-y-4 hover:border-amber-400/50 transition-all duration-300 hover:-translate-y-1">
              <div className="w-13 h-13 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-white">Executive Summits</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                Acoustically isolated boardrooms with global telepresence technology and dedicated private catering staff.
              </p>
              <div className="text-xs text-amber-400 font-semibold pt-2 flex items-center gap-1">
                <span>Secretarial & Security Escort Ready</span>
              </div>
            </div>

            {/* Pillar 4: Chauffeur & Private Fleet */}
            <div className="glass-panel rounded-3xl p-7 space-y-4 hover:border-amber-400/50 transition-all duration-300 hover:-translate-y-1">
              <div className="w-13 h-13 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Car className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-white">Rolls-Royce Fleet</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                House Phantom and Ghost sedans at your command for airport tarmac transfers and metropolitan engagements.
              </p>
              <div className="text-xs text-amber-400 font-semibold pt-2 flex items-center gap-1">
                <span>In-Suite Concierge Dispatch</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GUEST REVIEWS & ACCOLADES */}
      <section className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-amber-400 text-xs uppercase tracking-widest font-semibold">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>Verified Dispatches</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white">
            Words From Our Distinguished Guests
          </h2>
          <p className="text-slate-400 text-sm font-light">
            Read what global leaders, cultural figures, and discerning travelers share about their stay.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HOTEL_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="glass-panel rounded-3xl p-8 flex flex-col justify-between space-y-6 border border-white/10 hover:border-amber-400/40 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <blockquote className="text-slate-300 text-sm sm:text-base italic leading-relaxed font-serif">
                  "{review.comment}"
                </blockquote>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-between items-center text-xs">
                <div>
                  <div className="font-semibold text-white text-sm">{review.author}</div>
                  <div className="text-slate-400">{review.roleOrCity}</div>
                </div>
                <span className="text-amber-400/90 bg-white/5 px-2.5 py-1 rounded-md border border-white/5 font-medium">
                  {review.suiteType}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DIRECT BOOKING GUARANTEE BANNER */}
      <section className="py-20 bg-gradient-to-r from-amber-500/15 via-amber-600/20 to-amber-500/15 border-y border-amber-400/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Best Rate Direct Guarantee</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Reserve Directly with The Luminary
            </h3>
            <p className="text-slate-300 text-sm max-w-xl font-light">
              Enjoy complimentary $150 spa credit, guaranteed late 2:00 PM check-out, and daily gourmet champagne breakfast when booking directly on our site.
            </p>
          </div>

          <Link href="/rooms">
            <Button size="lg" className="shrink-0 text-base font-bold px-9 gold-glow">
              Explore Available Suites
            </Button>
          </Link>
        </div>
      </section>

      {/* Virtual Concierge Assistant */}
      <VirtualConcierge />

      <Footer />
    </div>
  );
}
