-- ==============================================================================
-- THE LUMINARY HOTEL & RESIDENCES - SUPABASE POSTGRESQL SCHEMA
-- Techstack: Supabase PostgreSQL + Auth + Storage
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ROOMS TABLE
CREATE TABLE IF NOT EXISTS public.rooms (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Executive', 'Skyline', 'Penthouse', 'Presidential', 'Deluxe')),
    price_per_night NUMERIC(10, 2) NOT NULL,
    original_price NUMERIC(10, 2),
    capacity INTEGER NOT NULL DEFAULT 2,
    bed_type TEXT NOT NULL,
    size_sq_ft INTEGER NOT NULL,
    floor TEXT NOT NULL,
    view TEXT NOT NULL,
    rating NUMERIC(3, 2) NOT NULL DEFAULT 5.0,
    review_count INTEGER NOT NULL DEFAULT 0,
    featured BOOLEAN NOT NULL DEFAULT false,
    short_description TEXT NOT NULL,
    description TEXT NOT NULL,
    amenities TEXT[] NOT NULL DEFAULT '{}',
    images TEXT[] NOT NULL DEFAULT '{}',
    is_available BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS public.bookings (
    id TEXT PRIMARY KEY,
    room_id TEXT NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
    room_name TEXT NOT NULL,
    guest_name TEXT NOT NULL,
    guest_email TEXT NOT NULL,
    guest_phone TEXT NOT NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    nights INTEGER NOT NULL CHECK (nights >= 1),
    guests_count INTEGER NOT NULL CHECK (guests_count >= 1),
    total_price NUMERIC(10, 2) NOT NULL,
    special_requests TEXT,
    status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'pending', 'cancelled', 'checked-in')),
    payment_status TEXT NOT NULL DEFAULT 'paid' CHECK (payment_status IN ('paid', 'deposit', 'pending')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.enquiries (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    event_type TEXT NOT NULL CHECK (event_type IN ('Corporate Gala', 'Executive Board Meeting', 'Luxury Wedding', 'Private Dinner', 'Product Launch', 'General Enquiry')),
    preferred_date DATE,
    estimated_guests INTEGER,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'scheduled', 'closed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author TEXT NOT NULL,
    role_or_city TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    suite_type TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_rooms_category ON public.rooms(category);
CREATE INDEX IF NOT EXISTS idx_rooms_featured ON public.rooms(featured);
CREATE INDEX IF NOT EXISTS idx_bookings_checkin ON public.bookings(check_in);
CREATE INDEX IF NOT EXISTS idx_bookings_guest_email ON public.bookings(guest_email);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries(status);

-- 7. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- 8. POLICIES
-- Rooms: Anyone can view available rooms
CREATE POLICY "Public rooms are viewable by everyone" 
ON public.rooms FOR SELECT USING (true);

-- Rooms: Only authenticated admins can modify rooms
CREATE POLICY "Admins can update rooms" 
ON public.rooms FOR ALL TO authenticated USING (true);

-- Bookings: Anyone can submit a booking
CREATE POLICY "Anyone can insert a booking" 
ON public.bookings FOR INSERT WITH CHECK (true);

-- Bookings: Admins can view all bookings
CREATE POLICY "Admins can view and manage all bookings" 
ON public.bookings FOR ALL TO authenticated USING (true);

-- Enquiries: Anyone can submit an enquiry
CREATE POLICY "Anyone can insert an enquiry" 
ON public.enquiries FOR INSERT WITH CHECK (true);

-- Enquiries: Admins can view all enquiries
CREATE POLICY "Admins can view all enquiries" 
ON public.enquiries FOR ALL TO authenticated USING (true);

-- Reviews: Public viewable
CREATE POLICY "Public reviews are viewable by everyone" 
ON public.reviews FOR SELECT USING (true);

-- 9. SUPABASE STORAGE BUCKET CONFIGURATION
INSERT INTO storage.buckets (id, name, public) 
VALUES ('hotel-photography', 'hotel-photography', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Access for Hotel Photography" 
ON storage.objects FOR SELECT USING (bucket_id = 'hotel-photography');

-- 10. SEED DATA FOR ROOMS
INSERT INTO public.rooms (
    id, slug, name, category, price_per_night, original_price, capacity, 
    bed_type, size_sq_ft, floor, view, rating, review_count, featured, 
    short_description, description, amenities, images, is_available
) VALUES
(
    'lum-penthouse-01',
    'the-luminary-penthouse-suite',
    'The Luminary Penthouse Suite',
    'Penthouse',
    2450.00,
    2800.00,
    4,
    'King Bed + Private Guest Quarters',
    3200,
    '58th Floor (Top Level)',
    '360° Panoramic Metropolitan Skyline & River',
    5.0,
    38,
    true,
    'Our crown jewel offering an expansive duplex terrace, private heated plunge pool, and dedicated 24-hour butler.',
    'Perched atop the 58th floor, The Luminary Penthouse Suite is an architectural masterpiece of modern metropolitan luxury. Features floor-to-ceiling soundproof glass walls, an Italian Calacatta marble fireplace, a private wraparound cedar terrace with infinity plunge pool, and an executive dining salon seating up to 12 guests.',
    ARRAY[
      '24/7 Dedicated Butler Service',
      'Private Heated Rooftop Plunge Pool',
      'Italian Calacatta Marble Bathroom & Steam Shower',
      'Bang & Olufsen 3D Spatial Audio System',
      'Bespoke Hermès Paris Bathroom Amenities',
      'Private In-Suite Cocktail Bar & Wine Cellar',
      'Sub-Zero & Gaggenau Chef''s Kitchen',
      'Complimentary Rolls-Royce Airport Transfer',
      'High-speed 1Gbps Fiber Wi-Fi'
    ],
    ARRAY[
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=80'
    ],
    true
),
(
    'skyline-exec-02',
    'skyline-executive-corner-suite',
    'Skyline Executive Corner Suite',
    'Skyline',
    1250.00,
    1450.00,
    2,
    'Custom Super King Bed',
    1450,
    '42nd - 52nd Floors',
    'Dual-Aspect Sunset & Downtown Skyline',
    4.96,
    94,
    true,
    'Corner sanctuary with floor-to-ceiling glass on two sides, free-standing soaking tub, and boardroom privileges.',
    'A sanctuary high above the hustle of the metropolis. The Skyline Executive Suite pairs natural white oak finishes with brushed bronze accents. Features an ergonomic Herman Miller workstation, motorized blackout drapes, and a deep soaking bathtub overlooking the sparkling city lights.',
    ARRAY[
      'Deep Freestanding Soaking Tub with City Views',
      'Herman Miller Ergonomic Executive Workstation',
      'Access to 45th Floor Executive Club Lounge',
      'Dyson Supersonic Hair Care Suite',
      'Nespresso Vertuo Reserve Bar',
      'Molton Brown London Bath Collection'
    ],
    ARRAY[
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&w=1600&q=80'
    ],
    true
),
(
    'presidential-03',
    'the-ambassador-presidential-suite',
    'The Ambassador Presidential Suite',
    'Presidential',
    3200.00,
    3600.00,
    6,
    'Two Master King Suites',
    4100,
    '56th Floor',
    'Central Park & Metropolitan Architectural Skyline',
    5.0,
    22,
    true,
    'Bi-level diplomatic luxury with private security elevator access, grand piano, and private wellness sauna.',
    'Engineered for visiting dignitaries, industry leaders, and discerning families. Spanning an entire wing of the 56th floor with fortified privacy glass, dual master wings, an acoustic Steinway baby grand piano, private Finnish sauna, and dedicated service entrance for private chefs.',
    ARRAY[
      'Private Security Elevator & Escort Access',
      'Private Finnish Pine Sauna & Cold Plunge',
      'Steinway & Sons Baby Grand Piano',
      'Dual Master Bedrooms with En-Suite Spa Baths',
      'Full Private Service Kitchen & Sommelier Pantry',
      '24/7 Diplomatic Concierge & Chauffeur'
    ],
    ARRAY[
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=80'
    ],
    true
)
ON CONFLICT (id) DO NOTHING;
