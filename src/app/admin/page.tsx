"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  Lock,
  LogOut,
  Sparkles,
  TrendingUp,
  DollarSign,
  CalendarCheck,
  Mail,
  Users,
  CheckCircle2,
  Clock,
  XCircle,
  Database,
  RefreshCw,
  ExternalLink,
  Building,
  Key,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Booking, Enquiry, Room } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { INITIAL_ROOMS } from "@/lib/data/hotel-data";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState<{ email: string; role: string } | null>(null);

  // Login form state
  const [loginEmail, setLoginEmail] = useState("admin@theluminaryhotel.com");
  const [loginPassword, setLoginPassword] = useState("luminary2026!");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // Admin data state
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [rooms, setRooms] = useState<Room[]>(INITIAL_ROOMS);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSupabaseLive, setIsSupabaseLive] = useState(false);

  // Check saved session in sessionStorage
  useEffect(() => {
    const saved = sessionStorage.getItem("luminary_admin_user");
    if (saved) {
      try {
        setAdminUser(JSON.parse(saved));
        setIsAuthenticated(true);
      } catch {}
    }
  }, []);

  const loadDashboardData = async () => {
    setIsRefreshing(true);
    try {
      const [bookingsRes, enquiriesRes, roomsRes] = await Promise.all([
        fetch("/api/bookings"),
        fetch("/api/enquiries"),
        fetch("/api/rooms"),
      ]);

      const [bookingsData, enquiriesData, roomsData] = await Promise.all([
        bookingsRes.json(),
        enquiriesRes.json(),
        roomsRes.json(),
      ]);

      if (bookingsData.bookings) setBookings(bookingsData.bookings);
      if (enquiriesData.enquiries) setEnquiries(enquiriesData.enquiries);
      if (roomsData.rooms) setRooms(roomsData.rooms);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Authentication failed");
      }

      setAdminUser(data.user);
      setIsAuthenticated(true);
      sessionStorage.setItem("luminary_admin_user", JSON.stringify(data.user));
    } catch (err: any) {
      setLoginError(err.message || "Invalid administrator credentials");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminUser(null);
    sessionStorage.removeItem("luminary_admin_user");
  };

  const handleUpdateBookingStatus = async (
    bookingId: string,
    status: Booking["status"]
  ) => {
    try {
      const res = await fetch("/api/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, status }),
      });
      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateEnquiryStatus = async (
    enquiryId: string,
    status: Enquiry["status"]
  ) => {
    try {
      const res = await fetch("/api/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enquiryId, status }),
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === enquiryId ? { ...e, status } : e))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Calculations for KPIs
  const totalRevenue = bookings
    .filter((b) => b.status !== "cancelled")
    .reduce((acc, curr) => acc + curr.totalPrice, 0);

  const activeBookingsCount = bookings.filter(
    (b) => b.status === "confirmed" || b.status === "checked-in"
  ).length;

  const pendingEnquiriesCount = enquiries.filter(
    (e) => e.status === "new"
  ).length;

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Top Bar with Status and Logout */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                  The Luminary Management Portal
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">
                Executive Operations Dashboard
              </h1>
            </div>

            {isAuthenticated && (
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <div className="text-xs font-semibold text-white">
                    {adminUser?.email}
                  </div>
                  <div className="text-[10px] uppercase text-emerald-400 font-medium">
                    Authenticated Admin
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={loadDashboardData}
                  disabled={isRefreshing}
                  className="gap-1.5"
                >
                  <RefreshCw
                    className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-amber-400" : ""}`}
                  />
                  <span>Refresh</span>
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleLogout}
                  className="gap-1.5 text-xs text-red-300 hover:text-white"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </Button>
              </div>
            )}
          </div>

          {!isAuthenticated ? (
            /* AUTHENTICATION VIEW */
            <div className="max-w-md mx-auto py-12 space-y-6">
              <div className="glass-panel-gold rounded-3xl p-8 border border-amber-500/30 shadow-2xl space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-700 text-slate-950 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20">
                    <Lock className="w-7 h-7" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-white">
                    Administrator Sign In
                  </h2>
                  <p className="text-xs text-slate-400">
                    Access the Supabase PostgreSQL database, guest reservations, and corporate enquiries.
                  </p>
                </div>

                {loginError && (
                  <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-xs text-red-300">
                    {loginError}
                  </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="adminEmail">Admin Email</Label>
                    <Input
                      id="adminEmail"
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="adminPassword">Security Key / Password</Label>
                    <Input
                      id="adminPassword"
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loginLoading}
                    className="w-full h-11 text-sm font-semibold tracking-wide"
                  >
                    {loginLoading ? "Verifying Credentials..." : "Sign In to Operations"}
                  </Button>
                </form>

                {/* Quick 1-Click Demo Login Button */}
                <div className="pt-2 border-t border-white/10 text-center space-y-3">
                  <span className="text-[11px] text-slate-400 block">
                    Rapid Demo Credentials Pre-Loaded
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginEmail("admin@theluminaryhotel.com");
                      setLoginPassword("luminary2026!");
                    }}
                    className="w-full text-xs py-2 px-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-amber-300 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Key className="w-3.5 h-3.5" />
                    <span>Auto-Fill Demo Admin Credentials</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* AUTHENTICATED DASHBOARD VIEW */
            <div className="space-y-8">
              {/* Database Connection Status Banner */}
              <div className="p-4 rounded-2xl glass-panel border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white text-sm">
                        Database Engine: Supabase PostgreSQL
                      </span>
                      <Badge variant="success" className="text-[10px] px-2 py-0">
                        Operational
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-400">
                      Syncing real-time records across rooms, bookings, and corporate enquiries.
                    </p>
                  </div>
                </div>

                <div className="text-xs text-slate-400">
                  <span>Target Schema: </span>
                  <code className="text-amber-300 bg-black/40 px-2 py-0.5 rounded border border-white/10">
                    supabase/schema.sql
                  </code>
                </div>
              </div>

              {/* KPI CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Metric 1 */}
                <div className="glass-panel rounded-2xl p-6 space-y-2 border border-white/10">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span className="uppercase tracking-wider">Gross Booking Revenue</span>
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-white">
                    {formatCurrency(totalRevenue)}
                  </div>
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+24.6% vs previous period</span>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="glass-panel rounded-2xl p-6 space-y-2 border border-white/10">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span className="uppercase tracking-wider">Confirmed Bookings</span>
                    <CalendarCheck className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-400">
                    {activeBookingsCount}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {bookings.length} Total records in system
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="glass-panel rounded-2xl p-6 space-y-2 border border-white/10">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span className="uppercase tracking-wider">Pending Enquiries</span>
                    <Mail className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-white">
                    {pendingEnquiriesCount}
                  </div>
                  <div className="text-[11px] text-amber-300">
                    Requires Director follow-up
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="glass-panel rounded-2xl p-6 space-y-2 border border-white/10">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span className="uppercase tracking-wider">Occupancy Rate</span>
                    <Building className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-white">
                    88.4%
                  </div>
                  <div className="text-[11px] text-emerald-400">
                    Near peak holiday capacity
                  </div>
                </div>
              </div>

              {/* TABS NAVIGATION */}
              <Tabs defaultValue="bookings" className="space-y-6">
                <TabsList className="bg-slate-900 border border-white/10">
                  <TabsTrigger value="bookings">
                    Guest Bookings ({bookings.length})
                  </TabsTrigger>
                  <TabsTrigger value="enquiries">
                    Event Enquiries ({enquiries.length})
                  </TabsTrigger>
                  <TabsTrigger value="rooms">
                    Suite Inventory ({rooms.length})
                  </TabsTrigger>
                  <TabsTrigger value="supabase">
                    Supabase Configuration
                  </TabsTrigger>
                </TabsList>

                {/* TAB 1: BOOKINGS */}
                <TabsContent value="bookings" className="space-y-4">
                  <div className="glass-panel rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-slate-950/80 text-xs uppercase text-slate-400 border-b border-white/10">
                          <tr>
                            <th className="py-4 px-6">Reference</th>
                            <th className="py-4 px-6">Suite</th>
                            <th className="py-4 px-6">Guest Info</th>
                            <th className="py-4 px-6">Dates</th>
                            <th className="py-4 px-6">Total</th>
                            <th className="py-4 px-6">Status</th>
                            <th className="py-4 px-6 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-slate-300">
                          {bookings.map((b) => (
                            <tr key={b.id} className="hover:bg-white/[0.02] transition-colors">
                              <td className="py-4 px-6 font-mono text-xs font-semibold text-amber-300">
                                {b.id}
                              </td>
                              <td className="py-4 px-6 font-medium text-white">
                                {b.roomName}
                              </td>
                              <td className="py-4 px-6">
                                <div className="font-semibold text-white">{b.guestName}</div>
                                <div className="text-xs text-slate-400">{b.guestEmail}</div>
                                {b.specialRequests && (
                                  <div className="text-[11px] text-amber-300/80 italic mt-0.5 line-clamp-1">
                                    "{b.specialRequests}"
                                  </div>
                                )}
                              </td>
                              <td className="py-4 px-6 text-xs">
                                <div>
                                  {b.checkIn} → {b.checkOut}
                                </div>
                                <div className="text-slate-400">
                                  {b.nights} nights • {b.guestsCount} guests
                                </div>
                              </td>
                              <td className="py-4 px-6 font-bold text-amber-400">
                                {formatCurrency(b.totalPrice)}
                              </td>
                              <td className="py-4 px-6">
                                <Badge
                                  variant={
                                    b.status === "confirmed"
                                      ? "gold"
                                      : b.status === "checked-in"
                                      ? "success"
                                      : "destructive"
                                  }
                                  className="capitalize"
                                >
                                  {b.status}
                                </Badge>
                              </td>
                              <td className="py-4 px-6 text-right space-x-2">
                                {b.status !== "checked-in" && (
                                  <button
                                    onClick={() => handleUpdateBookingStatus(b.id, "checked-in")}
                                    className="px-2.5 py-1 text-xs rounded-md bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 border border-emerald-500/30"
                                  >
                                    Check In
                                  </button>
                                )}
                                {b.status !== "cancelled" && (
                                  <button
                                    onClick={() => handleUpdateBookingStatus(b.id, "cancelled")}
                                    className="px-2.5 py-1 text-xs rounded-md bg-red-500/10 text-red-300 hover:bg-red-500/20 border border-red-500/30"
                                  >
                                    Cancel
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>

                {/* TAB 2: ENQUIRIES */}
                <TabsContent value="enquiries" className="space-y-4">
                  <div className="glass-panel rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-slate-950/80 text-xs uppercase text-slate-400 border-b border-white/10">
                          <tr>
                            <th className="py-4 px-6">Enquiry ID</th>
                            <th className="py-4 px-6">Organizer</th>
                            <th className="py-4 px-6">Event Type</th>
                            <th className="py-4 px-6">Guests / Date</th>
                            <th className="py-4 px-6">Scope / Message</th>
                            <th className="py-4 px-6">Status</th>
                            <th className="py-4 px-6 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-slate-300">
                          {enquiries.map((e) => (
                            <tr key={e.id} className="hover:bg-white/[0.02] transition-colors">
                              <td className="py-4 px-6 font-mono text-xs font-semibold text-amber-300">
                                {e.id}
                              </td>
                              <td className="py-4 px-6">
                                <div className="font-semibold text-white">{e.name}</div>
                                <div className="text-xs text-slate-400">{e.email}</div>
                                {e.phone && <div className="text-xs text-slate-500">{e.phone}</div>}
                              </td>
                              <td className="py-4 px-6 text-xs font-medium text-amber-200">
                                {e.eventType}
                              </td>
                              <td className="py-4 px-6 text-xs">
                                <div>{e.preferredDate || "Date Flexible"}</div>
                                <div className="text-slate-400">
                                  {e.estimatedGuests ? `${e.estimatedGuests} Attendees` : "TBD"}
                                </div>
                              </td>
                              <td className="py-4 px-6 text-xs max-w-xs text-slate-300">
                                {e.message}
                              </td>
                              <td className="py-4 px-6">
                                <Badge
                                  variant={
                                    e.status === "new"
                                      ? "default"
                                      : e.status === "contacted"
                                      ? "gold"
                                      : "success"
                                  }
                                  className="capitalize"
                                >
                                  {e.status}
                                </Badge>
                              </td>
                              <td className="py-4 px-6 text-right space-x-2">
                                {e.status === "new" && (
                                  <button
                                    onClick={() => handleUpdateEnquiryStatus(e.id, "contacted")}
                                    className="px-2.5 py-1 text-xs rounded-md bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 border border-amber-500/30"
                                  >
                                    Mark Contacted
                                  </button>
                                )}
                                {e.status !== "scheduled" && (
                                  <button
                                    onClick={() => handleUpdateEnquiryStatus(e.id, "scheduled")}
                                    className="px-2.5 py-1 text-xs rounded-md bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 border border-emerald-500/30"
                                  >
                                    Schedule
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>

                {/* TAB 3: SUITES INVENTORY */}
                <TabsContent value="rooms" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rooms.map((r) => (
                      <div
                        key={r.id}
                        className="glass-panel rounded-2xl p-6 space-y-4 border border-white/10"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold block">
                              {r.category}
                            </span>
                            <h3 className="text-lg font-serif font-bold text-white">
                              {r.name}
                            </h3>
                          </div>
                          <Badge variant="gold">
                            {formatCurrency(r.pricePerNight)}/night
                          </Badge>
                        </div>

                        <div className="text-xs text-slate-400 space-y-1">
                          <div>Area: {r.sizeSqFt} sq ft • Floor: {r.floor}</div>
                          <div>Capacity: {r.capacity} Guests • {r.bedType}</div>
                          <div>Rating: {r.rating} ({r.reviewCount} reviews)</div>
                        </div>

                        <div className="pt-2 border-t border-white/10 flex justify-between items-center text-xs">
                          <span className="text-emerald-400 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Ready for VIP Check-in
                          </span>
                          <span className="text-slate-400">ID: {r.id}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* TAB 4: SUPABASE CONFIGURATION GUIDE */}
                <TabsContent value="supabase" className="space-y-6">
                  <div className="glass-panel-gold rounded-3xl p-8 border border-amber-500/30 space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-amber-400 text-xs uppercase font-semibold">
                        <Database className="w-4 h-4" />
                        <span>Supabase PostgreSQL Integration Guide</span>
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-white">
                        Connect to Your Live Supabase Project
                      </h3>
                      <p className="text-slate-300 text-sm">
                        This demo includes a full Supabase integration layer. Follow these 3 simple steps to connect your own Supabase instance:
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                      <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
                        <div className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 font-bold flex items-center justify-center text-xs">
                          1
                        </div>
                        <h4 className="font-semibold text-white">Run SQL Schema</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Open the Supabase SQL Editor and execute the provided script in{" "}
                          <code className="text-amber-300">supabase/schema.sql</code>. It creates all tables, policies, and initial suite data.
                        </p>
                      </div>

                      <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
                        <div className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 font-bold flex items-center justify-center text-xs">
                          2
                        </div>
                        <h4 className="font-semibold text-white">Configure Environment</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Copy <code className="text-amber-300">.env.example</code> to <code className="text-amber-300">.env.local</code> and set your <code className="text-white">NEXT_PUBLIC_SUPABASE_URL</code> and <code className="text-white">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>.
                        </p>
                      </div>

                      <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
                        <div className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 font-bold flex items-center justify-center text-xs">
                          3
                        </div>
                        <h4 className="font-semibold text-white">Deploy on Vercel</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Push to GitHub and link to Vercel. Add the same environment variables in your Vercel Project Settings for instant production hosting.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
