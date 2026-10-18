import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  Users,
  Maximize2,
  Bed,
  Building,
  Eye,
  CheckCircle2,
  ShieldCheck,
  Star,
  ChevronLeft,
  Calendar,
  Phone,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getRoomBySlug, getRooms } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";
import { RoomDetailClient } from "./RoomDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const room = await getRoomBySlug(slug);

  if (!room) {
    return {
      title: "Suite Not Found - The Luminary Hotel",
    };
  }

  return {
    title: `${room.name} | The Luminary Hotel & Residences`,
    description: room.shortDescription,
    openGraph: {
      title: `${room.name} - Luxury Hotel & Residences`,
      description: room.description,
      images: room.images,
    },
  };
}

export default async function RoomDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const room = await getRoomBySlug(slug);

  if (!room) {
    notFound();
  }

  const allRooms = await getRooms();
  const relatedRooms = allRooms
    .filter((r) => r.id !== room.id && r.category === room.category)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col">
      <Navbar />

      {/* Main Content Rendered with Client interactivity */}
      <RoomDetailClient room={room} relatedRooms={relatedRooms} />

      <Footer />
    </div>
  );
}
