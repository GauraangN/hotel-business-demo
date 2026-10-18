import { NextRequest, NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    // If Supabase is configured, authenticate via Supabase Auth
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return NextResponse.json(
          { success: false, error: error.message },
          { status: 401 }
        );
      }

      return NextResponse.json({
        success: true,
        user: {
          id: data.user.id,
          email: data.user.email,
          role: "admin",
          provider: "supabase",
        },
      });
    }

    // Default Demo Admin credentials for rapid evaluation
    if (
      (email === "admin@theluminaryhotel.com" || email === "admin@demo.com") &&
      (password === "luminary2026!" || password === "admin123")
    ) {
      return NextResponse.json({
        success: true,
        user: {
          id: "demo-admin-id",
          email,
          role: "admin",
          provider: "local-demo",
        },
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid credentials. Use admin@theluminaryhotel.com / luminary2026!" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Admin auth error:", error);
    return NextResponse.json(
      { success: false, error: "Authentication service error" },
      { status: 500 }
    );
  }
}
