# The Luminary Hotel & Residences

> **A 5-Star Metropolitan Luxury Hotel & Private Residences Web Application**  
> Built with Next.js 15, TypeScript, Tailwind CSS v4, shadcn/ui primitives, Next.js Route Handlers, Supabase PostgreSQL, Supabase Auth, and Vercel-ready deployment.

---

## 🌟 Tech Stack Overview

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | Next.js 15 + TypeScript (App Router) | High-speed server components, responsive layouts, dynamic SEO metadata |
| **UI Styling** | Tailwind CSS v4 | CSS-first architecture, modern glassmorphism, bespoke gold & midnight theme |
| **Components** | shadcn/ui & Radix UI primitives | Accessible dialogs, tabs, inputs, dropdowns, and cards |
| **Backend** | Next.js Route Handlers (`/api/*`) | Booking submission, corporate enquiry intake, admin auth & status updates |
| **Database** | Supabase PostgreSQL | Relational schema with RLS for rooms, bookings, and event enquiries |
| **Authentication** | Supabase Auth | Administrative dashboard login with role verification |
| **Image Storage** | Supabase Storage / High-Res CDN | Luxury architectural photography with remote optimization |
| **Deployment** | Vercel | Production-ready zero-config edge hosting |
| **Version Control** | Git + GitHub | Clean commit tree and CI/CD workflow |

---

## ✨ Key Features & Experience

1. **Immersive Metropolitan Hero**:
   - High-impact visual branding with Forbes 5-Star and Michelin Key accolades.
   - Live availability floating search widget with date pickers, suite tier filters, and guest counters.

2. **Suites & Residences Directory (`/rooms`)**:
   - Filter by collection (Penthouse, Skyline, Presidential, Executive, Deluxe).
   - Real-time search by amenity, capacity, and price sorting.
   - Interactive quick-booking modal with instant calculation and confetti confirmation.

3. **Dedicated Suite Detail Pages (`/rooms/[slug]`)**:
   - Dynamic SEO metadata generated via Next.js `generateMetadata`.
   - Multi-photo architectural gallery with interactive thumbnail switcher.
   - Detailed specifications: square footage, floor level, view aspect, and luxury amenities (Hermès toiletries, private plunge pool, Dyson hair care).
   - Sticky live stay calculator with night adjustment and tax breakdown.

4. **Dining & Private Events (`/dining-and-events`)**:
   - Showcase of 3 Michelin-starred *Aura Sky Dining* and *The Obsidian Lounge*.
   - Grand Aurelia Ballroom and Diplomatic Boardroom space specifications.
   - Interactive Corporate & Gala Enquiry Form connected to `/api/enquiries`.

5. **24/7 VIP Concierge & Transfers (`/contact`)**:
   - Direct line for Butler dispatch and Rolls-Royce airport tarmac transfers (TEB, JFK, EWR).
   - Instant concierge message form with automated inquiry routing.

6. **Executive Admin Dashboard (`/admin`)**:
   - Secure login supporting Supabase Auth and rapid demo admin sign-in.
   - Real-time KPI statistics: Gross Revenue, Confirmed Bookings, Pending Inquiries, Occupancy Rate.
   - Interactive management tables to change reservation statuses (Check-In, Cancel) and event inquiries.

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18.18+ or v20+ (tested with v22.23.1)
- **npm** or **pnpm**

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/your-username/hotel-business-demo.git
cd hotel-business-demo

# Install dependencies
npm install
```

### 3. Local Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note on Zero-Config Demo Mode**: The application is built with an automatic fallback in-memory store. Even without setting up Supabase initially, all booking forms, enquiry forms, and admin management tabs work out-of-the-box!

---

## 🗄️ Supabase PostgreSQL Setup

To connect to your live Supabase database:

1. **Create a Supabase Project**:
   - Visit [supabase.com](https://supabase.com) and create a new project.

2. **Execute Database Schema**:
   - In your Supabase Dashboard, open the **SQL Editor**.
   - Copy and paste the contents of [`supabase/schema.sql`](supabase/schema.sql).
   - Click **Run**. This creates:
     - `rooms` table with full specifications and seed data.
     - `bookings` table with Row Level Security (RLS) policies.
     - `enquiries` table for corporate events and inquiries.
     - `hotel-photography` public storage bucket.

3. **Configure Environment Variables**:
   - Create a `.env.local` file in the project root:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
   - Restart your Next.js dev server. The app will automatically connect to your live Supabase database!

---

## 🔐 Admin Portal Credentials

- **URL**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Demo Admin Email**: `admin@theluminaryhotel.com`
- **Demo Password**: `luminary2026!`
- *Or click "Auto-Fill Demo Admin Credentials" for one-click access.*

---

## 🌐 Deploy to Vercel

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete luxury hotel business demo"
   git push origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new) and import your GitHub repository.
3. In **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Click **Deploy**. Your demo will be live with high-speed global CDN edge caching!
