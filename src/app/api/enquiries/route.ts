import { NextRequest, NextResponse } from "next/server";
import { createEnquiry, getEnquiries, updateEnquiryStatus } from "@/lib/db";
import { Enquiry } from "@/lib/types";

export async function GET() {
  try {
    const enquiries = await getEnquiries();
    return NextResponse.json({ success: true, enquiries });
  } catch (error) {
    console.error("Error in GET /api/enquiries:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch enquiries" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, eventType, preferredDate, estimatedGuests, message } = body;

    if (!name || !email || !message || !eventType) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required enquiry fields" },
        { status: 400 }
      );
    }

    const enquiry = await createEnquiry({
      name,
      email,
      phone: phone || "",
      eventType,
      preferredDate: preferredDate || undefined,
      estimatedGuests: estimatedGuests ? Number(estimatedGuests) : undefined,
      message,
    });

    return NextResponse.json({
      success: true,
      enquiry,
      message: "Your enquiry has been received by our event directors.",
    });
  } catch (error) {
    console.error("Error in POST /api/enquiries:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit enquiry" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { enquiryId, status } = body;

    if (!enquiryId || !status) {
      return NextResponse.json(
        { success: false, error: "Missing enquiryId or status" },
        { status: 400 }
      );
    }

    await updateEnquiryStatus(enquiryId, status as Enquiry["status"]);
    return NextResponse.json({ success: true, message: "Enquiry status updated" });
  } catch (error) {
    console.error("Error in PATCH /api/enquiries:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update enquiry status" },
      { status: 500 }
    );
  }
}
