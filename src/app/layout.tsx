import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#080c14",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "The Luminary Hotel & Residences | 5-Star Metropolitan Luxury",
  description:
    "Experience bespoke luxury at The Luminary Hotel & Residences. Featuring 58 stories of panoramic skyline views, private butler services, 3 Michelin-starred dining, and grand gala venues.",
  keywords: [
    "luxury hotel",
    "metropolitan hotel",
    "executive suite",
    "penthouse suite",
    "michelin star dining",
    "hotel booking demo",
    "supabase hotel app",
  ],
  authors: [{ name: "The Luminary Hospitality Group" }],
  openGraph: {
    title: "The Luminary Hotel & Residences",
    description:
      "Perched high above the city, The Luminary pairs architectural grandeur with private butler service and Michelin dining.",
    siteName: "The Luminary Hotel & Residences",
    images: [
      {
        url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "The Luminary Hotel & Residences",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..800;1,400..800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#080c14] text-slate-100">
        {children}
      </body>
    </html>
  );
}
