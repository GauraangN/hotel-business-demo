"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Sparkles, SlidersHorizontal, Search, Bed, Users, Building2, Check } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RoomCard } from "@/components/RoomCard";
import { Button } from "@/components/ui/button";
import { Room, RoomCategory } from "@/lib/types";
import { INITIAL_ROOMS } from "@/lib/data/hotel-data";

function RoomsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [rooms, setRooms] = useState<Room[]>(INITIAL_ROOMS);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categoryParam || "All"
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("recommended");
  const [guestFilter, setGuestFilter] = useState<string>("all");

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  // Load from API if available
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

  const categories = [
    "All",
    "Penthouse",
    "Skyline",
    "Presidential",
    "Executive",
    "Deluxe",
  ];

  const filteredRooms = useMemo(() => {
    let result = [...rooms];

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter(
        (r) => r.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Guest capacity filter
    if (guestFilter !== "all") {
      const minGuests = parseInt(guestFilter);
      result = result.filter((r) => r.capacity >= minGuests);
    }

    // Keyword search
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(term) ||
          r.description.toLowerCase().includes(term) ||
          r.amenities.some((a) => a.toLowerCase().includes(term))
      );
    }

    // Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.pricePerNight - a.pricePerNight);
    } else if (sortBy === "size") {
      result.sort((a, b) => b.sizeSqFt - a.sizeSqFt);
    } else {
      // recommended
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [rooms, selectedCategory, guestFilter, searchTerm, sortBy]);

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col">
      <Navbar />

      {/* Header Banner */}
      <section className="relative pt-36 pb-20 overflow-hidden border-b border-white/10 bg-gradient-to-b from-slate-950 via-[#0d1320] to-[#080c14]">
        <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-400/30 bg-amber-500/10 text-amber-300 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Luminary Accommodations</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
            Suites & Residences
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            Each luxury sanctuary features private elevator access, acoustically insulated floor-to-ceiling skyline views, and bespoke Hermès amenities.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
        <div className="glass-panel rounded-2xl p-4 sm:p-6 flex flex-col lg:flex-row items-center justify-between gap-4 border border-white/10 shadow-xl">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-semibold shadow-md shadow-amber-500/20"
                    : "bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-white/5"
                }`}
              >
                {cat === "All" ? "All Collections" : cat}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-60">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search amenities or suites..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900/90 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Capacity Filter */}
            <select
              value={guestFilter}
              onChange={(e) => setGuestFilter(e.target.value)}
              className="bg-slate-900/90 border border-white/10 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
            >
              <option value="all">Any Capacity</option>
              <option value="2">2+ Guests</option>
              <option value="4">4+ Guests</option>
              <option value="6">6+ Guests (Suites)</option>
            </select>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-900/90 border border-white/10 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
            >
              <option value="recommended">Recommended</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="size">Size: Largest First</option>
            </select>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex justify-between items-center text-xs text-slate-400 px-2">
          <span>
            Showing <strong className="text-white">{filteredRooms.length}</strong> luxury accommodations
          </span>
          {selectedCategory !== "All" && (
            <button
              onClick={() => setSelectedCategory("All")}
              className="text-amber-400 hover:underline"
            >
              Clear Category Filter
            </button>
          )}
        </div>

        {/* Rooms Grid */}
        {filteredRooms.length === 0 ? (
          <div className="glass-panel rounded-3xl p-12 text-center space-y-4 max-w-md mx-auto my-12">
            <Building2 className="w-12 h-12 text-amber-400 mx-auto" />
            <h3 className="text-xl font-serif text-white">No Suites Match Your Criteria</h3>
            <p className="text-sm text-slate-400">
              Try adjusting your category, keyword search, or guest capacity filters.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory("All");
                setSearchTerm("");
                setGuestFilter("all");
              }}
            >
              Reset All Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

export default function RoomsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#080c14] flex items-center justify-center text-amber-400">
          Loading Suites Directory...
        </div>
      }
    >
      <RoomsContent />
    </Suspense>
  );
}
